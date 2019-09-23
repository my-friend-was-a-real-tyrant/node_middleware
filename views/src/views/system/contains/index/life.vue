<template>
    <div v-title="'惠生活'" class="life">
        <!-- <div class="address" v-if="!isVisitor">
            <span>{{ userInfo.defaultAddressName }}</span>
            <i @click="handleChangePark">切换</i>
        </div> -->
        <HEARD @change='change'></HEARD>
        <router-view class="router"></router-view>
        <div class="coupon-alert" v-show="alertShow">
            <div class="coupon">
                <div class="close" @click="CloseAlert"></div>
                <div class="coupons">
                    <div class="coupons-top" v-for="(item, i) in list" :key="i">
                        <div class="left">
                            <p>￥{{ item.face }}</p>
                            <p v-if="item.userReceiveQuantity === 0">
                                <img v-if="item.quantity !== '0%'" src="./img/get.png" alt="" @click="GetCoupon(item)">
                                <img v-else src="./img/no.png" alt="">
                            </p>
                            <p v-else>
                                <img src="./img/has.png" alt="">
                            </p>
                        </div>
                        <div class="right">
                            <p>{{ item.merchantName }}</p>
                            <p>截止日期</p>
                            <!-- <p>{{ item.createDatetime }}-{{ item.expireDatetime }}</p> -->
                            <p>{{ item.expireDatetime }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="alert" v-show="alert">领取成功</div>
    </div>
</template>
<script lang="babel">
    import hostnameObj from 'publicSource/hostname';
    import HEARD from './life-index/components/header';
    const hostname = hostnameObj.hostname;
    export default {
        components: {
            HEARD,
        },
        data() {
            return {
                alertShow: false,
                list: [],
                alert: false
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
        mounted () {
            let active_params = window.localStorage.getItem("zd_active_coupon");
            if (Boolean(active_params)) {
                this.$http({
                    url: '/api/system/life/coupon/getCouponList?merchandiseIds=' + JSON.parse(active_params).merchandiseIds
                }).then(res => {
                    if (res.data.code === '00000') {
                        this.list = res.data.mallList;
                        this.alertShow = true;
                    }
                }).catch(error => {});
            }
        },
        methods: {
            handleClick(n) {
                switch (n) {
                    case 0:
                        this.$router.push('/index/life/business');
                        break;
                    case 4:
                        this.$router.push('/life/coupon');
                        break;
                    default:
                        this.$router.push('/index/life/null');
                        break;
                }
            },
            handleChangePark() {
                this.$router.push('/person/myFamily/changeDefaultHouse/index');
            },
            change(val) {
                this.handleClick(val);
            },
            CloseAlert() {
                this.alertShow = false;
            },
            GetCoupon(params) {
                this.$http({
                    url: '/api/system/life/coupon/receiveCoupon',
                    method: 'patch',
                    data: {
                        id: params.id
                    }
                }).then(res => {
                    if (res.data.code === '00000') {
                        this.alertShow = false;
                        params.userReceiveQuantity = 1;
                        this.alert = true;
                        setTimeout(() => {
                            this.alert = false;
                        }, 1500);
                    }
                }).catch(error => {});
            }
        }
    }
</script>
<style lang="less" scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .router {
        flex-grow: 1;
        overflow: scroll;
        height: 100%;
    }
    .life{
        position: relative;
        .coupon-alert{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2.88238929rem 1.18354686rem 0;
            height: calc(100%);
            z-index: 100;
            background-color: rgba(0, 0, 0, .4);
            .coupon{
                position: relative;
                width: 4.83887951rem;
                height: 5.48438037rem;
                background-image: url("./img/counps.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                .close{
                    width: .269023rem;
                    height: .269023rem;
                    position: absolute;
                    top: .39823893rem;
                    right: .24215929rem;
                    background-image: url("./img/close.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
                .coupons{
                    padding: 2.22079643rem .34588672rem 0;
                    &-top{
                        display: flex;
                    }
                    &-top{
                        &:not(:last-child){
                            padding-bottom: .23215929rem;
                        }
                    }
                    .left{
                        width: 1.36825129rem;
                        text-align: center;
                        p{
                            &:first-child{
                                font-size: .38588672rem;
                                color: rgb(254, 249, 100);
                                padding-bottom: .05607964rem;
                                font-weight: 700;
                            }
                            &:last-child{
                                width: 1.11452386rem;
                                height: .30745486rem;
                                margin-left: .14486371rem;
                                img{
                                    width: 100%;
                                }
                            }
                        }
                    }
                    .right{
                        padding-left: .22607964rem;
                        p{
                            color: #fff;
                            &:nth-child(1){
                                font-size: .23059114rem;
                                font-weight: 600;
                            }
                            &:nth-child(2) {
                                font-size: .23059114rem;
                            }
                            &:nth-child(3) {
                                font-size: .23059114rem;
                            }
                        }
                    }
                }
            }
        }
        .alert{
            width: 3.84318572rem;
            height: .48431857rem;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, .5);
            text-align: center;
            line-height: .48431857rem;
            color: white;
            position: absolute;
            top: 4.76477859rem;
            left: 1.68139375rem;
            font-size: .23059114rem;
        }
    }
</style>
