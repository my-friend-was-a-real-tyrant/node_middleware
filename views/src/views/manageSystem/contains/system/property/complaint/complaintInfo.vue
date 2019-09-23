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
            <span>投诉表扬详情</span>
        </div>
        <el-form label-width="90px" class="scoped-form" label-position="left"
            :model="finishComplaintFormData"
            :rules="finishComplaintFormRules"
            ref="finishComplaintForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="编号：">
                        <span>{{ info.number }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="类型">
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
                    <el-form-item label="发布人">
                        <span>{{ info.userName }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式">
                        <span>{{ info.userCellphone }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="发布时间">
                        <span>{{ info.date }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="发布人地址">
                        <span>{{ info.address }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="标题">
                <span>{{ info.title }}</span>
            </el-form-item>
            <el-form-item label="内容">
                <pre>{{ info.description }}</pre>
            </el-form-item>
            <el-form-item label="附图" v-if="info.img !== ''">
                <img class="repairmentInfo-img" :src="info.img" style="{ max-width: 200px;}" @click="handleBigImage(info.img)" />
            </el-form-item>
            <el-form-item label="完成备注" prop="remark" v-if="info.type === '投诉' && info.statusCode === 1">
                <el-input v-model="finishComplaintFormData.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleAppointTask" v-permit="1202" v-if="info.statusCode === 1 && info.typeForApp === 1">转派</el-button>
                <el-button type="primary" size="small" @click="handleFinishComplaint" v-permit="1202" v-if="info.statusCode === 1 && info.typeForApp === 1">处理完成</el-button>
                <el-button type="primary" size="small" @click="handleChangeComplaintType" v-permit="-1" v-if="info.statusCode === 1 && info.typeForApp === 1">转为报事</el-button>
                <el-button size="small" @click="handleCancel">返回</el-button>
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
            title="转为报事"
            :visible.sync="changeComplaintTypeDialogVisible"
            size="small"
            @close="handleResetChangeComplaintType">
            <el-form 
                :model="changeComplaintTypeFormData"
                :rules="changeComplaintTypeFormRules"
                ref="changeComplaintTypeForm">
                <el-form-item prop="remark">
                    <el-input v-model="changeComplaintTypeFormData.remark" placeholder="请填写备注"></el-input>
                </el-form-item>
                <el-form-item prop="report">
                    <el-select v-model="changeComplaintTypeFormData.report" filterable :style="{'width':'100%'}" placeholder="请选择报事类型">
                        <el-option :value="1" label="服务报事"></el-option>
                        <el-option :value="2" label="安保报事"></el-option>
                        <el-option :value="3" label="绿化报事"></el-option>
                        <el-option :value="4" label="设备报事"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseChangeComplaintType">取 消</el-button>
                <el-button type="primary" @click="handleSubmitChangeComplaintType">确 定</el-button>
            </span>
        </el-dialog>
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
                    <el-select v-model="appointTaskFormData.manager" filterable :style="{'width':'100%'}" placeholder="请选择要指派的人员">
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
            return {
                info: {
                    type: '',
                    status: '',
                    address: '',
                    title: '',
                    date: '',
                    description: '',
                    img: '',
                    userName: '',
                    userCellphone: '',
                    operationRecordsList: []
                },
                finishComplaintFormData: {
                    remark: ''
                },
                finishComplaintFormRules: {
                    remark: [
                        { required: true, message: '请填写备注', trigger: 'blur'}
                    ]
                },
                changeComplaintTypeDialogVisible: false,
                changeComplaintTypeFormData: {
                    remark: '',
                    report: ''
                },
                changeComplaintTypeFormRules: {
                    remark: [
                        { required: true, message: '请填写备注', trigger: 'blur'}
                    ],
                    report: [
                        { type: 'number', required: true, message: '请选择报事类型', trigger: 'blur'}
                    ]
                },
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
                },
                bigImgVisible: false,
                bigImageUrl: '',
            }
        },
        methods: {
            handleDelete() {
                const _this = this;
                _this.$http({
                    url: '/api/manageSystem/system/property/complaint/deleteComplaint',
                    method: 'delete',
                    params: {
                        id: _this.$route.query.id
                    }
                }).then((response) => {
                    if (response.data.code === "00000") {
                        _this.$message('删除成功');
                        _this.$router.push('/manageSystem/property/complaint');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleFinishComplaint() {
                const _this = this;
                _this.$refs['finishComplaintForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/complaint/finishComplaint',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                remark: _this.finishComplaintFormData.remark
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('处理成功');
                                _this.$router.push('/manageSystem/property/complaint');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleResetChangeComplaintType() {
                this.$refs['changeComplaintTypeForm'].resetFields();
            },
            handleCloseChangeComplaintType() {
                this.changeComplaintTypeDialogVisible = false;
            },
            handleSubmitChangeComplaintType() {
                const _this = this;
                _this.$refs['changeComplaintTypeForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/complaint/changeComplaintType',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                remark: _this.changeComplaintTypeFormData.remark,
                                report: _this.changeComplaintTypeFormData.report
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('处理成功');
                                _this.$router.push('/manageSystem/property/complaint');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleChangeComplaintType() {
                const _this = this;
                _this.changeComplaintTypeDialogVisible = true;           
            },
            handleResetAppointTask() {
                this.$refs['appointTaskForm'].resetFields();
            },
            handleCloseAppointTask() {
                this.appointTaskDialogVisible = false;
            },
            handleSubmitAppointTask() {
                const _this = this;
                _this.$refs['appointTaskForm'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/complaint/appointTask',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                remark: _this.appointTaskFormData.remark,
                                manager: _this.appointTaskFormData.manager
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('转派成功');
                                _this.$router.push('/manageSystem/property/complaint');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleAppointTask() {
                const _this = this;
                _this.appointTaskDialogVisible = true;           
            },
            handleCancel() {
                this.$router.push('/manageSystem/property/complaint');
            },
            handleBigImage(url) {
                this.bigImageUrl = url;
                this.bigImgVisible = true;
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/complaint/getComplaintInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.repairmentInfo;
                }
            }).catch((response) => {
                console.log(response);
            });

            this.$http({
                url: '/api/manageSystem/system/property/complaint/getAppointTaskManagerList'
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