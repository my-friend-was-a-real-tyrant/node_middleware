<style lang="less" scoped>
    .feedbackDetail{ background: #EEF1F6; padding: 0;
       &-detailTitle{ height: 70px; line-height: 70px; background: #ffffff; padding-left: 40px}
       &-content{ margin: 20px 25px; background: #ffffff; padding: 30px 0px;
            h6{ font-size: 22px; text-align: center;}
            &-text{ text-indent: 2em; font-size: 16px; margin: 20px 10px;
                img{ width: 200px;  height: 120px; margin: 0px 10px 10px}
                span{ display: inline-block; text-indent: 2em;}
            }
            &-time{ text-align: right; font-size: 14px; opacity: .7; margin-right: 20px}
       }
    }
</style>
<template>
    <div class="feedbackDetail">
        <div class="feedbackDetail-detailTitle">
            意见反馈详情
        </div>
        <div class="feedbackDetail-content">
            <h6>{{detail.subject}}</h6>
            <div class="feedbackDetail-content-text">
                <!-- <img src="../../../../../../images/index_banner_01.jpg" alt=""> -->
                <img v-for="n in detail.imgSrc" :src="n" alt="" :key="n">
                <span>{{detail.content}}</span>
            </div>
            <div class="feedbackDetail-content-time">
                {{detail.createDatetime}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                detail: {
                    subject: "标题",
                    content: "内容",
                    createDatetime: "2017-12-01",
                    imgSrc: []
                }
           }
        },
        methods: {
           
        },
        mounted() { 
            this.$http({
                method: 'get',
                url: '/api/manageSystem/system/feedback/getFeedbackInfo',
                params: {
                    adviceId: this.$route.query.adviceId
                }
            }).then((res) => {
                if (res.data.code === "00000") {
                    const time = new Date(parseInt(res.data.data.createDatetime)).toLocaleString().substr(0,16);
                    this.detail.content = res.data.data.content;
                    this.detail.subject = res.data.data.subject;
                    this.detail.createDatetime = time;
                    this.detail.imgSrc = [];
                    for(let i = 0; i < res.data.data.advicePictureList.length; i ++) {
                        this.detail.imgSrc.push(res.data.data.advicePictureList[i])
                    }
                    
                }
            })
        },
        watch: {
            
        }
    }
</script>
