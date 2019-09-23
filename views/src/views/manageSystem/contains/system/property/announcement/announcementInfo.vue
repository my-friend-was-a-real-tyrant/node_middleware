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
            <span>公告详情</span>
        </div>
        <el-form class="scoped-form" label-width="120px" label-position="left">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="发布人：">
                        <span>{{ info.issuer }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="发布日期：">
                        <span>{{ info.releaseDate }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="编号：">
                        <span>{{ info.announcementNumber }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="联系人：">
                        <span>{{ info.contact }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式：">
                        <span>{{ info.cellphone }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="标题：">
                        <span>{{ info.title }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="内容：">
                        <span>{{ info.content }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="info.imgList.length > 0">
                <el-col :span="24">
                    <el-form-item label="附图：">
                        <img class="activityInfo-img" :src="img" v-for="img in info.imgList" :key="img" @click="handleBigImage(img)" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-button 
                    type="primary" icon="edit" size="small" 
                    @click="handleEditAnnouncement"
                    v-permit="1802">编辑</el-button>
                <el-button 
                    type="danger" icon="delete" size="small" 
                    @click="handleDeleteAnnouncement"
                    v-permit="1803">删除</el-button>
                <el-button 
                    icon="my-return" size="small" 
                    @click="handleRouterReturn">返回</el-button>
            </el-row>
        </el-form>
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
                    issuer: '',
                    announcementNumber: '',
                    contact: '',
                    cellphone: '',
                    title: '',
                    content: '',
                    imgList: []
                },
                bigImgVisible: false,
                bigImageUrl: '',
            }
        },
        methods: {
            handleRouterReturn() {
                this.$router.push('/manageSystem/property/announcement');
            },
            handleEditAnnouncement() {
                this.$router.push({
                    path: '/manageSystem/property/announcement/editAnnouncement',
                    query: {
                        id: this.$route.query.id
                    }
                });
            },
            handleDeleteAnnouncement() {
                this.$confirm('您确定删除该公告吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/property/announcement/deleteAnnouncement',
                        method: 'delete',
                        params: {
                            id: this.$route.query.id
                        }
                    }).then((response) => {
                        if (this.$route.query.currentPage) {
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
            },
            handleBigImage(url) {
                this.bigImageUrl = url;
                this.bigImgVisible = true;
            }
        },
        mounted() {
            this.$http({
                url: '/api/manageSystem/system/property/announcement/getAnnouncementInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.announcementInfo;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>