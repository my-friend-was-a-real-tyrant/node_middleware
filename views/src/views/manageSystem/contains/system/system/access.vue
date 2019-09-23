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
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%"
            @filter-change="filterFun">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="请求来源：">
                            <p>
                                <span>{{ props.row.sourceIp }}</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="接口状态码：">
                            <p>
                                <span>{{ props.row.responseStatus }}</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="接口耗时：">
                            <p>
                                <span>{{ props.row.timeCost }}</span>
                            </p>
                        </el-form-item>
                        <br />
                        <el-form-item label="参数：">
                            <p>
                                <span>{{ props.row.parameters }}</span>
                            </p>
                        </el-form-item>
                        <br />
                        <el-form-item label="返回：">
                            <p>
                                <span>{{ props.row.returnData }}</span>
                            </p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="createDatetime" label="时间" width="200"></el-table-column>
            <el-table-column prop="method" label="方法" width="100"
                column-key="method"
                :filters="[{ text: 'POST', value: 'POST' }, { text: 'GET', value: 'GET' }, { text: 'PATCH', value: 'PATCH'}, {text: 'DELETE', value: 'DELETE'}]"
                :filter-multiple="false"></el-table-column>
            <el-table-column prop="uri" label="URI" width="400"></el-table-column>
            <el-table-column prop="responseCode" label="通讯返回" width="300"></el-table-column>
            <el-table-column prop="responseSubCode" label="业务返回" min-width="300"></el-table-column>
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
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) : 1;
            return {
                formData: {
                    keywords: '',
                    startDate: '',
                    endDate: ''
                },
                sendData: {
                    keywords: '',
                    startDate: '',
                    endDate: '',
                    method: ''
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
            watchQueryFun() {
                // 监测路由中的query数据变化
                if (this.$route.query.currentPage) {
                    this.pageData.currentPage = parseInt(this.$route.query.currentPage);
                } else {
                    this.pageData.currentPage = 1;
                }
                this.ajaxFun();
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/system/access/getAccessLogsList',
                    params: {
                        keywords: this.sendData.keywords,
                        startDate: transition(this.sendData.startDate),
                        endDate: transition(this.sendData.endDate),
                        method: this.sendData.method,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.logsList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/system/access'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/system/access',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/system/access',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            filterFun(obj) {
                if (Array.isArray(obj['method'])) {
                    this.sendData.method = obj['method'][0];
                }
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/system/access'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/system/access',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                this.sendData.startDate = this.formData.startDate;
                this.sendData.endDate = this.formData.endDate;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/system/access'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/system/access',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            }
        },
        mounted() {
            this.watchQueryFun();
        },
        watch: {
            '$route.query.currentPage': function () {
                this.watchQueryFun();
            }
        }
    }
</script>