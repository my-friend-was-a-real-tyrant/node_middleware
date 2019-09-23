<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formData.managerName" size="small" icon="my-addressbook_fill" placeholder="员工姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="formData.managerCellphone" size="small" icon="my-mobile" placeholder="员工手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="formData.department" size="small" placeholder="部门">
                    <el-option :value="''" label="全部部门"></el-option>
                    <el-option v-for="department in departmentList" :key="department.value" :value="department.value" :label="department.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="formData.job" size="small" placeholder="职位">
                    <el-option :value="''" label="全部职位"></el-option>
                    <el-option :value="3" label="园区经理"></el-option>
                    <el-option :value="1" label="经理"></el-option>
                    <el-option :value="2" label="员工"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleAddManagerRoute" v-permit="301">添加员工</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="departmentName" label="部门" min-width="120"></el-table-column>
            <el-table-column prop="job" label="职位" min-width="120"></el-table-column>
            <el-table-column prop="managerName" label="姓名" min-width="150"></el-table-column>
            <el-table-column prop="managerCellphone" label="联系方式" min-width="150"></el-table-column>
            <el-table-column prop="isLocked" label="状态" min-width="120"></el-table-column>
            <el-table-column label="操作" min-width="280">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="search" @click="handleManagerInfo(scope.row)">详情</el-button>
                    <el-button type="primary" size="small" icon="edit" @click="handleEditManager(scope.row)" v-permit="302">编辑</el-button>
                    <el-button :disabled="scope.row.isParkManager" size="small" icon="my-businesscard" @click="handleEditManagerDepartment(scope.row)" v-permit="304">分配部门</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <div class="contain-bottom-pagination">
                <el-pagination 
                    class="fr"
                    layout="sizes, total, prev, pager, next, jumper" 
                    :current-page="pageData.currentPage"
                    :total="pageData.totalSize" 
                    :page-sizes="[10, 20, 50, 100]" 
                    :page-size="pageData.pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) : 1;
            return {
                departmentList: [],
                formData: {
                    managerName: '',
                    managerCellphone: '',
                    job: '',
                    department: ''
                },
                sendData: {
                    managerName: '',
                    managerCellphone: '',
                    job: '',
                    department: ''
                },
                tableData: [],
                pageData: {
                    currentPage,
                    totalSize: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            watchQueryFun(){
                // 监测路由中的query数据变化
                if(this.$route.query.currentPage) {
                    this.pageData.currentPage = parseInt(this.$route.query.currentPage);
                } else {
                    this.pageData.currentPage = 1;
                }
                this.ajaxFun();
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/manager/manager/getManagerList',
                    params: {
                        managerName: this.sendData.managerName,
                        managerCellphone: this.sendData.managerCellphone,
                        job: this.sendData.job,
                        department: this.sendData.department,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.repairmentList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/manager/manager'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/manager/manager',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/manager/manager',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.managerName = this.formData.managerName;
                this.sendData.managerCellphone = this.formData.managerCellphone;
                this.sendData.job = this.formData.job;
                this.sendData.department = this.formData.department;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/manager/manager'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/manager/manager',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleAddManagerRoute() {
                this.$router.push('/manageSystem/manager/manager/addManager');
            },
            handleManagerInfo(row) {
                this.$router.push({
                    path: '/manageSystem/manager/manager/managerInfo',
                    query: {
                        managerId: row.managerId
                    }
                });
            },
            handleEditManager(row) {
                this.$router.push({
                    path: '/manageSystem/manager/manager/editManager',
                    query: {
                        managerId: row.managerId
                    }
                });
            },
            handleEditManagerDepartment(row) {
                this.$router.push({
                    path: '/manageSystem/manager/manager/editManagerDepartment',
                    query: {
                        id: row.managerId
                    }
                });
            }
        },
        mounted(){
            this.watchQueryFun();
            this.$http({
                url: '/api/manageSystem/system/manager/manager/getSimpleDepartmentList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.departmentList = response.data.departmentList;
                }
            }).catch((response) => {
                console.log(response);
            });
        },
        watch: {
            '$route.query.currentPage': function(){
                this.watchQueryFun();
            }
        }
    }
</script>