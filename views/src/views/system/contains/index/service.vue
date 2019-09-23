<template>
    <div class="home" v-title="'中大普惠物业'">
        <!-- 顶部 -->
        <div class="home-heard">
            <p v-if="!isVisitor" @click="handleChangePark">{{userInfo.defaultAddressName}}</p>
            <img src="../../img/sy_xiaoxi@2x.png" alt="">
        </div>
        <!-- 轮播 -->
        <div class="home-banner">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item, index) in banner" :key="index">
                    <img :src="item.image" @click="JoinActive(item)">
                </swiper-slide>
            </swiper>
        </div>
        <!-- 功能区 -->
        <div class="home-operate">
            <div class="heard">
                <div class="left">常用功能</div>
                <div class="right" @click="GetMore">
                    <p>更多</p>
                    <img src="../../img/sy_gengduo@2x.png" alt="">
                </div>
            </div>
            <div class="home-operate-bottom">
                <div class="home-operate-bottom-list" v-for="(item, index) in items" :key="index" @click="toPage(item)">
                    <img :src="item.icon" alt="">
                    <div v-text="item.name"></div>
                </div>
            </div>
        </div>
        <!-- 社区广告 -->
        <div class="home-notice">
            <div class="home-notice-left">
                <img src="../../img/sy_shequgonggao@2x.png" alt="">
            </div>
            <div class="home-notice-right">{{ announcement }}</div>
        </div>
        <!-- 园区活动 -->
        <div class="home-activity">
            <div class="heard" @click="GoActive">
                <div class="left">园区活动</div>
                <div class="right">
                    <p>更多</p>
                    <img src="../../img/sy_gengduo@2x.png" alt="">
                </div>
            </div>
            <div class="home-activity-content" v-for="activity in activityList" :key="activity.id" @click="handleActivityInfo(activity.id)">
                <img v-if="activity.img !== ''" :src="activity.img" alt="">
                <div class="dec">
                    <p>{{ activity.title }}</p>
                    <p>
                        <span>{{ activity.date }}</span>
                        <span>{{ activity.actualCount }} 人参加</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 广告 -->
        <!-- <div class="home-advert">
            <div class="home-advert-content">
                <img src="../../img/sy_huangjin@2x.png" alt="">
                <div class="dec">
                    <p>首届社区篮球联赛</p>
                    <p>
                        <span>2018-05-04 至 06-08</span>
                        <span>8人参加</span>
                    </p>
                </div>
            </div>
        </div> -->
        <!-- 浮窗 -->
        <div class="home-floatingwindow" v-show="isShow" @click="JoinActive(0)">
            <div>
                <img :src="imgSrc" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
                banner: [],
                swiperOption: {
                    pagination: '.swiper-pagination',
                    initialSlide: 1,
                    loop: true,
                    loopAdditionalSlides: 0
                },
                items: [{
                    name: "物业缴费",
                    icon: require('../../img/sy_zizhujiaofei@2x.png'),
                    route: "/service/payment"
                }, {
                    name: "咨询建议",
                    icon: require('../../img/sy_zixunjianyi@2x.png'),
                    route: "/service/suggestion"
                }, {
                    name: "维修服务",
                    icon: require('../../img/sy_weixiufuwu@2x.png'),
                    route: "/service/repairment"
                }, {
                    name: "投诉表扬",
                    icon: require('../../img/sy_tousubiaoyang@2x.png'),
                    route: "/service/myComplaint"
                }],
                announcement: "",
                activityList: [],
                // imgSrc: require("../index/img/qixixuanfutubiao@2x.png"),
                imgSrc: "",
                isShow: false,
                jumpParams: null
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            userInfo() {
                return this.$store.state.info;
            }
        },
        mounted(){
            this.Get();
        },
        methods: {
            GetMore() {
                this.$router.push({
                    path: 'manager'
                });
            },
            toPage(params) {
                this.$router.push(params.route);
            },
            handleChangePark() {
                this.$router.push('/person/myFamily/changeDefaultHouse/index');
            },
            JoinActive(params) {
                if (params == 0) {                      // 跳转活动链接
                    // window.open(this.banner[0].url);
                    window.localStorage.setItem("zd_active_coupon", JSON.stringify(this.jumpParams));
                    this.$router.push({
                        path: "/index/life",
                        query: this.jumpParams
                    });
                } else if (params.isJump === 1) {       // 跳转活动链接
                    window.open(params.url);
                } else if (params.isJump === 2) {       // 领取活动优惠券
                    window.localStorage.setItem("zd_active_coupon", JSON.stringify(this.jumpParams));
                    this.$router.push({
                        path: "/index/life",
                        query: this.jumpParams
                    });
                }
            },
            handleActivityInfo(id) {
                this.$router.push({
                    path: '/service/activity/activityInfo',
                    query: {
                        id
                    }
                });
            },
            GoActive() {
                this.$router.push({
                    path: '/service/activity'
                });
            },
            Get() {
                // 系统公告
                if (Boolean(this.userInfo.defaultParkId)) {
                    this.$http({
                        url: '/api/system/service/announcement/getAnnouncementList',
                        params: {
                            parkId: this.userInfo.defaultParkId
                        }
                    }).then((response) => {
                        this.announcement = response.data.announcementList[0].title;
                    }).catch((response) => {});
                }
                // 轮播图
                this.$http({
                    // url: '/api/system/service/activity/getExternalActivityList',
                    url: '/api/system/service/activity/getExternalActivityList'
                }).then(res=>{
                    if(res.data.code='00000'){
                        this.banner = res.data.data.bannerList;
                        if (res.data.data.qxBuoyStatus === 1) {
                            this.imgSrc = res.data.data.littleImage;
                            this.isShow = true;
                            for (let i = 0; i < res.data.data.bannerList.length; i++) {
                                let item = res.data.data.bannerList[i];
                                if (Boolean(item.param) && item.param.indexOf("merchandiseIds") > -1) {
                                    this.jumpParams = JSON.parse(item.param);
                                }
                            }
                        }
                    }
                }).catch(err=>{});
                // 园区活动
                if (Boolean(this.userInfo.defaultParkId) && Boolean(this.userInfo.defaultAddressId)) {
                    this.$http({
                        url: '/api/system/service/activity/getActivityList',
                        params: {
                            parkId: this.userInfo.defaultParkId,
                            roomId: this.userInfo.defaultAddressId
                        }
                    }).then(res => {
                        this.activityList = res.data.activityList;
                    }).catch(error => {});
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .home{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        position: relative;
        background-color: #f5f5f5;
        &-heard{
            width: 100%;
            height: .7rem;
            font-size: .26rem;
            line-height: .7rem;
            text-align: center;
            position: fixed;
            top: 0;
            z-index: 100;
            p{
                color: white;
            }
            img{
                width: .4rem;
                position: absolute;
                right: .2rem;
                top: .15rem;
            }
        }
        &-banner{
            .swiper-container{
                .swiper-slide{
                    img{
                        width: 100%;
                        height: 4rem;
                        cursor: pointer;
                    }
                }
            }
        }
        &-operate{
            width: 100%;
            background-color: white;
            .heard{
                height: .8rem;
                padding: 0 .191919rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f5f5f5;
                .left{
                    font-size: .28rem;
                    color: #333;
                    border-left: .03839961rem solid #f59118;
                    padding-left: .15359845rem;
                    font-weight: 500;
                }
                .right{
                    font-size: .24rem;
                    display: flex;
                    align-items: baseline;
                    color: #999999;
                    img{
                        width: .09599903rem;
                        height: .17279825rem;
                        margin-left: .15199806rem;
                    }
                }
            }
            &-bottom{
                width: 100%;
                height: 1.68958291rem;
                display: flex;
                flex: none;
                border-bottom: 1px solid #f5f5f5;
                &-list{
                    width: 25%;
                    height: 100%;
                    text-align: center;
                    margin-top: -10px !important;
                    div{
                        font-size: .23039767rem;
                        color: #333;
                    }
                    img{
                        width: .80639185rem;
                        vertical-align: bottom;
                    }
                }
            }
        }
        &-notice{
            width: 100%;
            height: .80639185rem;
            display: flex;
            align-items: center;
            background-color: white;
            margin-bottom: .15359845rem;
            &-left{
                width: 1.40398884rem;
                height: .25919738rem;
                margin-right: .33199563rem;
                margin-left: .19199806rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            &-right{
                font-size: .24959748rem;
                padding-right: .19199806rem;
                padding-bottom: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        &-activity{
            background-color: white;
            padding: 0 .191919rem;
            padding-bottom: .15359845rem;
            .heard{
                height: .8rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    font-size: .28rem;
                    color: #333;
                    border-left: .03839961rem solid #f59118;
                    padding-left: .15359845rem;
                    font-weight: 500;
                }
                .right{
                    font-size: .24rem;
                    display: flex;
                    align-items: baseline;
                    color: #999999;
                    img{
                        width: .09599903rem;
                        height: .17279825rem;
                        margin-left: .15199806rem;
                    }
                }
            }
            &-content{
                width: 6.81593108rem;
                height: 3.9359602rem;
                border: 1px solid #f5f5f5;
                border-radius: 3px;
                img{
                    width: 100%;
                    height: 2.88461538rem;
                }
                .dec{
                    p{
                        width: 100%;
                        &:first-child{
                            font-size: .26879728rem;
                            padding-top: .09599903rem;
                            padding-left: .19199806rem;
                            color: #333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &:last-child{
                            font-size: .23039767rem;
                            padding: .09599903rem .19199806rem 0 .19199806rem;
                            color: #999;
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
            }
        }
        &-advert{
            background-color: white;
            padding: 0 .191919rem;
            padding-bottom: .15359845rem;
            &-content{
                width: 6.81593108rem;
                height: 3.9359602rem;
                border: 1px solid #f5f5f5;
                border-radius: 3px;
                img{
                    width: 100%;
                }
                .dec{
                    p{
                        width: 100%;
                        &:first-child{
                            font-size: .26879728rem;
                            padding-top: .09599903rem;
                            padding-left: .19199806rem;
                            color: #333;
                        }
                        &:last-child{
                            font-size: .23039767rem;
                            padding: .09599903rem .19199806rem 0 .19199806rem;
                            color: #999;
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
            }
        }
        &-floatingwindow{
            width: 1.12rem;
            height: 1.26rem;
            position: fixed;right: .2rem;
            top: 7rem;
            z-index: 100;
            div{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
