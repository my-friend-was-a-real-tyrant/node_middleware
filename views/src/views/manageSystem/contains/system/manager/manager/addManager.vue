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
            <span>添加员工</span>
        </div>
        <el-form ref="formData" :rules="formRules" :model="formData" label-width="120px" class="scoped-form" label-position="left">
            <el-form-item label="姓名" prop="managerName">
                <el-input v-model="formData.managerName"></el-input>
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
                formData: {
                    managerName: '',
                    managerCellphone: ''
                },
                formRules: {
                    managerName: [
                        { required: true, trigger: 'blur', message: '请输入管理员姓名'}
                    ],
                    managerCellphone: [
                        { required: true, trigger: 'blur', message: '请输入管理员手机号'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/manager/manager/addManager',
                            method: 'post',
                            data: {
                                managerName: _this.formData.managerName,
                                managerCellphone: _this.formData.managerCellphone
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('添加成功');
                                _this.$router.push({
                                    path: '/manageSystem/manager/manager/editManagerDepartment',
                                    query: {
                                        id: response.data.managerId
                                    }
                                });
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
        }
    }
</script>