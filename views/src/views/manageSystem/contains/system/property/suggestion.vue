<style lang="less" scoped>
    .el-input, .el-select{ width: 200px;}
</style>

<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline" label-width="70px" label-position="left">
            <div>
                <el-form-item label="关键字">
                    <el-input v-model="formData.keywords" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="date" label="开始日期">
                    <el-date-picker
                        v-model="formData.startDate"
                        type="date"
                        placeholder="请选择开始日期"
                        size="small">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="date" label="结束日期">
                    <el-date-picker
                        v-model="formData.endDate"
                        type="date"
                        placeholder="请选择结束日期" size="small">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="楼栋">
                    <el-input v-model="formData.building" size="small"></el-input>
                </el-form-item>
                <el-form-item label="房间号">
                    <el-input v-model="formData.room" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
                </el-form-item>
            </div>
            <el-form-item>
                <el-checkbox v-model="formData.belongToMe">只查看指派给我的</el-checkbox>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="address" label="地址" min-width="150"></el-table-column>
            <el-table-column prop="userName" label="咨询人" min-width="120"></el-table-column>
            <el-table-column prop="userCellphone" label="联系方式" min-width="150"></el-table-column>
            <el-table-column prop="datetime" label="咨询时间" min-width="150"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="search" @click="handleSuggestionInfo(scope.row)">详情</el-button>
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
                    endDate: '',
                    belongToMe: false,
                    building: '',
                    room: ''
                },
                sendData: {
                    keywords: '',
                    startDate: '',
                    endDate: '',
                    belongToMe: false,
                    building: '',
                    room: ''
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
                    url: '/api/manageSystem/system/property/suggestion/getSuggestionList',
                    params: {
                        keywords: this.sendData.keywords,
                        startDate: transition(this.sendData.startDate),
                        endDate: transition(this.sendData.endDate),
                        belongToMe: this.sendData.belongToMe,
                        building: this.sendData.building,
                        room: this.sendData.room,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.suggestionList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/property/suggestion'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/suggestion',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/property/suggestion',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                this.sendData.startDate = this.formData.startDate;
                this.sendData.endDate = this.formData.endDate;
                this.sendData.belongToMe = this.formData.belongToMe;
                this.sendData.building = this.formData.building;
                this.sendData.room = this.formData.room;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/property/suggestion'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/suggestion',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleSuggestionInfo({ id }) {
                this.$router.push({
                    path: '/manageSystem/property/suggestion/suggestionInfo',
                    query: {
                        id
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
            },
            'formData.belongToMe': function() {
                this.searchFun();
            }
        }
    }
</script>