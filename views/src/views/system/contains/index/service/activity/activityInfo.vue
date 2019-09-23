<style lang="less" scoped>
    .info{ width: 100%; height: 100%; padding: 0 0 .96rem; overflow-y: scroll;
        &-up{ width: 100%; padding: 0 .3rem .3rem; background-color: #fff;}
        &-title{ font-size: .36rem; color: #333; text-align: center; line-height: .84rem;}
        &-date{ font-size: .24rem; color: #999; line-height: 1; text-align: right;}
        &-img{ width: 100%;}
        &-content{ font-size: .28rem; color: #666;padding-bottom: .19230769rem;text-indent: 2em;}
        &-top{ padding: .3rem; background-color: #fff;
            &-item{ font-size: .28rem; line-height: 2;
                &-title{ display: inline-block; width: 1.3rem; color: #666;}
                &-content{ color: #333;}
            }
        }
        &-mid{ width: 100%; height: .3rem; background-color: #ddd;}
        &-button{ position: fixed; bottom: 0; left: 0; width: 100%; border-radius: 0;}
        &-tel{ color: #72ACE3;}
        &-img-big{ position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); overflow: scroll;
            img{ width: 100%;}
        }
    }
</style>
<template>
    <div class="info" v-title="'活动详情'">
        <div class="info-up">
            <div class="info-title">
                <span>{{ activityInfo.title }}</span>
            </div>
            <div class="info-date">发布时间：{{ activityInfo.createDatetime }}</div>
            <pre class="info-content">{{ activityInfo.content }}</pre>
            <img :src="img" class="info-img" v-for="img in activityInfo.img" :key="img" v-show="activityInfo.img.length > 0" @click="handleImgBig(img)" />
        </div>
        <div class="info-mid"></div>
        <ul class="info-top">
            <li class="info-top-item">
                <span class="info-top-item-title">报名时间:</span>
                <span class="info-top-item-content">{{ activityInfo.enrollTime }}</span>
            </li>
            <li class="info-top-item">
                <span class="info-top-item-title">活动时间:</span>
                <span class="info-top-item-content">{{ activityInfo.activityTime }}</span>
            </li>
            <li class="info-top-item">
                <span class="info-top-item-title">活动地点:</span>
                <span class="info-top-item-content">{{ activityInfo.activityAddress }}</span>
            </li>
            <li class="info-top-item">
                <span class="info-top-item-title">活动对象:</span>
                <span class="info-top-item-content">{{ activityInfo.activityTarget }}</span>
            </li>
            <li class="info-top-item">
                <span class="info-top-item-title">联系人:</span>
                <span class="info-top-item-content">{{ activityInfo.contact }}</span>
            </li>
            <li class="info-top-item">
                <span class="info-top-item-title">联系电话:</span>
                <a :href="'tel:' + activityInfo.contactCellphone" class="info-tel">{{ activityInfo.contactCellphone }}</a>
            </li>
            <li class="info-top-item">
                <span class="info-top-item-title">参加人数:</span>
                <span class="info-top-item-content">{{ activityInfo.actualCount }} 人</span>
            </li>
        </ul>
        <zdButton class="info-button" size="large" disabled v-if="activityInfo.status === 'OUT_OF_DATE'">不可报名</zdButton>
        <zdButton class="info-button" size="large" v-else-if="!activityInfo.isEnrolled" @click="handleEnroll">我要报名</zdButton>
        <zdButton class="info-button" size="large" v-else @click="handleCancelEnroll">取消报名</zdButton>
        <div class="info-img-big" v-show="bigImgShow" @click="bigImgShow = false">
            <img :src="bigImg" />
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
                activityInfo: {
                    title: '',
                    createDatetime: '',
                    img: [],
                    content: '',
                    enrollTime: '',
                    activityTime: '',
                    activityAddress: '',
                    activityTarget: '',
                    contact: '',
                    contactCellphone: '',
                    isEnrolled: false
                },
                bigImg: '',
                bigImgShow: false
            }
        },
        methods: {
            handleEnroll() {
                this.$router.push({
                    path: '/service/activity/activityInfo/enrollActivity',
                    query: {
                        id: this.$route.query.id
                    }
                });
            },
            handleCancelEnroll() {
                let r = confirm("确定取消报名吗？");
                if (r == true) {
                    this.$http({
                        url: '/api/system/service/activity/cancelEnrollActivity',
                        method: 'patch',
                        data: {
                            id: this.activityInfo.applyId
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('已成功取消报名');
                            this.$router.replace('/service/activity');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            handleImgBig(img) {
                this.bigImg = img;
                this.bigImgShow = true;
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            } else {
                this.$http({
                    url: '/api/system/service/activity/getActivityInfo',
                    params: {
                        activityId: this.$route.query.id
                    }
                }).then((response) => {
                    this.activityInfo = response.data.activityInfo;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>
