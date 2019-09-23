<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .scoped-form{
        .el-input, .el-select{ width: 500px;}
    }
    .scoped-name{ padding-right: 10px;}
    .repairmentInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>编辑管理员</span>
        </div>
        <el-form ref="formData" :rules="formRules" :model="formData" label-width="120px" class="scoped-form" label-position="left">
            <el-form-item label="姓名">
                <el-input v-model="formData.managerName"></el-input>
                <el-button type="primary" size="small" v-if="isLocked === false" @click="handleLockManager">冻结</el-button>
                <el-button type="primary" size="small" v-else @click="handleUnlockManager">解冻</el-button>
                <el-button type="danger" size="small" @click="handleResetPassword">重置登录密码</el-button>
            </el-form-item>
            <el-form-item label="手机号" prop="managerCellphone">
                <el-input v-model="formData.managerCellphone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
                <el-button type="danger" size="small" @click="handleCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                isLocked: false,
                formData: {
                    managerCellphone: '',
                    managerName:''
                },
                formRules: {
                    managerCellphone: [
                        { required: true, trigger: 'blur', message: '请输入管理员手机号'}
                    ]
                }
            }
        },
        methods: {
            handleResetPassword() {
                this.$http({
                    url: '/api/manageSystem/system/manager/manager/resetPassword',
                    method: 'patch',
                    data: {
                        managerId: this.$route.query.managerId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$message('重置成功');
                        this.$router.push('/manageSystem/manager/manager');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleLockManager() {
                this.$http({
                    url: '/api/manageSystem/system/manager/manager/lockManager',
                    method: 'patch',
                    data: {
                        managerId: this.$route.query.managerId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$message('冻结成功');
                        this.$router.push('/manageSystem/manager/manager');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleUnlockManager() {
                this.$http({
                    url: '/api/manageSystem/system/manager/manager/unlockManager',
                    method: 'patch',
                    data: {
                        managerId: this.$route.query.managerId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$message('解冻成功');
                        this.$router.push('/manageSystem/manager/manager');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSubmit() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/manager/manager/editManager',
                            method: 'patch',
                            data: {
                                managerId: _this.$route.query.managerId,
                                managerName: _this.formData.managerName,
                                managerCellphone: _this.formData.managerCellphone
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('编辑成功');
                                _this.$router.push('/manageSystem/manager/manager');
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
                this.$router.push('/manageSystem/manager/manager');
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/manager/manager/getManagerInfo',
                params: {
                    managerId: this.$route.query.managerId
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.formData.managerName = response.data.managerName;
                    this.isLocked = response.data.isLocked;
                    this.formData.managerCellphone = response.data.managerCellphone;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>