<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .scoped-form{
        .el-input, .el-select, .el-textarea{ width: 500px;}
    }
    .scoped-permissions{ display: inline-block; width: 100px;}
    .repairmentInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
    .el-checkbox{ width: 100px;}
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>编辑部门</span>
        </div>
        <el-form ref="formData" :rules="formRules" :model="formData" label-width="120px" class="scoped-form" label-position="left">
            <el-form-item label="部门" prop="departmentName">
                <el-input v-model="formData.departmentName"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="formData.description" :autosize="{ minRows: 3}" :maxlength="500"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
                <el-checkbox-group v-model="formData.permissions">
                    <div v-for="permission in permissionsData" :key="permission.id" v-if="permission.id != -1">
                        <div v-if="permission.children">
                            <span class="scoped-permissions">{{ permission.name }}</span>
                            <el-checkbox name="permissions" v-for="subPermission in permission.children" :key="subPermission.id" :label="subPermission.id">{{ subPermission.name }}</el-checkbox>
                        </div>
                        <el-checkbox name="permissions" :label="permission.id" v-else>{{ permission.name }}</el-checkbox>
                    </div>
                </el-checkbox-group>
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
            const permissionsValidate = (rule, value, callback) => {
                if (this.formData.permissions.length === 0) {
                    callback(new Error('请选择管理员权限'));
                } else {
                    callback();
                }
            };
            return {
                formData: {
                    departmentName: '',
                    description: '',
                    permissions: []
                },
                formRules: {
                    departmentName: [
                        { required: true, trigger: 'blur', message: '请输入部门名称'}
                    ],
                    permissions: [
                        { validator: permissionsValidate, trigger: 'blur'}
                    ]
                },
                permissionsData: []
            }
        },
        methods: {
            handleSubmit() {
                const _this = this;
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        _this.$http({
                            url: '/api/manageSystem/system/manager/department/editDepartment',
                            method: 'post',
                            data: {
                                id: _this.$route.query.id,
                                departmentName: _this.formData.departmentName,
                                description: _this.formData.description,
                                permissions: _this.formData.permissions
                            }
                        }).then((response) => {
                            if (response.data.code === "00000") {
                                _this.$message('编辑成功');
                                _this.$router.push('/manageSystem/manager/department');
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
                this.$router.push('/manageSystem/manager/department');
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/manager/department/getPermissionsList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.permissionsData = response.data.permissions;
                    return this.$http({
                        url: '/api/manageSystem/system/manager/department/getDepartmentInfo',
                        params: {
                            id: this.$route.query.id
                        }
                    })
                }
            }).then((response) => {
                this.formData = response.data.info;
            }).catch((response) => {
                console.log(response);
            })
        }
    }
</script>