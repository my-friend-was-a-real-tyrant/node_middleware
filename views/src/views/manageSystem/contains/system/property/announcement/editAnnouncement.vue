<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .scoped-form{
        .el-input, .el-select, .el-textarea{ width: 300px;}
        .el-icon-plus{ position: relative;
            .description{ position: absolute; top: 35px; left: -60px; width: 148px; height: 30px; line-height: 1; font-size: 14px;}
        }
    }
    .activityInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>编辑公告</span>
        </div>
        <el-form ref="formData" :model="formData" :rules="formRules" class="scoped-form" label-width="130px" label-position="left" inline>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系人：" prop="contact">
                        <el-input v-model="formData.contact" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系方式：" required prop="cellphone">
                        <el-input v-model="formData.cellphone" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="标题：" prop="title">
                        <el-input v-model="formData.title" size="small" :maxlength="45"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="内容：" prop="content">
                        <el-input type="textarea" v-model="formData.content" size="small" :autosize="{ minRows: 3}" :maxlength="500"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="上传图片：" prop="imgList">
                        <el-upload
                            action="/v1/file"
                            list-type="picture-card"
                            name="file"
                            ref="uploadImg"
                            accept="image/*"
                            :file-list="initImgList"
                            :data="{
                                'uploadType': 5,
                                'fileSuffixType': 1
                            }"
                            :on-success="handleFileUpload"
                            :on-preview="handlePictureCardPreview"
                            :on-change="handleImgChange"
                            :on-remove="handleImgChange"
                            :before-upload="handleCheckImgLength">
                            <i class="el-icon-plus">
                                <span class="description">最多上传9张图片</span>
                            </i>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label=" ">
                <el-button type="primary" size="small" @click="handleAddAnnouncement">确定</el-button>
                <el-button size="small" @click="handleReturn">返回</el-button>
            </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const cellphoneValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入联系方式'));
                } else {
                    const cellphoneReg = /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/;
                    if (cellphoneReg.test(value) === false) {
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                dialogVisible: false,
                dialogImageUrl: '',
                initImgList: [],
                formData: {
                    id: this.$route.query.id,
                    contact: '',
                    cellphone: '',
                    title: '',
                    content: '',
                    imgList: []
                },
                formRules: {
                    contact: [
                        { required: true, message: '请输入联系人', trigger: 'blur'}
                    ],
                    cellphone: [
                        { validator: cellphoneValidate, trigger: 'blur'}
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleFileUpload(response, file, fileList) {
                if (response.code !== 10000 || response.returnData.subCode !== 10000) {
                    if (response.code === 'E0004') {
                        this.$router.push('/manageSystem/login');
                    } else {
                        this.$alert(response.message, '提示', {
                            confirmButtonText: '确定'
                        });
                        for (let i = 0; i < fileList.length; i ++) {
                            if (fileList[i] === file) {
                                fileList.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleImgChange(file, fileList) {
                const imgList = [];
                for (let i = 0; i < fileList.length; i ++) {
                    if (fileList[i].status === 'success') {
                        if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                            imgList.push(fileList[i].response.returnData.data.filePath);
                        } else {
                            imgList.push(fileList[i].urlNoHostname);
                        }
                    }
                }
                this.formData.imgList = imgList;
            },
            handleCheckImgLength(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['uploadImg'].uploadFiles.length > 9) {
                    this.$alert('限上传九张图片', '提示');
                    return false;
                }
            },
            handleReturn() {
                this.$router.push('/manageSystem/property/announcement');
            },
            handleAddAnnouncement() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/announcement/editAnnouncement',
                            method: 'patch',
                            data: _this.formData
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('编辑成功');
                                _this.$router.push('/manageSystem/property/announcement');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/announcement/getAnnouncementInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    for (let i = 0; i < response.data.announcementInfo.imgList.length; i ++) {
                        const temp = {
                            name: 'content' + i,
                            url: response.data.announcementInfo.imgList[i],
                            urlNoHostname: response.data.announcementInfo.imgListNoHostname[i]
                        };
                        this.initImgList.push(temp);
                    }
                    this.formData.contact = response.data.announcementInfo.contact;
                    this.formData.cellphone = response.data.announcementInfo.cellphone;
                    this.formData.title = response.data.announcementInfo.title;
                    this.formData.content = response.data.announcementInfo.content;
                    this.formData.imgList = response.data.announcementInfo.imgListNoHostname;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>