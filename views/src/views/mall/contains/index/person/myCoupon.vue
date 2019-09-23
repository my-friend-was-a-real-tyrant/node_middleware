<style lang="less" scoped>
    .coupon{ width: 100%; height: 100%;
        &-tabs-view{ flex-grow: 1; flex-shrink: 10; background-color: #f5f5f5; overflow: scroll;}
        &-list{ padding: .3rem;
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
    }
</style>
<template>
    <zdTabs class="coupon" v-title="'我的优惠券'" @changeTabName="changeTabName">
        <zdTabsView
            label="未使用"
            name="001"
            class="coupon-tabs-view"
        >
            <ul class="coupon-list coupon-list-mall">
                <li class="coupon-list-item" :class="{
                    'coupon-list-mall': coupon.type === 1,
                    'coupon-list-merchant': coupon.type === 2,
                    'coupon-list-pay': coupon.type === 3
                }" v-for="coupon in neverUsedList" :key="coupon.id">
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
                </li>
            </ul>
        </zdTabsView>
        <zdTabsView
            label="已使用"
            name="002"
            class="coupon-tabs-view"
        >
            <ul class="coupon-list">
                <li class="coupon-list-item coupon-list-item-disabled" v-for="coupon in alreadyUsedList" :key="coupon.id">
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
                    <div class="coupon-list-item-button">已使用</div>
                </li>
            </ul>
        </zdTabsView>
        <zdTabsView
            label="已过期"
            name="003"
            class="coupon-tabs-view"
        >
            <ul class="coupon-list">
                <li class="coupon-list-item coupon-list-item-disabled" v-for="coupon in expiredList" :key="coupon.id">
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
                    <div class="coupon-list-item-button">已过期</div>
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
        methods: {
            changeTabName(name) {
                this.$router.replace('/index/person/myCoupon/tab/' + name);
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
        }
    }
</script>