<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="关键字">
                <el-input v-model="formData.keywords" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="date" label="开始日期">
                <el-date-picker
                    v-model="formData.startDate"
                    type="date"
                    placeholder="请选择开始日期" size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="date" label="结束日期">
                <el-date-picker
                    v-model="formData.endDate"
                    type="date"
                    placeholder="请选择结束日期" size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="my-add" size="small" @click="handleAddAnnouncement" v-permit="1801">添加公告</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" min-width="120"></el-table-column>
            <el-table-column prop="contact" label="联系人" min-width="80"></el-table-column>
            <el-table-column prop="cellphone" label="联系方式" min-width="130"></el-table-column>
            <el-table-column prop="releaseDatetime" label="发布时间" min-width="150"></el-table-column>
            <el-table-column label="操作" min-width="220">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="search" @click="handleAnnouncementInfo(scope.row.id)">详情</el-button>
                    <el-button type="primary" size="small" icon="edit" @click="handleEditActivity(scope.row.id)" v-permit="1802">编辑</el-button>
                    <el-button type="danger" size="small" icon="delete" @click="handleDeleteActivity(scope.row.id)" v-permit="1803">删除</el-button>
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
    import { transition } from 'publicSource/dateTransition'
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage!==undefined)?(parseInt(this.$route.query.currentPage)):1;
            return {
                formData: {
                    keywords: '',
                    startDate: '',
                    endDate: ''
                },
                sendData: {
                    keywords: '',
                    startDate: '',
                    endDate: ''
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
                    url: '/api/manageSystem/system/property/announcement/getAnnouncementList',
                    params: {
                        keywords: this.sendData.keywords,
                        startDate: transition(this.sendData.startDate),
                        endDate: transition(this.sendData.endDate),
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.announcementList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/property/announcement'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/announcement',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/property/announcement',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                this.sendData.startDate = this.formData.startDate;
                this.sendData.endDate = this.formData.endDate;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/property/announcement'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/announcement',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleAddAnnouncement() {
                this.$router.push({
                    path: '/manageSystem/property/announcement/addAnnouncement'
                });
            },
            handleAnnouncementInfo(id) {
                this.$router.push({
                    path: '/manageSystem/property/announcement/announcementInfo',
                    query: {
                        id
                    }
                });
            },
            handleEditActivity(id) {
                this.$router.push({
                    path: '/manageSystem/property/announcement/editAnnouncement',
                    query: {
                        id
                    }
                });
            },
            handleDeleteActivity(id) {
                this.$confirm('您确定删除该公告吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/property/announcement/deleteAnnouncement',
                        method: 'delete',
                        params: {
                            id
                        }
                    }).then((response) => {
                        if(this.$route.query.currentPage){
                            this.$router.push({
                                path: '/manageSystem/property/announcement'
                            });
                        } else {
                            this.$router.push({
                                path: '/manageSystem/property/announcement',
                                query: {
                                    currentPage: 1
                                }
                            });
                        }
                    }).catch((response) => {
                        console.log(response);
                    })
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