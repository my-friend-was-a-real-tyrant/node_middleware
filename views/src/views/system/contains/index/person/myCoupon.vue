<style lang="less" scoped>
    .coupon {
        width: 100%;
        height: 100%;
        &-tabs-view {
            flex-grow: 1;
            flex-shrink: 10;
            background-color: #f5f5f5;
            overflow: scroll;
        }
        &-list {
            padding: .3rem;
            &-item {
                position: relative;
                width: 6.6rem;
                height: 3.3rem;
                margin-bottom: .3rem;
                border-radius: .08rem;
                background-color: #fff;
                overflow: hidden;
                &-top {
                    position: relative;
                    height: 1.73rem;
                    padding: .3rem;
                    &-merchant {
                        float: left;
                        font-size: .36rem;
                        color: #fff;
                    }
                    &-right {
                        color: #fff;
                        text-align: right;
                        &-price {
                            font-size: .6rem;
                        }
                        &-description {
                            font-size: .24rem;
                        }
                    }
                    &-wave {
                        float: left;
                        width: .32rem;
                        height: .32rem;
                        margin-left: -.04rem;
                        border-radius: 50%;
                        background-color: #fff;
                        &-wrapper {
                            position: absolute;
                            bottom: -.08rem;
                            left: 0;
                            width: 110%;
                            height: .15rem;
                        }
                    }
                }
                &-expire {
                    margin-top: .7rem;
                    margin-left: .3rem;
                    font-size: .22rem;
                }
                &-button {
                    position: absolute;
                    bottom: .2rem;
                    right: .8rem;
                    width: 1.14rem;
                    height: 1.14rem;
                    border: .02rem solid #fff;
                    border-radius: 50%;
                    font-size: .24rem;
                    line-height: 1.14rem;
                    text-align: center;
                    transform: rotate(-15deg);
                }
            }
            &-mall &-item-top,
            &-mall &-item-rest,
            &-mall &-item-top-wave:nth-child(odd) {
                background-color: #f7c463;
            }
            &-mall,
            &-mall &-item-button {
                color: #f7c463;
            }
            &-mall &-item-button {
                border-color: #f7c463;
            }
            &-merchant &-item-top,
            &-merchant &-item-rest,
            &-merchant &-item-top-wave:nth-child(odd) {
                background-color: #00a762;
            }
            &-merchant,
            &-merchant &-item-button {
                color: #00a762;
            }
            &-merchant &-item-button {
                border-color: #00a762;
            }
            &-pay &-item-top,
            &-pay &-item-rest,
            &-pay &-item-top-wave:nth-child(odd) {
                background-color: #f17b77;
            }
            &-pay,
            &-pay &-item-button {
                color: #f17b77;
            }
            &-pay &-item-button {
                border-color: #f17b77;
            }
            &-item-disabled &-item-top,
            &-item-disabled &-item-rest,
            &-item-disabled &-item-top-wave:nth-child(odd) {
                background-color: #aaa;
            }
            &-item-disabled,
            &-item-disabled &-item-button {
                color: #aaa;
            }
            &-item-disabled &-item-button {
                border-color: #aaa;
            }
            & &-item-top-wave:nth-child(odd) {
                margin-top: -.15rem;
            }
        }
        &-box {
            width: 7.2rem;
            background-color: #f4f4f4;
            &-ul {
                .exchange {
                    text-align: right;
                    font-size: .28rem;
                    color: #333;
                    padding: .15rem .28846154rem .15rem 0;
                }
                &-li {
                    display: flex;
                    margin: .14423077rem .28846154rem;
                    width: 6.63461538rem;
                    height: 2.11538462rem;
                    background-image: url("../img/mycoupon.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    &:nth-child(2) {
                        margin-top: 0;
                    }
                    .left {
                        width: 4.75rem;
                        padding-left: .19230769rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        &-top {
                            font-size: .28846154rem;
                            color: #333;
                        }
                        &-bottom {
                            margin-top: .09615385rem;
                            &-top {
                                display: flex;
                                align-items: baseline;
                                .price{
                                    font-size: .46153846rem;
                                    color: #ff6666;
                                    font-weight: 500;
                                    margin-right: 5px;
                                }
                                .desc {
                                    font-size: .25rem;
                                    background-color: #ffabab;
                                    color: white;
                                    padding: 0 .09615385rem;
                                    font-size: .23076923rem;
                                    border-radius: 2px;
                                    cursor: pointer;
                                }
                            }
                            &-bottom {
                                margin-top: 5px;
                                font-size: .23076923rem;
                            }
                        }
                    }
                    .right {
                        width: 1.875rem;
                        padding-top: .49230769rem;
                        &-top {
                            text-align: center;
                            font-size: .38461538rem;
                            color: white;
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
                        &-bottom {
                            font-size: .23076923rem;
                            text-align: center;
                            color: white;
                        }
                    }
                }
                .alreadyUsedList{
                    background-image: url("../img/coupon.png");
                }
            }
        }
    }
</style>
<template>
    <zdTabs class="coupon" v-title="'我的优惠券'" @changeTabName="changeTabName">
        <zdTabsView label="未使用" name="001" class="coupon-box">
            <ul class="coupon-box-ul">
                <li class="coupon-box-ul-li" v-for="coupon in neverUsedList" :key="coupon.id">
                    <div class="left">
                        <div class="left-top">{{ coupon.merchantName }}</div>
                        <div class="left-bottom">
                            <div class="left-bottom-top">
                                <p class="desc" @click="handleReceiveCoupon(coupon)">立即使用</p>
                            </div>
                            <div class="left-bottom-bottom">有效期至：{{ coupon.expireDatetime }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-top">{{ coupon.preferentialType === 1 ? coupon.face.toFixed(2) : coupon.face.toFixed(2) }}</div>
                        <div class="right-bottom">{{ coupon.couponDescription }}</div>
                    </div>
                </li>
            </ul>
        </zdTabsView>
        <zdTabsView label="已使用" name="002" class="coupon-tabs-view">
            <ul class="coupon-box-ul">
                <li class="coupon-box-ul-li alreadyUsedList" v-for="coupon in alreadyUsedList" :key="coupon.id">
                    <div class="left">
                        <div class="left-top">{{ coupon.merchantName }}</div>
                        <div class="left-bottom">
                            <div class="left-bottom-top">
                                <p class="price">{{ coupon.preferentialType === 1 ? coupon.face.toFixed(2) : coupon.face.toFixed(2) }}</p>
                                <p class="desc">{{ coupon.couponDescription }}</p>
                            </div>
                            <div class="left-bottom-bottom">有效期至：{{ coupon.expireDatetime }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-top" style="height: 1.36153846rem;">
                            <div class="img-box">
                                <img src="../img/alreadyuse.png" alt="">
                            </div>
                        </div>
                        <div class="right-bottom"></div>
                    </div>
                </li>
            </ul>
        </zdTabsView>
        <zdTabsView label="已过期" name="003" class="coupon-tabs-view">
            <ul class="coupon-box-ul">
                <li class="coupon-box-ul-li alreadyUsedList" v-for="coupon in expiredList" :key="coupon.id">
                    <div class="left">
                        <div class="left-top">{{ coupon.merchantName }}</div>
                        <div class="left-bottom">
                            <div class="left-bottom-top">
                                <p class="price">{{ coupon.preferentialType === 1 ? coupon.face.toFixed(2) : coupon.face.toFixed(2) }}</p>
                                <p class="desc">{{ coupon.couponDescription }}</p>
                            </div>
                            <div class="left-bottom-bottom">有效期至：{{ coupon.expireDatetime }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-top" style="height: 1.36153846rem;">
                            <div class="img-box">
                                <img src="../img/over.png" alt="">
                            </div>
                        </div>
                        <div class="right-bottom"></div>
                    </div>
                </li>
            </ul>
        </zdTabsView>
    </zdTabs>
</template>
<script lang="babel">
    import zdTabs from 'publicComponents/tabs/tabs';
    import zdTabsView from 'publicComponents/tabs/tabsView';

    export default {
        components: {
            zdTabs,
            zdTabsView
        },
        data() {
            return {
                neverUsedList: [],
                alreadyUsedList: [],
                expiredList: []
            }
        },
        mounted() {
            this.$http({
                url: '/api/system/personalCenter/myCoupon/getMyCouponList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.neverUsedList = response.data.neverUsedList;
                    this.alreadyUsedList = response.data.alreadyUsedList;
                    this.expiredList = response.data.expiredList;
                }
            }).catch((response) => {
                console.log(response);
            });
        },
        methods: {
            changeTabName(name) {
                this.$router.replace('/person/myCoupon/tab/' + name);
            },
            handleReceiveCoupon(coupon) {
                if (coupon.merchandiseId !== 0) {
                    this.$router.push({
                        path: "/mall/merchandiseInfo",
                        query: {
                            id: coupon.merchandiseId
                        }
                    });
                } else {
                    this.$router.push({
                        path: "/index/life/business"
                    });
                }
            }
        }
    }
</script>