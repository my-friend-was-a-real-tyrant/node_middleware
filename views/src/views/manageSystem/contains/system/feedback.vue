<style lang="less" scoped>
    .feedback{ background: #EEF1F6; padding: 0;
        &-title{ height: 70px; line-height: 70px; background: #ffffff; padding-left: 40px}
        ul{
            li{ margin: 20px 25px; background: #ffffff; padding: 30px 20px;
                div{ font-size: 16px; width: 78%; line-height: 30px; 
                    p{ margin-bottom: 15px;}
                    span{ font-size: 14px}
                }
            }
        }
    }
</style>
<template>
    <div class="feedback">
        <div class="feedback-title">
            意见反馈
        </div>
        <div>
            <ul>
                <li v-for="( n , index ) in listMessage" :key="index" @click="linkDetails(n.id)">
                    <div>
                        <p>{{n.content}}</p>
                        <span>{{n.createDatetime}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="feedback-page">
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
</template>
<script>
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage !== undefined) ? (parseInt(this.$route.query.currentPage)) : 1;
            return {
                pageData: {
                    currentPage,
                    totalSize: 1,
                    pageSize: 10
                },
                listMessage: [
                    {
                        content: '文字',
                        createDatetime: '2017-11-27  3:30',
                        id: '',
                    }
                ]
           }
        },
        methods: {
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/feedback'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/feedback',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/feedback',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
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
                    method: 'get',
                    url: "/api/manageSystem/system/feedback/getFeedbackList"
                }).then((res) => {
                    if (res.data.code === '00000') {
                        this.listMessage = [];
                        for (let i in res.data.data.list) {
                            let time = new Date(parseInt(res.data.data.list[i].createDatetime)).toLocaleString().substr(0,16)
                            this.listMessage.push({
                                content: res.data.data.list[i].content,
                                createDatetime: time,
                                id: res.data.data.list[i].id,
                            })
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            linkDetails(adviceId) {
                this.$router.push({ name: 'index', query: { adviceId } });
            }            
        },
        mounted() {
            this.watchQueryFun();   
        },
        watch: {
            '$route.query.currentPage': function(){
                this.watchQueryFun();
            }
        }
    }
</script>
