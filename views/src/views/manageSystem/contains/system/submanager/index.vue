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
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleAddManagerRoute" v-permit="301">添加次级管理员</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="realName" label="姓名" min-width="150"></el-table-column>
            <el-table-column prop="cellphone" label="联系方式" min-width="150"></el-table-column>
            <el-table-column prop="locked" label="状态" min-width="120"></el-table-column>
            <el-table-column label="操作" min-width="280">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="search" @click="handleManagerInfo(scope.row)">详情</el-button>
                    <el-button type="primary" size="small" icon="edit" @click="handleEditManager(scope.row)" v-permit="302">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <div class="contain-bottom-pagination">
                <el-pagination class="fr" layout="sizes, total, prev, pager, next, jumper" :current-page="pageData.currentPage" :total="pageData.totalSize" :page-sizes="[10, 20, 50, 100]" :page-size="pageData.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
                    managerName: '',
                    managerCellphone: '',
                },
                sendData: {
                    managerName: '',
                    managerCellphone: '',
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
                    url: '/api/manageSystem/system/getSecondaryAdminList',
                    params: {
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.data.total;
                        this.tableData = response.data.data.list;
                        this.tableData.forEach(element => {
                            element.locked=(element.locked==true?'冻结':'未冻结')
                        });
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/system/submanager'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/system/submanager',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/system/submanager',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.$http({
                    url: '/api/manageSystem/system/getSecondaryAdminList',
                    params: {
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize,
                        managerName:this.formData.managerName,
                        managerCellphone:this.formData.managerCellphone
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.data.total;
                        this.tableData = response.data.data.list;
                        this.tableData.forEach(element => {
                            element.locked=(element.locked==true?'冻结':'未冻结')
                        });
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleAddManagerRoute() {
                this.$router.push('/manageSystem/system/submanager/addSubManager');
            },
            handleManagerInfo(row) {
                this.$router.push({
                    path: '/manageSystem/system/submanager/submanagerInfo',
                    query: {
                        managerId:row.id,
                        managerName:row.realName,
                        managerCellphone:row.cellphone,
                        status:row.locked
                    }
                });
            },
            handleEditManager(row) {
                this.$router.push({
                    path: '/manageSystem/system/submanager/editSubManager',
                    query: {
                        managerId: row.id,
                        managerName:row.realName,
                        managerCellphone:row.cellphone,
                        isLocked:row.locked=='冻结'?true:false
                    }
                });
            },
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