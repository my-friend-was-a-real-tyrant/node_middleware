<template>
    <div class="manger" v-title="'惠管家'">
        <div class="manger-box">
            <div class="manger-box-list" v-for="(item, index) in items" :key="index" @click="toPage(item)">
                <img :src="item.icon" alt="">
                <div v-text="item.name"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                items: [
                    {
                        name: "物业缴费",
                        icon: require("../../img/sy_zizhujiaofei@2x.png"),
                        route: "/service/payment"
                    },
                    {
                        name: "维修服务",
                        icon: require("../../img/gj_weixiufuwu@2x.png"),
                        route: "/service/repairment"
                    },
                    {
                        name: "园区报事",
                        icon: require("../../img/gj_yuanqubaoshi@2x.png"),
                        route: "/service/report"
                    },
                    {
                        name: "投诉表扬",
                        icon: require("../../img/gj_tousubiaoyang@3x.png"),
                        route: "/service/myComplaint"
                    },
                    {
                        name: "咨询建议",
                        icon: require("../../img/gj_zixunjianyi@2x.png"),
                        route: "/service/suggestion"
                    },
                    {
                        name: "园区活动",
                        icon: require("../../img/gj_yuanquhuodong@2x.png"),
                        route: "/service/activity"
                    },
                    {
                        name: "智能家居",
                        icon: require("../../img/gj_changyongdianhua@2x.png"),
                        route: "/service/house"
                    },
                    {
                        name: "问卷调查",
                        icon: require("../../img/hgj_zhinengjiaju@2x.png"),
                        route: "/service/queastion"
                    },
                    {
                        name: "常用电话",
                        icon: require("../../img/hgj_wenjuandiaocha@2x.png"),
                        route: "/service/commonTelephone"
                    },
                    {
                        name: "社区公告",
                        icon: require("../../img/gj_shequgonggao@2x.png"),
                        route: "/service/announcement"
                    }
                ]
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            info() {
                return this.$store.state.info;
            }
        },
        methods: {
            toPage(params) {
                if (this.isVisitor === true) {
                    alert("本功能只对业主开放，请到“个人中心”完善信息");
                } else {
                    this.$router.push(params.route);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .manger{
        &-box{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex: none;
            &-list{
                width: 33.333333%;
                height: 2.39997573rem;
                text-align: center;
                div{
                    font-size: .23039767rem;
                    color: #333;
                    padding-top: .17279825rem;
                }
                img{
                    width: .80639185rem;
                    vertical-align: bottom;
                }
            }
        }
    }
</style>
