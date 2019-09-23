<style lang="less" scoped>
    .info{ width: 100%; height: 100%; padding-bottom: .96rem; background-color: #f5f5f5; font-size: 0; overflow: scroll;
        &-top{ border-bottom: 1px solid #dcdcdc; background-color: #fff;
            &-title{ padding: .3rem; line-height: .69rem; font-size: 0;
                img{ width: .6rem; height: .69rem; margin-right: .2rem;}
                &-word{ font-size: .3rem; color: #333;}
            }
            &-status{
                &-word{ display: flex; justify-content: space-between; padding: 0 .3rem; font-size: .24rem; color: #999;
                    &-active{ color: #333;}
                }
                &-img{ height: .58rem; width: 6.57rem; background-image: url(../../../../img/order_status.png); background-size: 14.4rem .78rem; background-position-y: center;
                    &-4{ background-position-x: -1.56rem;}
                    &-3{ background-position-x: -2.97rem;}
                    &-6{ background-position-x: -4.38rem;}
                    &-2{ background-position-x: -7.2rem;}
                }
            }
        }
        &-address{ display: flex; justify-content: space-between; align-items: center; padding: .3rem; background-color: #fff;
            &-info{ display: flex; flex-direction: column; flex-grow: 1; font-size: .3rem; color: #333;
                &-top{ display: flex; justify-content: space-between; margin-bottom: .1rem;}
            }
            &-line{ width: 100%; margin-bottom: .3rem;}
        }
        &-merchandise{ display: flex; padding: .3rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;
            &-img{ flex-shrink: 0; width: 1.4rem; height: 1.4rem; border: 1px solid #dcdcdc;}
            &-info{ display: flex; flex-direction: column; flex-grow: 1; height: 1.4rem; padding-left: .3rem;
                &-top{ display: flex; justify-content: space-between; flex-shrink: 0; font-size: .3rem;
                    &-name{ flex-grow: 1; color: #333;}
                    &-status{ flex-shrink: 0; color: #ff4c4c;}
                }
                &-mid{ flex-grow: 1; font-size: .22rem;
                    &-content{ color: #999;}
                }
                &-bottom{ display: flex; align-items: flex-end; flex-shrink: 0; font-size: 0;;
                    &-price{ color: #ff4c4c;
                        > span{ font-size: .26rem;}
                        & > &-l{ font-size: .36rem;}
                    }
                    &-count{ font-size: .26rem; margin-left: .3rem; color: #999;}
                }
            }
        }
        &-price{ padding: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff;
            &-item{ display: flex; justify-content: space-between; align-items: center; height: .48rem; color: #999; font-size: .26rem;}
        }
        &-totalPrice{ display: flex; justify-content: space-between; padding: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff; font-size: .36rem;
            &-title{ color: #333;}
            &-content{ font-size: 0; color: #ff4c4c;
                 > span{ font-size: .36rem;}
                & > &-s{ font-size: .26rem;}
            }
        }
        &-time{ margin-top: .3rem; padding: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff; font-size: .26rem; color: #333; line-height: .4rem;}
        &-operation{ display: flex; justify-content: flex-end; align-items: center; position: fixed; bottom: 0; left: 0; width: 100%; height: .96rem; padding: .3rem; border-top: 1px solid #dcdcdc; background-color: #fff;
            &-button{ margin-left: .3rem; padding: .1rem .18rem; border: 1px solid #666; border-radius: .08rem; background-color: #fff; color: #666;
                &-red{ border-color: #ff4c4c; color: #ff4c4c;}
            }
        }
    }
    .scoped{ flex-direction: column; margin-bottom: .3rem;
        &-top{ font-size: .36rem; color: #666; line-height: 1; text-align: center;
            &-red{ color: #ff4c4c;}
        }
        &-mid{ font-size: .3rem; color: #333; line-height: .84rem; text-align: center;
            &-time{ display: inline-block; width: .46rem; height: .46rem; border-radius: .08rem; background-color: #999; color: #fff; line-height: .46rem; text-align: center;}
        }
        &-bottom{ font-size: .24rem; color: #999; line-height: 1; text-align: center;}
    }
</style>
<template>
    <div class="info" v-title="'订单详情'">
        <div class="info-top" v-if="orderInfo.statusCode === 2 || orderInfo.statusCode === 6 || orderInfo.statusCode === 3 || orderInfo.statusCode === 4 || orderInfo.statusCode === 8 || orderInfo.statusCode === 9">
            <div class="info-top-title">
                <img src="../../../../img/order_status_icon.png" />
                <span class="info-top-title-word">{{ orderInfo.status }}</span>
            </div>
            <div class="info-top-status" v-if="orderInfo.statusCode !== 8 && orderInfo.statusCode !== 9">
                <p class="info-top-status-word">
                    <!-- status ==> 2 -->
                    <span :class="{'info-top-status-word-active': orderInfo.statusCode !== 8}">买家付款</span>
                    <!-- status ==> 6 -->
                    <span :class="{'info-top-status-word-active': orderInfo.statusCode !== 8 && orderInfo.statusCode !== 2}">买家成团</span>
                    <span :class="{'info-top-status-word-active': orderInfo.statusCode !== 8 && orderInfo.statusCode !== 2}">商家接单</span>
                    <!-- status ==> 3 -->
                    <span :class="{'info-top-status-word-active': orderInfo.statusCode === 3 && orderInfo.statusCode === 4}">商品发货</span>
                    <!-- status ==> 4 -->
                    <span :class="{'info-top-status-word-active': orderInfo.statusCode === 4}">交易完成</span>
                </p>
                <div class="info-top-status-img" :class="'info-top-status-img-' + orderInfo.statusCode"></div>
            </div>
        </div>
        <div class="info-address">
            <div class="info-address-info">
                <div class="info-address-info-top">
                    <p class="info-address-info-top-name">
                        <span>收件人：{{ orderInfo.deliveryAddress.name }}</span>
                    </p>
                    <p class="info-address-info-top-cellphone">
                        <span>{{ orderInfo.deliveryAddress.cellphone }}</span>
                    </p>
                </div>
                <p class="info-address-info-bottom">
                    <span>收货地址：{{ orderInfo.deliveryAddress.provinceName + orderInfo.deliveryAddress.cityName + orderInfo.deliveryAddress.districtName + orderInfo.deliveryAddress.address }}</span>
                </p>
            </div>
        </div>
        <img class="info-address-line" src="../../../../img/create_order.png" />
        <!-- 成团情况 -->
        <div class="info-merchandise scoped" v-if="orderInfo.statusCode === 2">
            <p class="scoped-top">离成团还差<span class="scoped-top-red">{{ orderInfo.countDown.person }}</span>人</p>
            <p class="scoped-mid">
                剩
                <span class="scoped-mid-time">{{ orderInfo.countDown.hour }}</span>
                :
                <span class="scoped-mid-time">{{ orderInfo.countDown.minute }}</span>
                :
                <span class="scoped-mid-time">{{ orderInfo.countDown.second }}</span>
                自动结束
            </p>
            <p class="scoped-bottom">好货手慢无，快来买哟！</p>
        </div>
        <div class="info-merchandise" @click="handleRouteToMerchandiseInfo(orderInfo.merchandise.id, orderInfo.merchandise.groupId)">
            <img :src="orderInfo.merchandise.img" class="info-merchandise-img" />
            <div class="info-merchandise-info">
                <p class="info-merchandise-info-top">
                    <span class="info-merchandise-info-top-name">{{ orderInfo.merchandise.name }}</span>
                </p>
                <p class="info-merchandise-info-mid">
                    <span class="info-merchandise-info-mid-content">净含量：{{ orderInfo.merchandise.content }}</span>
                </p>
                <p class="info-merchandise-info-bottom">
                    <span class="info-merchandise-info-bottom-price">
                        <span>¥</span>
                        <span class="info-merchandise-info-bottom-price-l">{{ orderInfo.merchandise.price.integer }}</span>
                        <span>.</span>
                        <span>{{ orderInfo.merchandise.price.decimal }}</span>
                    </span>
                    <span class="info-merchandise-info-bottom-count">x{{ orderInfo.merchandise.count }}</span>
                </p>
            </div>
        </div>
        <ul class="info-price">
            <li class="info-price-item">
                <span>商品总价</span>
                <span>{{ '¥' + orderInfo.price.noCouponPrice.integer + '.' + orderInfo.price.noCouponPrice.decimal }}</span>
            </li>
            <li class="info-price-item">
                <span>运费</span>
                <span>¥0.00</span>
            </li>
            <li class="info-price-item">
                <span>优惠券</span>
                <span>{{ '-¥' + orderInfo.price.couponPrice.integer + '.' + orderInfo.price.couponPrice.decimal }}</span>
            </li>
        </ul>
        <div class="info-totalPrice">
            <p class="info-totalPrice-title">
                <span>订单总价</span>
            </p>
            <p class="info-totalPrice-content">
                <span class="info-totalPrice-content-s">¥</span>
                <span>{{ orderInfo.price.realPrice.integer }}</span>
                <span class="info-totalPrice-content-s">.{{ orderInfo.price.realPrice.decimal }}</span>
            </p>
        </div>
        <div class="info-time">
            <p>订单编号：{{ orderInfo.serialNumber }}</p>
            <p v-if="orderInfo.expressNumber">快递单号：{{ orderInfo.expressNumber }}</p>
            <p v-if="orderInfo.time.createDatetime !== ''">创建时间：{{ orderInfo.time.createDatetime }}</p>
            <p v-if="orderInfo.time.payDatetime !== ''">支付时间：{{ orderInfo.time.payDatetime }}</p>
            <p v-if="orderInfo.time.groupFinishDatetime !== ''">成团时间：{{ orderInfo.time.groupFinishDatetime }}</p>
            <p v-if="orderInfo.time.deliveryDatetime !== ''">发货时间：{{ orderInfo.time.deliveryDatetime }}</p>
            <p v-if="orderInfo.time.finishDatetime !== ''">完成时间：{{ orderInfo.time.finishDatetime }}</p>
            <p v-if="orderInfo.time.cancelDatetime !== ''">取消时间：{{ orderInfo.time.cancelDatetime }}</p>
        </div>
        <div class="info-operation" v-if="orderInfo.statusCode === 1 || orderInfo.statusCode === 6 || orderInfo.statusCode === 3 || orderInfo.statusCode === 4">
            <button class="info-operation-button" v-if="orderInfo.statusCode === 1" @click="handleCancelOrder">取消订单</button>
            <button class="info-operation-button" v-if="orderInfo.statusCode === 3 || orderInfo.statusCode === 4"><a href="tel:18072898099">申请退款</a></button>
            <button class="info-operation-button info-operation-button-red" v-if="orderInfo.statusCode === 3" @click.stop="handleConfirmReceipt">确认收货</button>
            <button class="info-operation-button info-operation-button-red" v-if="orderInfo.statusCode === 1" @click="handleRouteToPay">付款</button>
            <button class="info-operation-button info-operation-button-red" v-if="orderInfo.statusCode === 6" @click="handleReminder">催单</button>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                orderInfo: {
                    statusCode: 0,
                    status: '',
                    deliveryAddress: {
                        name: '',
                        cellphone: '',
                        provinceName: '',
                        cityName: '',
                        districtName: '',
                        address: ''
                    },
                    countDown: {
                        person: 0,
                        hour: 0,
                        minute: 0,
                        second: 0
                    },
                    merchandise: {
                        img: '',
                        name: '',
                        content: '',
                        price: '',
                        count: 0
                    },
                    price: {
                        noCouponPrice: '',
                        couponPrice: '',
                        realPrice: ''
                    },
                    serialNumber: '',
                    expressNumber: '',
                    time: {
                        createDatetime: '',
                        payDatetime: '',
                        groupFinishDatetime: '',
                        deliveryDatetime: '',
                        finishDatetime: '',
                        cancelDatetime: ''
                    }
                },
                interval: ''
            }
        },
        methods: {
            countDownStart() {
                this.interval = setInterval(() => {
                    this.orderInfo.countDown.second --;
                }, 1000);
            },
            handleCancelOrder() {
                let cancel = confirm('您确定要取消该订单吗？');
                if (cancel === true) {
                    this.$http({
                        url: '/api/mall/person/cancelOrder',
                        method: 'patch',
                        data: {
                            id: this.$route.query.id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('取消成功');
                            this.$router.push('/index/person/myOrder');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            handleConfirmReceipt() {
                let cancel = confirm('您确定要确认收货吗？');
                if (cancel === true) {
                    this.$http({
                        url: '/api/mall/person/confirmReceipt',
                        method: 'patch',
                        data: {
                            id: this.$route.query.id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('已确认收货');
                            this.$router.push('/index/person/myOrder');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            handleReminder() {
                alert('催单成功！');
            },
            handleRouteToPay() {
                this.$router.push({
                    path: '/mall/payOrder',
                    query: {
                        id: this.$route.query.id
                    }
                });
            },
            handleRouteToMerchandiseInfo(id, groupId) {
                this.$router.push({
                    path: '/mall/merchandiseInfo',
                    query: {
                        id,
                        groupId
                    }
                });
            }
        },
        mounted() {
            this.$http({
                url: '/api/mall/person/getOrderInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.orderInfo = response.data.order;
                    this.countDownStart();
                }
            }).catch((response) => {
                console.log(response);
            });
        },
        watch: {
            'orderInfo.countDown.second': function() {
                if (this.orderInfo.countDown.second < 0) {
                    if (this.orderInfo.countDown.minute > 0 || this.orderInfo.countDown.hour > 0 || this.orderInfo.countDown.day > 0) {
                        this.orderInfo.countDown.minute --
                        this.orderInfo.countDown.second = 59;
                    } else {
                        clearInterval(this.interval);
                        this.orderInfo.countDown.second = 0;
                    }
                }
            },
            'orderInfo.countDown.minute': function() {
                if (this.orderInfo.countDown.minute < 0) {
                    this.orderInfo.countDown.hour --
                    this.orderInfo.countDown.minute = 59;
                }
            }
        }
    }
</script>
