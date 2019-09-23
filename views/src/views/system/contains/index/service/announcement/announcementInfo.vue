<style lang="less" scoped>
    .info {
        width: 100%;
        height: 100%;
        background-color: #eeeeee;
        overflow-y: scroll;
        &-up {
            width: 100%;
            padding: 0 .3rem .3rem;
            background-color: #fff;
            &:not(:last-child){
                margin-bottom: .3rem;
            }
        }
        &-title {
            font-size: .32rem;
            color: #333;
            line-height: .5rem;
            padding-bottom: .19230769rem;
            text-indent: 2em;
            font-weight: 700;
        }
        &-date {
            font-size: .24rem;
            color: #999;
            line-height: 1;
            text-align: center;
        }
        &-img {
            width: 100%;
        }
        &-content {
            padding: .3rem 0;
            font-size: .24rem;
            color: #666;
            line-height: .32846154rem;
        }
        &-top {
            padding: .3rem;
            background-color: #fff;
            &-item {
                font-size: .28rem;
                line-height: 2;
                &-title {
                    display: inline-block;
                    width: 1.3rem;
                    color: #666;
                }
                &-content {
                    color: #333;
                }
            }
        }
        &-mid {
            width: 100%;
            height: .3rem;
            background-color: #ddd;
        }
        &-button {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            border-radius: 0;
        }
        &-tel {
            color: #72ACE3;
        }
        .bottom-li{
            line-height: .38461538rem;
        }
    }
</style>
<template>
    <div class="info" v-title="'公告详情'">
        <div class="info-up">
            <div class="info-title">
                <span>{{ announcementInfo.title }}</span>
            </div>
            <img :src="img" class="info-img" v-for="img in announcementInfo.img" :key="img" v-show="announcementInfo.img.length > 0" />
            <pre class="info-content">{{ announcementInfo.content }}</pre>
        </div>
        <div class="info-up">
            <ul class="info-content bottom-li">
                <li>联系人：{{ announcementInfo.contact }}</li>
                <li>联系方式：<a :href="'tel:' + announcementInfo.cellphone" class="info-tel">{{ announcementInfo.cellphone }}</a></li>
                <li>发布时间：{{ announcementInfo.createDatetime }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdButton
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            }
        },
        data() {
            return {
                announcementInfo: {
                    title: '',
                    createDatetime: '',
                    img: [],
                    content: '',
                    contact: '',
                    cellphone: ''
                }
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            } else {
                this.$http({
                    url: '/api/system/service/announcement/getAnnouncementInfo',
                    params: {
                        announcementId: this.$route.query.id
                    }
                }).then((response) => {
                    this.announcementInfo = response.data.announcementInfo;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>