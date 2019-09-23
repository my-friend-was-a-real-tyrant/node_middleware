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
            <span>添加活动</span>
        </div>
        <el-form ref="formData" :model="formData" :rules="formRules" class="scoped-form" label-width="150px" label-position="right" inline>
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
                    <el-form-item label="报名截止时间：" prop="enrollEndDate">
                        <el-date-picker
                            v-model="formData.enrollEndDate"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            size="small">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="活动时间：" required>
                        <el-form-item prop="activityStartDatetime">
                            <el-date-picker
                                v-model="formData.activityStartDatetime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                size="small">
                            </el-date-picker>
                        </el-form-item>
                        <span>--</span>
                        <el-form-item prop="activityEndDatetime">
                            <el-date-picker
                                v-model="formData.activityEndDatetime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                size="small">
                            </el-date-picker>
                        </el-form-item>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="活动地址：" prop="address">
                        <el-input v-model="formData.address" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动对象：" prop="target">
                        <el-input v-model="formData.target" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="活动人数：" prop="maxCount" required >
                        <el-input v-model="formData.maxCount" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="单个账号报名人数：" prop="userCountMax" required >
                        <el-input v-model="formData.userCountMax" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="标题：" prop="title">
                        <el-input v-model="formData.title" size="small" :maxlength="50"></el-input>
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
                            :data="{
                                'uploadType': 11,
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
                <el-button type="primary" size="small" @click="handleAddActivity">确定</el-button>
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
                    const cellphoneReg = /^1[345789]\d{9}$/;
                    if (cellphoneReg.test(value) === false) {
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        callback();
                    }
                }
            };
            const activityStartDatetimeValidate = (rule, value, callback) => {
                if (value > this.formData.activityEndDatetime) {
                    callback(new Error('开始时间不得晚于结束时间'));
                } else if (value < this.formData.enrollEndDate) {
                    callback(new Error('开始时间不得早于报名时间'));
                } else {
                    callback();
                }
            };
            const maxCountValidate = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else if (isNaN(Number(value)) === true) {
                    callback(new Error('请输入一个正整数'));
                } else {
                    const countReg = /^\d*$/;
                    if (countReg.test(value) === false) {
                        callback(new Error('请输入一个正整数'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                dialogVisible: false,
                dialogImageUrl: '',
                formData: {
                    contact: '',
                    cellphone: '',
                    enrollEndDate: '',
                    activityStartDatetime: '',
                    activityEndDatetime: '',
                    address: '',
                    target: '',
                    maxCount: '',
                    title: '',
                    content: '',
                    imgList: [],
                    userCountMax: ""
                },
                formRules: {
                    contact: [
                        { required: true, message: '请输入联系人', trigger: 'blur'}
                    ],
                    cellphone: [
                        { validator: cellphoneValidate, trigger: 'blur'}
                    ],
                    enrollEndDate: [
                        { type: 'date', required: true, message: '请选择报名截止日期', trigger: 'blur'},
                    ],
                    activityStartDatetime: [
                        { type: 'date', required: true, message: '请选择活动开始时间', trigger: 'blur'},
                    ],
                    activityEndDatetime: [
                        { type: 'date', required: true, message: '请选择活动结束时间', trigger: 'blur'},
                    ],
                    address: [
                        { required: true, message: '请输入活动地址', trigger: 'blur'}
                    ],
                    target: [
                        { required: true, message: '请输入活动对象', trigger: 'blur'}
                    ],
                    maxCount: [
                        { validator: maxCountValidate, trigger: 'blur'}
                    ],
                    userCountMax: [
                        { validator: maxCountValidate, trigger: 'blur'}
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
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        imgList.push(fileList[i].response.returnData.data.filePath);
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
                this.$router.push('/manageSystem/property/activity');
            },
            handleAddActivity() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/activity/addActivity',
                            method: 'post',
                            data: _this.formData
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('添加成功');
                                _this.$router.push('/manageSystem/property/activity');
                            }
                        }).catch((response) => {});
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>