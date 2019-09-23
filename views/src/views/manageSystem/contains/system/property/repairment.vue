<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
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
                <el-form-item>
                    <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
                </el-form-item>
            </div>
            <el-form-item>
                <el-checkbox v-model="formData.belongToMe">只查看指派给我的</el-checkbox>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%"
            @filter-change="filterFun">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="描述：">
                            <pre>{{ props.row.repairmentDescription }}</pre>
                        </el-form-item>
                        <el-form-item label="维修员：" v-if="props.row.repairMan !== ''">
                            <p>
                                <span>{{ props.row.repairMan }}</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="维修员电话：" v-if="props.row.repairManCellphone !== ''">
                            <p>
                                <span>{{ props.row.repairManCellphone }}</span>
                            </p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="repairmentType" label="报修类型" min-width="130"
                column-key="repairmentType"
                :filters="[{ text: '居家报修', value: '1' }, { text: '公共报修', value: '2' }]"
                :filter-multiple="false"></el-table-column>
            <el-table-column prop="repairmentArea" label="报修区域" min-width="150"></el-table-column>
            <el-table-column prop="contactPersonName" label="联系人" min-width="120"></el-table-column>
            <el-table-column prop="contactPersonCellphone" label="联系方式" min-width="180"></el-table-column>
            <el-table-column prop="repairmentDatetime" label="报修时间" min-width="180"></el-table-column>
            <el-table-column prop="repairmentStatus" label="状态" min-width="180"
                column-key="repairmentStatus"
                :filters="[{ text: '审核中', value: '1' }, { text: '维修中', value: '2' }, { text: '已拒绝', value: '3' }, { text: '已转送', value: '4' }, { text: '维修完成', value: '5' }, { text: '已评价', value: '6' }]"
                :filter-multiple="false"></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="search" @click="editRepairment(scope.row)">详情</el-button>
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
                    belongToMe: false
                },
                sendData: {
                    keywords: '',
                    startDate: '',
                    endDate: '',
                    belongToMe: false,
                    repairmentType: '',
                    repairmentStatus: ''
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
                    url: '/api/manageSystem/system/property/repairment/getRepairmentList',
                    params: {
                        keywords: this.sendData.keywords,
                        startDate: transition(this.sendData.startDate),
                        endDate: transition(this.sendData.endDate),
                        belongToMe: this.sendData.belongToMe,
                        repairmentStatus: this.sendData.repairmentStatus ? this.sendData.repairmentStatus : '',
                        repairmentType: this.sendData.repairmentType ? this.sendData.repairmentType : '',
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
                        path: '/manageSystem/property/repairment'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/repairment',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/property/repairment',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            filterFun(obj) {
                console.log(obj);
                if (Array.isArray(obj['repairmentType'])) {
                    this.sendData.repairmentType = obj['repairmentType'][0];
                } else if (Array.isArray(obj['repairmentStatus'])) {
                    this.sendData.repairmentStatus = obj['repairmentStatus'][0];
                }
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/property/repairment'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/repairment',
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
                this.sendData.belongToMe = this.formData.belongToMe;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/property/repairment'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/repairment',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            editRepairment(row) {
                this.$router.push({
                    path: '/manageSystem/property/repairment/repairmentInfo',
                    query: {
                        repairmentId: row.repairmentId
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