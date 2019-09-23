<style lang="less" scoped>
    .coupon{ width: 100%; height: 100%;
        &-tabs-view{ flex-grow: 1; background-color: #f5f5f5; overflow: scroll;}
        &-list{ padding: .15rem .3rem;
            &-item{ position: relative; width: 6.6rem; height: 3.3rem; margin-bottom: .3rem; border-radius: .08rem; background-color: #fff; overflow: hidden;
                &-top{ position: relative; height: 1.73rem; padding: .3rem;
                    &-merchant{ float: left; font-size: .36rem; color: #fff;}
                    &-right{ color: #fff; text-align: right;
                        &-price{ font-size: .6rem;}
                        &-description{ font-size: .24rem;}
                    }
                    &-wave{ float: left; width: .32rem; height: .32rem; margin-left: -.04rem; border-radius: 50%; background-color: #fff;
                        &-wrapper{ position: absolute; bottom: -.08rem; left: 0; width: 110%; height: .15rem;}
                    }
                }
                &-expire{ margin-top: .7rem; margin-left: .3rem; font-size: .22rem;}
                &-button{ position: absolute; bottom: .2rem; right: .8rem; width: 1.14rem; height: 1.14rem; border: .02rem solid #fff; border-radius: 50%; font-size: .24rem; line-height: 1.14rem; text-align: center; transform: rotate(-15deg);}
                &-rest{ position: absolute; bottom: 0; right: 0; width: .7rem; height: .36rem; border-radius: .08rem 0 0 0; text-align: center; line-height: .36rem; color: #fff; font-size: .22rem;}
            }
            &-mall &-item-top, &-mall &-item-rest, &-mall &-item-top-wave:nth-child(odd){ background-color: #f7c463;}
            &-mall, &-mall &-item-button{ color: #f7c463;}
            &-mall &-item-button{ border-color: #f7c463;}
            &-merchant &-item-top, &-merchant &-item-rest, &-merchant &-item-top-wave:nth-child(odd){ background-color: #00a762;}
            &-merchant, &-merchant &-item-button{ color: #00a762;}
            &-merchant &-item-button{ border-color: #00a762;}
            &-pay &-item-top, &-pay &-item-rest, &-pay &-item-top-wave:nth-child(odd){ background-color: #f17b77;}
            &-pay, &-pay &-item-button{ color: #f17b77;}
            &-pay &-item-button{ border-color: #f17b77;}
            &-item-disabled &-item-top, &-item-disabled &-item-rest, &-item-disabled &-item-top-wave:nth-child(odd){ background-color: #aaa;}
            &-item-disabled, &-item-disabled &-item-button{ color: #aaa;}
            &-item-disabled &-item-button{ border-color: #aaa;}
            & &-item-top-wave:nth-child(odd){ margin-top: -.15rem;}
        }
        &-box{
            width: 7.2rem;
            background-color: #f4f4f4;
            &-ul{
                .exchange{
                    text-align: right;
                    font-size: .28rem;
                    color: #333;
                    padding: .15rem .28846154rem .15rem 0;
                }
                &-li{
                    display: flex;
                    margin: .14423077rem .28846154rem;
                    width: 6.63461538rem;
                    height: 2.11538462rem;
                    background-image: url("../img/coupon.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    &:nth-child(2){
                        margin-top: 0;
                    }
                    .left{
                        width: 4.75rem;
                        padding-left: .19230769rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        &-top{
                            font-size: .28846154rem;
                            color: #333;
                        }
                        &-bottom{
                            margin-top: .09615385rem;
                            &-top{
                                display: flex;
                                align-items: baseline;
                                .price{
                                    font-size: .46153846rem;
                                    color: #ff6666;
                                    font-weight: 500;
                                }
                                .desc{
                                    font-size: .25rem;
                                    background-color: #ffabab;
                                    color: white;
                                    padding: 0 .09615385rem;
                                    font-size: .23076923rem;
                                    border-radius: 2px;
                                    margin-left: 5px;
                                }
                            }
                            &-bottom{
                                margin-top: 5px;
                                font-size: .23076923rem;
                            }
                        }
                    }
                    .right{
                        width: 1.875rem;
                        padding-top: .19230769rem;
                        &-top{
                            text-align: center;
                            height: 1.36153846rem;
                            .img-box{
                                width: 1.15384615rem;
                                height: 1.15384615rem;
                                margin-left: .36rem;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        &-bottom{
                            display: flex;
                            justify-content: center;
                            p{
                                width: 1.45384615rem;
                                height: .38461538rem;
                                font-size: .26923077rem;
                                text-align: center;
                                background-color: #ff6666;
                                color: white;
                                border-radius: .19230769rem;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <zdTabs class="coupon" v-title="'领券中心'" @changeTabName="changeTabName">
        <!-- <zdTabsView label="商城券" name="001" class="coupon-tabs-view">
            <ul class="coupon-list coupon-list-mall">
                <li class="exchange" @click="Exchange">兑换优惠券</li>
                <li class="coupon-list-item" :class="{
                    'coupon-list-item-disabled': coupon.userReceiveQuantity !== 0 || coupon.quantity === '0%',
                    'coupon-list-mall': coupon.type === 1,
                    'coupon-list-merchant': coupon.type === 2,
                    'coupon-list-pay': coupon.type === 3
                }" v-for="coupon in mallList" :key="coupon.id">
                    <div class="coupon-list-item-top">
                        <p class="coupon-list-item-top-merchant">{{ coupon.merchantName }}</p>
                        <div class="coupon-list-item-top-right fr">
                            <p class="coupon-list-item-top-right-price">{{ coupon.preferentialType === 1 ? '¥' + coupon.face : coupon.face * 10 + '折' }}</p>
                            <p class="coupon-list-item-top-right-description">{{ coupon.couponDescription }}</p>
                        </div>
                        <div class="coupon-list-item-top-wave-wrapper">
                            <div class="coupon-list-item-top-wave" v-for="n in 24" :key="n"></div>
                        </div>
                    </div>
                    <p class="coupon-list-item-expire">有效期至：{{ coupon.expireDatetime }}</p>
                    <div class="coupon-list-item-button" @click="handleReceiveCoupon(coupon)">{{ coupon.userReceiveQuantity !== 0 ? '已领取' : (coupon.quantity === '0%' ? '已领完' : '立即领取') }}</div>
                    <div class="coupon-list-item-rest">{{ coupon.quantity }}</div>
                </li>
            </ul>
        </zdTabsView> -->
        <zdTabsView label="商城券" name="001" class="coupon-box">
            <ul class="coupon-box-ul">
                <li class="exchange" @click="Exchange">兑换优惠券</li>
                <li class="coupon-box-ul-li" v-for="coupon in mallList" :key="coupon.id">
                    <div class="left">
                        <div class="left-top">{{ coupon.merchantName }}</div>
                        <div class="left-bottom">
                            <div class="left-bottom-top">
                                <p class="price">{{ coupon.preferentialType === 1 ? coupon.face : coupon.face * 10 + '折' }}</p>
                                <p class="desc">{{ coupon.couponDescription }}</p>
                            </div>
                            <div class="left-bottom-bottom">有效期至：{{ coupon.expireDatetime }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-top">
                            <vue-progress-bar v-if="coupon.userReceiveQuantity == 0" :value="(coupon.quantity.replace(/%/,'') - 0)" :options="options"></vue-progress-bar>
                            <div class="img-box">
                                <img v-if="coupon.userReceiveQuantity == 1 && coupon.quantity != '0%'" src="../img/alreadyget.png" alt="">
                                <img v-else-if="coupon.userReceiveQuantity == 1 && coupon.quantity == '0%'" src="../img/getno.png" alt="">
                            </div>
                        </div>
                        <div class="right-bottom">
                            <p @click="handleReceiveCoupon(coupon)">{{ coupon.userReceiveQuantity == 0 ? "立即领取" : "立即使用" }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </zdTabsView>
        <zdTabsView label="商户券" name="002" class="coupon-tabs-view" >
            <ul class="coupon-list">
                <li class="coupon-list-item" :class="{
                    'coupon-list-item-disabled': coupon.userReceiveQuantity !== 0 || coupon.quantity === '0%',
                    'coupon-list-mall': coupon.type === 1,
                    'coupon-list-merchant': coupon.type === 2,
                    'coupon-list-pay': coupon.type === 3
                }" v-for="coupon in merchantList" :key="coupon.id">
                    <div class="coupon-list-item-top">
                        <p class="coupon-list-item-top-merchant">{{ coupon.merchantName }}</p>
                        <div class="coupon-list-item-top-right fr">
                            <p class="coupon-list-item-top-right-price">{{ coupon.preferentialType === 1 ? '¥' + coupon.face : coupon.face * 10 + '折' }}</p>
                            <p class="coupon-list-item-top-right-description">{{ coupon.couponDescription }}</p>
                        </div>
                        <div class="coupon-list-item-top-wave-wrapper">
                            <div class="coupon-list-item-top-wave" v-for="n in 24" :key="n"></div>
                        </div>
                    </div>
                    <p class="coupon-list-item-expire">有效期至：{{ coupon.expireDatetime }}</p>
                    <div class="coupon-list-item-button" @click="handleReceiveCoupon(coupon)">{{ coupon.userReceiveQuantity !== 0 ? '已领取' : (coupon.quantity === '0%' ? '已领完' : '立即领取') }}</div>
                    <div class="coupon-list-item-rest">{{ coupon.quantity }}</div>
                </li>
            </ul>
        </zdTabsView>
        <zdTabsView label="支付券" name="003" class="coupon-tabs-view">
            <ul class="coupon-list">
                <li class="coupon-list-item" :class="{
                    'coupon-list-item-disabled': coupon.userReceiveQuantity !== 0 || coupon.quantity === '0%',
                    'coupon-list-mall': coupon.type === 1,
                    'coupon-list-merchant': coupon.type === 2,
                    'coupon-list-pay': coupon.type === 3
                }" v-for="coupon in payList" :key="coupon.id">
                    <div class="coupon-list-item-top">
                        <p class="coupon-list-item-top-merchant">{{ coupon.merchantName }}</p>
                        <div class="coupon-list-item-top-right fr">
                            <p class="coupon-list-item-top-right-price">{{ coupon.preferentialType === 1 ? '¥' + coupon.face : coupon.face * 10 + '折' }}</p>
                            <p class="coupon-list-item-top-right-description">{{ coupon.couponDescription }}</p>
                        </div>
                        <div class="coupon-list-item-top-wave-wrapper">
                            <div class="coupon-list-item-top-wave" v-for="n in 24" :key="n"></div>
                        </div>
                    </div>
                    <p class="coupon-list-item-expire">有效期至：{{ coupon.expireDatetime }}</p>
                    <div class="coupon-list-item-button" @click="handleReceiveCoupon(coupon)">{{ coupon.userReceiveQuantity !== 0 ? '已领取' : (coupon.quantity === '0%' ? '已领完' : '立即领取') }}</div>
                    <div class="coupon-list-item-rest">{{ coupon.quantity }}</div>
                </li>
            </ul>
        </zdTabsView>
    </zdTabs>
</template>
<script lang="babel">
    import zdTabs from 'publicComponents/tabs/tabs';
    import zdTabsView from 'publicComponents/tabs/tabsView';
    import VueProgressBar from 'svg-progress-bar';
    export default {
        components: {
            zdTabs,
            zdTabsView,
            VueProgressBar
        },
        data() {
            return {
                mallList: [],
                merchantList: [],
                payList: [],
                options: {
                    circleWidth: 5,
                    radius: 30,
                    circleWidthArray: [100, 70],
                    gradientColor: ["#ff6666"],
                    text: function (value) {
                        return value + "%"
                    }
                }
            }
        },
        methods: {
            changeTabName(name) {
                this.$router.replace('/life/coupon/tab/' + name);
            },
            handleReceiveCoupon(coupon) {
                if (coupon.userReceiveQuantity === 0 && coupon.quantity !== '0%') {
                    this.$http({
                        url: '/api/system/life/coupon/receiveCoupon',
                        method: 'patch',
                        data: {
                            id: coupon.id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            coupon.userReceiveQuantity = 1;
                        }
                    }).catch((response) => {});
                } else if (coupon.merchandiseId !== 0) {
                    this.$router.push({
                        path: "/mall/merchandiseInfo",
                        query: {
                            id: coupon.merchandiseId,
                            sortId: coupon.sortId
                        }
                    });
                } else if (coupon.merchandiseId === 0) {
                    this.$router.push({
                        path: "/index/life/business"
                    });
                }
            },
            Exchange() {
                this.$router.push({
                    path: "/life/exchange"
                });
            }
        },
        mounted() {
            this.$http({
                url: '/api/system/life/coupon/getCouponList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.mallList = response.data.mallList;
                    this.merchantList = response.data.merchantList;
                    this.payList = response.data.payList;
                }
            }).catch((response) => {});
        }
    }
</script>