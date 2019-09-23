<style lang="less" scoped>
    .scoped-contain-back{ vertical-align: middle;}
    .scoped-form{
        .el-input, .el-select{ width: 500px;}
    }
    .activityInfo{
        &-img{ max-width: 200px; margin-right: 20px; margin-bottom: 20px;}
    }
</style>
<template>
    <div class="contain-main">
        <div class="contain-title">
            <span>活动详情</span>
        </div>
        <el-form class="scoped-form" label-width="180px" label-position="right">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="状态：">
                        <span>{{ info.status }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发布人：">
                        <span>{{ info.issuer }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="编号：">
                        <span>{{ info.activityNumber }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系人：">
                        <span>{{ info.contact }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系方式：">
                        <span>{{ info.cellphone }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="报名起止日期：">
                        <span>{{ info.enrollDate }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动起止时间：">
                        <span>{{ info.activityDatetime }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="活动地址：">
                        <span>{{ info.address }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动对象：">
                        <span>{{ info.target }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="活动人数：">
                        <span>{{ info.maxCount }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="单个账号最大报名人数：">
                        <span>{{ info.userCountMax }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="活动标题：">
                        <span>{{ info.title }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="活动内容：">
                        <span>{{ info.content }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="info.imgList.length > 0">
                <el-col :span="24">
                    <el-form-item label="活动图片：">
                        <img class="activityInfo-img" :src="img" v-for="img in info.imgList" :key="img" @click="handleBigImage(img)" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-button 
                    type="primary" icon="edit" size="small" 
                    :disabled="info.statusCode === 'OUT_OF_DATE'" 
                    @click="handleEditActivity" 
                    v-permit="1502">编辑活动</el-button>
                <el-button 
                    type="primary" icon="share" size="small" 
                    @click="exportEnrollList">导出报名名单</el-button>
                <el-button 
                    icon="my-return" size="small" 
                    @click="handleRouterReturn">返回</el-button>
            </el-row>
        </el-form>
        <div class="contain-title">
            <span>报名者名单</span>
        </div>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="cellphone" label="手机号" min-width="120"></el-table-column>
            <el-table-column prop="address" label="住址" min-width="150"></el-table-column>
            <el-table-column prop="count" label="参加人数" min-width="80"></el-table-column>
            <el-table-column prop="enrollDatetime" label="报名时间" min-width="180"></el-table-column>
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
        <el-dialog v-model="bigImgVisible" size="tiny">
            <img width="100%" :src="bigImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage!==undefined)?(parseInt(this.$route.query.currentPage)):1;
            return {
                info: {
                    status: '',
                    statusCode: '',
                    issuer: '',
                    activityNumber: '',
                    contact: '',
                    cellphone: '',
                    enrollDate: '',
                    activityDatetime: '',
                    address: '',
                    target: '',
                    maxCount: '',
                    title: '',
                    content: '',
                    imgList: [],
                    userCount: ''
                },
                tableData: [],
                pageData: {
                    currentPage: 1,
                    totalSize: 1,
                    pageSize: 10
                },
                bigImgVisible: false,
                bigImageUrl: '',
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
                    url: '/api/manageSystem/system/property/activity/getActivityEnrollList',
                    params: {
                        id: this.$route.query.id,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.enrollList;
                    }
                }).catch((response) => {});
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/property/activity/activityInfo',
                        query: {
                            id: this.$route.query.id
                        }
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/property/activity/activityInfo',
                        query: {
                            id: this.$route.query.id,
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/property/activity/activityInfo',
                    query: {
                        id: this.$route.query.id,
                        currentPage: currentPage
                    }
                });
            },
            handleRouterReturn() {
                this.$router.push('/manageSystem/property/activity');
            },
            handleEditActivity() {
                this.$router.push({
                    path: '/manageSystem/property/activity/editActivity',
                    query: {
                        id: this.$route.query.id
                    }
                });
            },
            exportEnrollList() {
                this.$http({
                    url: '/api/manageSystem/system/property/actiity/exportEnrollList',
                    method: 'get',
                    params: {
                        id: this.$route.query.id
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        window.open(response.data.path);
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleBigImage(url) {
                this.bigImageUrl = url;
                this.bigImgVisible = true;
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/activity/getActivityInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.activityInfo;
                }
            }).catch((response) => {});
            this.watchQueryFun();
        },
        watch: {
            '$route.query.currentPage': function(){
                this.watchQueryFun();
            }
        }
    }
</script>