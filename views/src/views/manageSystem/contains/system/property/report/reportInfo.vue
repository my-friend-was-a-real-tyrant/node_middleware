<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .scoped-form{
        .el-input, .el-select{ width: 500px;}
    }
    .repairmentInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>报事详情</span>
        </div>
        <el-form ref="formData" :rules="formRules" :model="formData" label-width="100px" class="scoped-form" label-position="left">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="编号：">
                        <span>{{ info.number }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="报事类型">
                        <span>{{ info.type }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态">
                        <span>{{ info.status }}</span>
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
                        <span>{{ info.datetime }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="标题">
                        <span>{{ info.title }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="内容">
                        <pre>{{ info.content }}</pre>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="报事图片" v-if="info.imgList.length !== 0">
                <img class="repairmentInfo-img" :src="img" v-for="img in info.imgList" :key="img" @click="handleBigImage(img)" />
            </el-form-item>
            <el-form-item label="完成备注" prop="remark" v-if="info.statusCode === 1">
                <el-input v-model="formData.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" v-if="info.statusCode === 1" v-permit="1302" @click="handleFinish">处理完成</el-button>
                <el-button type="primary" size="small" v-if="info.statusCode === 1" v-permit="1302" @click="handleAppointTask">转派</el-button>
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
        <el-dialog
            title="转派任务"
            :visible.sync="appointTaskDialogVisible"
            size="small"
            @close="handleResetAppointTask">
            <el-form 
                :model="appointTaskFormData"
                :rules="appointTaskFormRules"
                ref="appointTaskForm">
                <el-form-item prop="remark">
                    <el-input v-model="appointTaskFormData.remark" placeholder="请填写转派备注"></el-input>
                </el-form-item>
                <el-form-item prop="manager">
                    <el-select v-model="appointTaskFormData.manager" filterable :style="{'width':'100%'}" placeholder="请选择要转派的人员">
                        <el-option v-for="manager in appointTaskManagerList" :key="manager.value" :value="manager.value" :label="manager.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseAppointTask">取 消</el-button>
                <el-button type="primary" @click="handleSubmitAppointTask">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog v-model="bigImgVisible" size="tiny">
            <img width="100%" :src="bigImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const remarkValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入备注'));
                } else {
                    callback();
                }
            };
            return {
                info: {
                    type: '',
                    title: '',
                    contactPerson: '',
                    contactPersonCellphone: '',
                    content: '',
                    datetime: '',
                    status: '',
                    imgList: [],
                    operationRecordsList: []
                },
                formData: {
                    remark: ''
                },
                formRules: {
                    remark: [
                        { validator: remarkValidate, trigger: 'blur'}
                    ]
                },
                dialogVisible: false,
                dialogImageUrl: '',
                bigImgVisible: false,
                bigImageUrl: '',
                tableData: [],
                appointTaskManagerList: [],
                appointTaskDialogVisible: false,
                appointTaskFormData: {
                    remark: '',
                    manager: ''
                },
                appointTaskFormRules: {
                    remark: [
                        { required: true, message: '请填写备注', trigger: 'blur'}
                    ],
                    manager : [
                        { type: 'number', required: true, message: '请选择指派人员', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleResetAppointTask() {
                this.$refs['appointTaskForm'].resetFields();
            },
            handleCloseAppointTask() {
                this.appointTaskDialogVisible = false;
            },
            handleAppointTask() {
                this.appointTaskDialogVisible = true;
            },
            handleSubmitAppointTask() {
                const _this = this;
                _this.$refs['appointTaskForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/report/appointTask',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                remark: _this.appointTaskFormData.remark,
                                manager: _this.appointTaskFormData.manager
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('转派成功');
                                _this.$router.push('/manageSystem/property/report');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleFinish() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/report/finishReport',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                remark: _this.formData.remark
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                this.$message('处理成功');
                                this.$router.push('/manageSystem/property/report');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                })
            },
            handleCancel() {
                this.$router.push('/manageSystem/property/report');
            },
            handleBigImage(url) {
                this.bigImageUrl = url;
                this.bigImgVisible = true;
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/report/getReportInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.reportInfo;
                }
            }).catch((response) => {
                console.log(response);
            });

            this.$http({
                url: '/api/manageSystem/system/property/report/getAppointTaskManagerList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.appointTaskManagerList = response.data.managerList;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>