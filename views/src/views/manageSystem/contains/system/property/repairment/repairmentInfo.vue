<style lang="less" scoped>
.scoped-contain-back {
  vertical-align: middle;
}
.scoped-form {
  .el-input,
  .el-select {
    width: 500px;
  }
}
.repairmentInfo {
  &-img {
    max-width: 200px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>维修审批</span>
        </div>
        <el-form ref="formData" :rules="formRules" :model="formData" label-width="100px" class="scoped-form" label-position="left">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="编号：">
                        <span>{{ info.number }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="报修类型">
                        <span>{{ info.repairmentType }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态">
                        <span>{{ info.repairmentStatus }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="联系人">
                        <span>{{ info.contactPerson }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式">
                        <span>{{ info.contactPersonCellphone }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="报修时间">
                        <span>{{ info.repairmentDatetime }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="报修区域">
                        <span>{{ info.repairmentArea }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="报修内容">
                        <pre>{{ info.description }}</pre>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="最佳上门时间">
                        <span>{{ info.bestTime }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="维修人" v-if="info.repairMan !== ''">
                <span>{{ info.repairMan }}</span>
            </el-form-item>
            <el-form-item label="联系方式" v-if="info.repairManCellphone !== ''">
                <span>{{ info.repairManCellphone }}</span>
            </el-form-item>
            <el-form-item label="评价" v-if="info.assess !== ''">
                <span>{{ info.assess }}</span>
            </el-form-item>
            <el-form-item label="报修图片" v-if="info.repairmentImgList.length !== 0">
                <img class="repairmentInfo-img" :src="img" v-for="img in info.repairmentImgList" :key="img" @click="handleBigImage(img)" />
            </el-form-item>
            <el-form-item label="转送图片" v-if="info.manageImgList.length !== 0">
                <img class="repairmentInfo-img" :src="img" v-for="img in info.manageImgList" :key="img" @click="handleBigImage(img)" />
            </el-form-item>
            <el-form-item label="完成图片" v-if="info.completeImgList.length !== 0">
                <img class="repairmentInfo-img" :src="img" v-for="img in info.completeImgList" :key="img" @click="handleBigImage(img)" />
            </el-form-item>
            <el-form-item label="审批" v-if="info.repairmentStatus === '审核中'" prop="chooseApproveType" v-permit="1102">
                <el-select v-model="formData.chooseApproveType" placeholder="请选择审批方式">
                    <el-option v-for="item in approveType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="维修员" prop="repairMan" v-show="formData.chooseApproveType === 2" v-permit="1102">
                <el-select v-model="formData.repairMan">
                    <el-option v-for="repairMan in repairManList" :key="repairMan.value" :value="repairMan.value" :label="repairMan.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark" v-show="(info.repairmentStatus === '维修中' || info.repairmentStatus === '已转送') || (info.repairmentStatus === '审核中' && formData.chooseApproveType !== '')" v-permit="1102">
                <el-input v-model="formData.remark"></el-input>
            </el-form-item>
            <!-- 完成图片 -->
            <el-form-item label="完成图片" prop="reportImgListComplete" v-show="(info.repairmentStatus === '维修中')" v-permit="1102">
                <el-upload ref="complete" action="/v1/file" list-type="picture-card" name="file" accept="image/*" :data="{
                        'uploadType': 2,
                        'fileSuffixType': 1
                    }" :on-success="handleReportImgUpload" :on-preview="handlePictureCardPreview" :on-change="handleReportImgChangeComplete" :on-remove="handleReportImgChangeComplete" :before-upload="handleCheckImgLengthComplete">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <!-- 上传转送图片 -->
            <!-- <el-form-item label="上传转送图片" prop="reportImgList" v-show="(info.repairmentStatus === '维修中')" v-permit="1102">
                <el-upload
                    ref="uploadImg"
                    action="/v1/file"
                    list-type="picture-card"
                    name="file"
                    accept="image/*"
                    :data="{
                        'uploadType': 2,
                        'fileSuffixType': 1
                    }"
                    :on-success="handleReportImgUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-change="handleReportImgChange"
                    :on-remove="handleReportImgChange"
                    :before-upload="handleCheckImgLength">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item> -->
            <!-- 上传转送图片 -->
            <el-form-item>
                <el-button type="primary" size="small" v-if="info.repairmentStatus === '已转送' || info.repairmentStatus === '维修中'" @click="handleFinish" v-permit="1102">完成维修</el-button>
                <el-button type="primary" size="small" v-else-if="info.repairmentStatus === '审核中'" @click="handleSubmit" v-permit="1102">提交</el-button>
                <el-button type="danger" size="small" @click="handleCancel">返回</el-button>
            </el-form-item>
        </el-form>
        <div class="contain-title">
            <span>操作记录</span>
        </div>
        <el-table stripe :data="info.operationRecordsList" style="width: 100%">
            <el-table-column prop="event" label="事件" min-width="100"></el-table-column>
            <el-table-column prop="operation" label="操作内容" min-width="150"></el-table-column>
            <el-table-column prop="remark" label="备注信息" min-width="150"></el-table-column>
            <el-table-column prop="operator" label="操作人" min-width="160"></el-table-column>
            <el-table-column prop="operateDatetime" label="操作时间" min-width="150"></el-table-column>
        </el-table>
        <el-dialog v-model="bigImgVisible" size="tiny">
            <img width="100%" :src="bigImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const repairManValidate = (rule, value, callback) => {
                if (this.formData.chooseApproveType === 2) {
                    if (value === '') {
                        callback(new Error('请输入维修员姓名'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            const remarkValidate = (rule, value, callback) => {
                // if (this.formData.chooseApproveType === 1 || this.formData.chooseApproveType === 3) {
                    if (value === '') {
                        callback(new Error('请输入备注'));
                    } else {
                        callback();
                    }
                // } else {
                //     callback();
                // }
            };
            const chooseApproveTypeValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择审批方式'));
                } else {
                    callback();
                }
            };
            return {
                info: {
                    repairmentType: '',
                    repairmentArea: '',
                    userName: '',
                    userCellphone: '',
                    contactPerson: '',
                    contactPersonCellphone: '',
                    description: '',
                    repairmentDatetime: '',
                    assess: '',
                    repairmentStatus: '',
                    repairMan: '',
                    repairManCellphone: '',
                    repairmentImgList: [],
                    manageImgList: [],
                    operationRecordsList: [],
                    completeImgList:[]
                },
                approveType: [{
                    value: 2,
                    label: '物业维修'
                }, {
                    value: 1,
                    label: '拒绝'
                }, {
                    value: 3,
                    label: '第三方维修'
                }],
                formData: {
                    remark: '',
                    chooseApproveType: '',
                    repairMan: '',
                    repairManCellphone: '',
                    reportImgList: [],
                    reportImgListComplete: []
                },
                formRules: {
                    remark: [
                        { validator: remarkValidate, trigger: 'blur'}
                    ],
                    chooseApproveType: [
                        { validator: chooseApproveTypeValidate, trigger: 'blur'}
                    ],
                    repairMan: [
                        { validator: repairManValidate, trigger: 'blur'}
                    ]
                },
                dialogVisible: false,
                dialogImageUrl: '',
                bigImgVisible: false,
                bigImageUrl: '',
                tableData: [],
                repairManList: []
            }
        },
        methods: {
            handleReportImgUpload(response, file, fileList) {
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
            handleReportImgChangeComplete(file, fileList) {
                const imgList = [];
                for (let i = 0; i < fileList.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        imgList.push(fileList[i].response.returnData.data.filePath);
                    }
                }
                this.formData.reportImgListComplete = imgList;
            },
            handleReportImgChange(file, fileList) {
                const imgList = [];
                for (let i = 0; i < fileList.length; i ++) {
                    if (Object.prototype.hasOwnProperty.call(fileList[i], 'response') === true) {
                        imgList.push(fileList[i].response.returnData.data.filePath);
                    }
                }
                this.formData.reportImgList = imgList;
            },
            handleCheckImgLengthComplete(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['complete'].uploadFiles.length > 6) {
                    this.$alert('限上传六张图片', '提示');
                    return false;
                }
            },
            handleCheckImgLength(file) {
                const imgReg = /(.(jpg|gif|jpeg|png))+$/i;
                if (imgReg.test(file.name) === false) {
                    this.$alert('请上传正确格式的图片', '提示');
                    return false;
                }
                if (this.$refs['uploadImg'].uploadFiles.length > 1) {
                    this.$alert('限上传一张图片', '提示');
                    return false;
                }
            },
            handleSubmit() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/repairment/approveRepairment',
                            method: 'patch',
                            data: {
                                repairmentId: _this.$route.query.repairmentId,
                                approveType: _this.formData.chooseApproveType,
                                remark: _this.formData.remark,
                                repairMan: _this.formData.repairMan,
                                reportImgList: _this.formData.reportImgList,
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('审核成功');
                                _this.$router.push('/manageSystem/property/repairment');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                })
            },
            handleFinish() {
                this.$http({
                    url: '/api/manageSystem/system/property/repairment/finishRepairment',
                    method: 'patch',
                    data: {
                        repairmentId: this.$route.query.repairmentId,
                        remark: this.formData.remark,
                        finishImgList: this.formData.reportImgListComplete,
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$message('审核成功');
                        this.$router.push('/manageSystem/property/repairment');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleCancel() {
                this.$router.push('/manageSystem/property/repairment');
            },
            handleBigImage(url) {
                this.bigImageUrl = url;
                this.bigImgVisible = true;
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/repairment/getRepairmentInfo',
                params: {
                    repairmentId: this.$route.query.repairmentId
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.repairmentInfo;
                }
            }).catch((response) => {
                console.log(response);
            });

            this.$http({
                url: '/api/manageSystem/system/property/repairment/getRepairManList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.repairManList = response.data.repairManList;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>