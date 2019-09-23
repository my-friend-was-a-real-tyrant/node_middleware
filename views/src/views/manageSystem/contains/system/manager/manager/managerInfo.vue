<style lang="less" scoped>
    .scoped-form{
        .el-input, .el-select{ width: 500px;}
    }
    .scoped-department{ width: 300px; padding: 10px; margin: 10px; border: 1px solid #333; border-radius: 10px;}
    .scoped-li{ list-style: decimal inside; margin-right: 15px;}
    .repairmentInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>员工信息</span>
        </div>
        <el-form ref="formData" label-width="100px" class="scoped-form" label-position="left">
            <el-form-item label="姓名">
                <span>{{ info.managerName }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
                <span>{{ info.managerCellphone }}</span>
            </el-form-item>
            <el-form-item label="状态">
                <span>{{ info.status }}</span>
            </el-form-item>
            <el-form-item label="权限">
                <ol class="clearFix" v-for="permission in info.permissions" :key="permission.id">
                    <p class="scoped-li fl" style="list-style: none;">{{ permission.name }}：</p>
                    <li class="scoped-li fl" v-for="subPermission in permission.children" :key="subPermission.id">{{ subPermission.name }}</li>
                </ol>
            </el-form-item>
            <div class="clearFix">
                <div class="scoped-department fl" v-for="department in info.departmentList" :key="department.id">
                    <el-form-item label="部门">
                        <span>{{ department.manager ? '无' : department.departmentName }}</span>
                    </el-form-item>
                    <el-form-item label="职位">
                        <span>{{ department.manager ? '园区经理' : (department.job === 1 ? '经理' : '员工') }}</span>
                    </el-form-item>
                </div>
            </div>
            <el-form-item>
                <el-button type="primary" icon="edit" size="small" @click="handleEditManager" v-permit="302">编辑</el-button>
                <el-button icon="my-businesscard" size="small" @click="handleEditManagerDepartment" v-permit="304">分配部门</el-button>
                <el-button size="small" @click="handleCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                info: {
                    managerName: '',
                    managerCellphone: '',
                    status: '',
                    departmentList: []
                }
            }
        },
        methods: {
            handleEditManager() {
                this.$router.push({
                    path: '/manageSystem/manager/manager/editManager',
                    query: {
                        managerId: this.$route.query.managerId
                    }
                });
            },
            handleEditManagerDepartment() {
                this.$router.push({
                    path: '/manageSystem/manager/manager/editManagerDepartment',
                    query: {
                        id: this.$route.query.managerId
                    }
                });
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
                    this.info.managerName = response.data.managerName;
                    this.info.managerCellphone = response.data.managerCellphone;
                    this.info.status = response.data.isLockedWord;
                    this.info.departmentList = response.data.eipList;
                    this.info.permissions = response.data.permissions;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>