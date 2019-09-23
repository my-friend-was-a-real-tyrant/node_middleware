<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .scoped-form{
        .el-input, .el-select, .el-textarea{ width: 500px;}
    }
    .repairmentInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>咨询建议详情</span>
        </div>
        <el-form ref="formData" :rules="formRules" :model="formData" label-width="100px" class="scoped-form" label-position="left">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="编号：">
                        <span>{{ info.number }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="咨询人">
                        <span>{{ info.userName }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式">
                        <span>{{ info.userCellphone }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="咨询时间">
                        <span>{{ info.datetime }}</span>
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
            <div v-for="answer in info.answer" :key="answer.id">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="回复人">
                            <pre>{{ answer.operator }}</pre>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="回复时间">
                            <pre>{{ answer.datetime }}</pre>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="回复内容">
                            <pre>{{ answer.content }}</pre>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-form-item label="回复" prop="answer">
                <el-input type="textarea" v-model.trim="formData.answer" :autosize="{ minRows: 3}" :maxlength="500"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" v-permit="1702" @click="handleAnswer">回复</el-button>
                <el-button type="primary" size="small" v-permit="1702" @click="handleAppointTask">转派</el-button>
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
                    <el-input v-model="appointTaskFormData.remark" placeholder="请填写备注"></el-input>
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
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const answerValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的回复'));
                } else {
                    callback();
                }
            };
            return {
                info: {
                    number: '',
                    userName: '',
                    userCellphone: '',
                    datetime: '',
                    content: '',
                    answer: [
                        {
                            id: '',
                            datetime: '',
                            content: '',
                            operator: ''
                        }
                    ],
                    operationRecordsList: []
                },
                formData: {
                    answer: ''
                },
                formRules: {
                    answer: [
                        { validator: answerValidate, trigger: 'blur'}
                    ]
                },
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
                            url: '/api/manageSystem/system/property/suggestion/appointTask',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                remark: _this.appointTaskFormData.remark,
                                manager: _this.appointTaskFormData.manager
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('转派成功');
                                _this.$router.push('/manageSystem/property/suggestion');
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleAnswer() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/property/suggestion/answerSuggestion',
                            method: 'patch',
                            data: {
                                id: _this.$route.query.id,
                                answer: _this.formData.answer
                            }
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                this.$message('回复成功');
                                this.$router.push('/manageSystem/property/suggestion');
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
                this.$router.push('/manageSystem/property/suggestion');
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/suggestion/getSuggestionInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.suggestionInfo;
                }
            }).catch((response) => {
                console.log(response);
            });

            this.$http({
                url: '/api/manageSystem/system/property/suggestion/getAppointTaskManagerList'
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