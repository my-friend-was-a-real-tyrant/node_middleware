<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="关键字">
                <el-input v-model="formData.keywords"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%"
            @filter-change="filterFun">
            <el-table-column prop="name" label="商品名称" min-width="150"></el-table-column>
            <el-table-column prop="originPrice" label="原价" min-width="100"></el-table-column>
            <el-table-column prop="groupPrice" label="团购价" min-width="100"></el-table-column>
            <el-table-column prop="startDatetime" label="开始时间" min-width="180"></el-table-column>
            <el-table-column prop="endDatetime" label="结束时间" min-width="180"></el-table-column>
            <el-table-column prop="maxCount" label="成团数量" min-width="100"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="150"
                column-key="status"
                :filters="[{ text: '未开始', value: '1' }, { text: '进行中', value: '2' }, { text: '团购成功', value: '3' }, { text: '团购失败', value: '4' }]"
                :filter-multiple="false"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="search" @click="groupPurchaseInfo(scope.row)">详情</el-button>
                    <el-button type="primary" size="small" icon="edit" @click="editGroupPurchase(scope.row)">编辑</el-button>
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
            const currentPage = (this.$route.query.currentPage!==undefined)?(parseInt(this.$route.query.currentPage)):1;
            return {
                formData: {
                    keywords: ''
                },
                sendData: {
                    keywords: '',
                    status: ''
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
                    url: '/api/manageSystem/system/mall/merchandise/groupPurchase/getGroupPurchaseList',
                    params: {
                        keywords: this.sendData.keywords,
                        status: this.sendData.status ? this.sendData.status : '',
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.groupPurchaseList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/groupPurchase'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/groupPurchase',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/mall/merchandise/groupPurchase',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            filterFun(obj) {
                if (Array.isArray(obj['status'])) {
                    this.sendData.status = obj['status'][0];
                }
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/groupPurchase'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/groupPurchase',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/groupPurchase'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/merchandise/groupPurchase',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            groupPurchaseInfo(row) {
                this.$router.push({
                    path: '/manageSystem/mall/merchandise/merchandise/groupPurchaseInfo',
                    query: {
                        id: row.id
                    }
                });
            },
            editGroupPurchase(row) {
                this.$router.push({
                    path: '/manageSystem/mall/merchandise/merchandise/editGroupPurchase',
                    query: {
                        id: row.id
                    }
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