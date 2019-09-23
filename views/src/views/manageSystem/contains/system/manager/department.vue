<style lang="less" scoped>
    .scoped{
        &-li{ list-style: decimal inside;}
    }
</style>
<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="关键字">
                <el-input v-model="formData.keywords" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" icon="my-add" size="small" @click="handleAddDepartment" v-permit="201">添加部门</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="权限：">
                            <p>
                                <ol class="clearFix" v-for="permission in props.row.permissionsGroup" :key="permission.id">
                                    <p class="fl">{{ permission.name }}：</p>
                                    <li class="fl scoped-li" v-for="subPermission in permission.children" :key="subPermission.id">{{ subPermission.name }}</li>
                                </ol>
                            </p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="park" label="园区" width="150"></el-table-column>
            <el-table-column prop="department" label="部门" min-width="150"></el-table-column>
            <el-table-column prop="description" label="描述" min-width="250"></el-table-column>
            <el-table-column label="操作" min-width="280">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="edit" @click="handleEditDepartment(scope.row)" v-permit="202">编辑</el-button>
                    <el-button type="danger" size="small" icon="delete" @click="handleDeleteDepartment(scope.row)" v-permit="203">删除</el-button>
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
                formData: {
                    keywords: ''
                },
                sendData: {
                    keywords: ''
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
                    url: '/api/manageSystem/system/manager/department/getDepartmentList',
                    params: {
                        keywords: this.sendData.keywords,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.departmentList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/manager/department'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/manager/department',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/manager/department',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/manager/department'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/manager/department',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleAddDepartment() {
                this.$router.push('/manageSystem/manager/department/addDepartment');
            },
            handleEditDepartment({ id }) {
                this.$router.push({
                    path: '/manageSystem/manager/department/editDepartment',
                    query: {
                        id
                    }
                });
            },
            handleDeleteDepartment({ id }) {
                this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/manager/department/deleteDepartment',
                        params: {
                            id
                        },
                        method: 'delete'
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.searchFun();
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                });
            }
        },
        mounted(){
            this.watchQueryFun();
        },
        watch: {
            '$route.query.currentPage': function(){
                this.watchQueryFun();
            }
        }
    }
</script>