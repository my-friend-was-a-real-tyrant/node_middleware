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
            <span>分配部门</span>
        </div>
        <el-form ref="formData" label-width="120px" class="scoped-form" label-position="left">
            <el-form-item label="姓名">
                <span>{{ info.managerName }}</span>
            </el-form-item>
            <el-form-item label="手机号">
                <span>{{ info.managerCellphone }}</span>
            </el-form-item>
            <el-form-item label="部门" v-for="department in info.departmentList" :key="department.id">
                <span>{{ department.name }}</span>
                <el-button type="danger" size="small" @click="handleRemoveDepartment(department)" v-if="department.id !== -1">移除职位</el-button>
            </el-form-item>
            <el-form-item label="部门" v-for="department in departmentFormList" :key="department.id">
                <el-cascader
                    expand-trigger="hover"
                    :options="departmentList"
                    v-model="department.value">
                </el-cascader>
                <el-button type="primary" size="small" @click="handleAddDepartment(department)">保存</el-button>
                <el-button type="danger" size="small" @click="handleRemoveDepartmentForm(department)">取消</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" @click="handleAddDepartmentForm" v-if="info.departmentList[0] === undefined || info.departmentList[0].id !== -1">添加部门</el-button>
                <el-button type="danger" size="small" @click="handleCancel">返回</el-button>
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
                    departmentList: []
                },
                departmentList: [],
                departmentFormList: []
            }
        },
        methods: {
            handleAddDepartmentForm() {
                this.departmentFormList.push({
                    id: Date.now(),
                    value: []
                });
            },
            handleRemoveDepartmentForm(department) {
                const index = this.departmentFormList.indexOf(department)
                if (index !== -1) {
                    this.departmentFormList.splice(index, 1)
                }
            },
            handleAddDepartment(department) {
                const value = department.value;
                if (value.length !== 0) {
                    // 请求
                    if (value.length === 1 && value[0] === -1) {
                        // 选择园区经理
                        this.$http({
                            url: '/api/manageSystem/system/manager/manager/setAsParkManager',
                            data: {
                                managerId: this.$route.query.id
                            },
                            method: 'post'
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                // 将之前部门（包括未保存的）移除，并隐藏添加部门按钮
                                this.info.departmentList = [];
                                this.departmentFormList = [];
                                this.info.departmentList.push({
                                    id: -1,
                                    name: '园区经理'
                                });
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        // 选择分配部门
                        this.$http({
                            url: '/api/manageSystem/system/manager/manager/addManagerDepartment',
                            data: {
                                managerId: this.$route.query.id,
                                departmentId: value[0],
                                jobId: value[1]
                            },
                            method: 'post'
                        }).then((response) => {
                            if (response.data.code === '00000') {
                                // 移除已保存的表单
                                this.departmentFormList.splice(this.departmentFormList.indexOf(department), 1);
                                // 将保存的信息变为info
                                this.info.departmentList.push({
                                    id: response.data.id,
                                    name: response.data.name
                                });
                            }
                        }).catch((response) => {
                            console.log(response);
                        });
                    }
                } else {
                    // 弹框提示
                    this.$alert('请选择部门与职位', '提示', {
                        confirmButtonText: '确定'
                    });
                }
            },
            handleRemoveDepartment(department) {
                // 移除职位
                this.$confirm('是否将该员工移出部门？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/manager/manager/removeManagerDepartment',
                        params: {
                            id: department.id
                        },
                        method: 'delete'
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            // 移除已保存的表单
                            this.info.departmentList.splice(this.info.departmentList.indexOf(department), 1);
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
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
                    managerId: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info.managerName = response.data.managerName;
                    this.info.managerCellphone = response.data.managerCellphone;
                    this.info.departmentList = response.data.departmentList;
                    this.info.departmentList.forEach((element,index) => {
                        if(element.isShow==0){
                            this.info.departmentList.splice(index,1)
                        }
                    });
                }
            }).catch((response) => {
                console.log(response);
            });

            this.$http({
                url: '/api/manageSystem/system/manager/manager/getSimpleDepartmentList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.departmentList = response.data.departmentList;
                    if (this.$store.state.isSuper === true) {
                        this.departmentList.push({
                            value: -1,
                            label: '园区经理'
                        });
                    }
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>