<style lang="less" scoped>
    .order{ width: 100%; height: 100%;
        &-tabs-view{ flex-grow: 1; flex-shrink: 10; background-color: #f5f5f5; overflow: scroll;}
        &-list{
            &-item{ margin-bottom: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff;
                &-sub{ display: flex; padding: .3rem; border-top: 1px solid #dcdcdc;}
                &-merchandise{
                    &-img{ flex-shrink: 0; width: 1.4rem; height: 1.4rem; border: 1px solid #dcdcdc;}
                    &-info{ display: flex; flex-direction: column; flex-grow: 1; height: 1.4rem; padding-left: .3rem;
                        &-top{ display: flex; justify-content: space-between; flex-shrink: 0; font-size: .3rem;
                            &-name{ flex-grow: 1; color: #333;}
                            &-status{ flex-shrink: 0; color: #ff4c4c;}
                        }
                        &-mid{ flex-grow: 1; font-size: .22rem;
                            &-content{ color: #999;}
                        }
                        &-bottom{ display: flex; align-items: flex-end; justify-content: space-between; flex-shrink: 0;
                            &-price{ color: #ff4c4c; font-size: 0;
                                > span{ font-size: .26rem;}
                                & > &-l{ font-size: .36rem;}
                            }
                            &-count{ color: #333; font-size: .26rem;}
                        }
                    }
                }
                &-description{ justify-content: flex-end; font-size: .24rem;}
                &-operation{ justify-content: flex-end;
                    &-button{ margin-left: .3rem; padding: .1rem .18rem; border: 1px solid #666; border-radius: .08rem; background-color: #fff; color: #666;
                        &-red{ border-color: #ff4c4c; color: #ff4c4c;}
                    }
                }
            }
        }
        &-load{ font-size: .22rem; line-height: 4; color: #999; text-align: center;}
    }
</style>
<template>
    <zdTabs class="order" ref="tabs" v-title="'我的订单'" @changeTabName="changeTabName">
        <zdTabsView
            :label="item.label"
            :name="'00' + item.status"
            class="order-tabs-view"
            v-for="item in tabs"
            :key="item.status"
        >
            <ul class="order-list">
                <li class="order-list-item" v-for="order in item.list" :key="order.id" @click="handleOrderInfo(order.id)">
                    <div class="order-list-item-sub order-list-item-merchandise">
                        <img :src="order.merchandise.img" class="order-list-item-merchandise-img" />
                        <div class="order-list-item-merchandise-info">
                            <p class="order-list-item-merchandise-info-top">
                                <span class="order-list-item-merchandise-info-top-name">{{ order.merchandise.name }}</span>
                                <span class="order-list-item-merchandise-info-top-status">{{ order.status }}</span>
                            </p>
                            <p class="order-list-item-merchandise-info-mid">
                                <span class="order-list-item-merchandise-info-mid-content">净含量：{{ order.merchandise.content }}</span>
                            </p>
                            <p class="order-list-item-merchandise-info-bottom">
                                <span class="order-list-item-merchandise-info-bottom-price">
                                    <span>¥</span>
                                    <span class="order-list-item-merchandise-info-bottom-price-l">{{ order.merchandise.price.integer }}</span>
                                    <span>.</span>
                                    <span>{{ order.merchandise.price.decimal }}</span> 
                                </span>
                                <span class="order-list-item-merchandise-info-bottom-count">x{{ order.merchandise.count }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="order-list-item-sub order-list-item-description">
                        <span>共{{ order.merchandise.count }}件商品 合计：¥{{ order.merchandise.totalPrice.integer }}.{{ order.merchandise.totalPrice.decimal }} (含运费¥0.00)</span>
                    </div>
                    <div class="order-list-item-sub order-list-item-operation" v-if="order.statusCode !== 2 && order.statusCode !== 8 && order.statusCode !== 9">
                        <button class="order-list-item-operation-button" v-if="order.statusCode === 1" @click.stop="handleCancelOrder(order.id)">取消订单</button>
                        <button class="order-list-item-operation-button" v-if="order.statusCode === 3 || order.statusCode === 4">
                            <a href="tel:18072898099">申请退款</a>
                        </button>
                        <button class="order-list-item-operation-button order-list-item-operation-button-red" v-if="order.statusCode === 3" @click.stop="handleConfirmReceipt(order.id)">确认收货</button>
                        <button class="order-list-item-operation-button order-list-item-operation-button-red" v-if="order.statusCode === 1" @click.stop="handleRouteToPay(order.id)">付款</button>
                        <button class="order-list-item-operation-button order-list-item-operation-button-red" v-if="order.statusCode === 6" @click.stop="handleReminder">催单</button>
                    </div>
                </li>
            </ul>
            <p class="order-load" @click="handleLoadingMore(item)">
                <span>{{ item.canLoad ? (item.loading ? '正在加载...' : '点击加载更多') : '没有更多了' }}</span>
            </p>
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
            const obj = {
                allOrderList: [],
                notPayOrderList: [],
                notFinishGroupOrderList: [],
                notSendOrderList: [],
                alreadySendedOrderList: [],
                finishedOrderList: [],
                tabs: [{
                    label: '全部',
                    status: '',
                    index: '',
                    canLoad: true,
                    loading: false
                }, {
                    label: '待付款',
                    status: 1,
                    index: '',
                    canLoad: true,
                    loading: false
                }, {
                    label: '待成团',
                    status: 2,
                    index: '',
                    canLoad: true,
                    loading: false
                }, {
                    label: '待发货',
                    status: 6,
                    index: '',
                    canLoad: true,
                    loading: false
                }, {
                    label: '已发货',
                    status: 3,
                    index: '',
                    canLoad: true,
                    loading: false
                }, {
                    label: '已完成',
                    status: 4,
                    index: '',
                    canLoad: true,
                    loading: false
                }]
            };
            obj.tabs[0].list = obj.allOrderList;
            obj.tabs[1].list = obj.notPayOrderList;
            obj.tabs[2].list = obj.notFinishGroupOrderList;
            obj.tabs[3].list = obj.notSendOrderList;
            obj.tabs[4].list = obj.alreadySendedOrderList;
            obj.tabs[5].list = obj.finishedOrderList;
            return obj;
        },
        methods: {
            changeTabName(name) {
                this.$router.replace('/index/person/myOrder/tab/' + name);
            },
            listInit() {
                this.$http({
                    url: '/api/mall/person/orderListInit',
                    method: 'get'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.allOrderList.push(...response.data.allOrderList);
                        if (this.allOrderList.length > 0) {
                            this.tabs[0].index = this.allOrderList[this.allOrderList.length - 1].id;
                        }
                        if (this.allOrderList.length < 10) {
                            this.tabs[0].canLoad = false;
                        }

                        this.notPayOrderList.push(...response.data.notPayOrderList);
                        if (this.notPayOrderList.length > 0) {
                            this.tabs[1].index = this.notPayOrderList[this.notPayOrderList.length - 1].id;
                        }
                        if (this.notPayOrderList.length < 10) {
                            this.tabs[1].canLoad = false;
                        }

                        this.notFinishGroupOrderList.push(...response.data.notFinishGroupOrderList);
                        if (this.notFinishGroupOrderList.length > 0) {
                            this.tabs[2].index = this.notFinishGroupOrderList[this.notFinishGroupOrderList.length - 1].id;
                        }
                        if (this.notFinishGroupOrderList.length < 10) {
                            this.tabs[2].canLoad = false;
                        }

                        this.notSendOrderList.push(...response.data.notSendOrderList);
                        if (this.notSendOrderList.length > 0) {
                            this.tabs[3].index = this.notSendOrderList[this.notSendOrderList.length - 1].id;
                        }
                        if (this.notSendOrderList.length < 10) {
                            this.tabs[3].canLoad = false;
                        }

                        this.alreadySendedOrderList.push(...response.data.alreadySendedOrderList);
                        if (this.alreadySendedOrderList.length > 0) {
                            this.tabs[4].index = this.alreadySendedOrderList[this.alreadySendedOrderList.length - 1].id;
                        }
                        if (this.alreadySendedOrderList.length < 10) {
                            this.tabs[4].canLoad = false;
                        }

                        this.finishedOrderList.push(...response.data.finishedOrderList);
                        if (this.finishedOrderList.length > 0) {
                            this.tabs[5].index = this.finishedOrderList[this.finishedOrderList.length - 1].id;
                        }
                        if (this.finishedOrderList.length < 10) {
                            this.tabs[5].canLoad = false;
                        }
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleLoadingMore(item) {
                if (item.canLoad === true && item.loading === false) {
                    item.loading = true;
                    this.loadList(item);
                }
            },
            loadList(item) {
                this.$http({
                    url: '/api/mall/person/getOrderList',
                    params: {
                        status: item.status,
                        index: item.index
                    }
                }).then((response) => {
                    item.loading = false;
                    if (response.data.code === '00000') {
                        item.list.push(...response.data.orderList);
                        if (response.data.orderList.length > 0) {
                            item.index = item.list[item.list.length - 1].id;
                        }
                        if (response.data.orderList.length < 10) {
                            item.canLoad = false;
                        }
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleOrderInfo(id) {
                this.$router.push({
                    path: '/index/person/myOrder/orderInfo',
                    query: {
                        id
                    }
                });
            },
            handleCancelOrder(id) {
                let cancel = confirm('您确定要取消该订单吗？');
                if (cancel === true) {
                    this.$http({
                        url: '/api/mall/person/cancelOrder',
                        method: 'patch',
                        data: {
                            id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('取消成功');
                            this.$router.go(0);
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            handleConfirmReceipt(id) {
                let cancel = confirm('您确定要确认收货吗？');
                if (cancel === true) {
                    this.$http({
                        url: '/api/mall/person/confirmReceipt',
                        method: 'patch',
                        data: {
                            id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('已确认收货');
                            this.$router.go(0);
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            handleReminder() {
                alert('催单成功！');
            },
            handleRouteToPay(id) {
                this.$router.push({
                    path: '/mall/payOrder',
                    query: {
                        id
                    }
                });
            }
        },
        mounted() {
            this.listInit();
            // if (Object.prototype.hasOwnProperty.call(this.$route.query, 'status') === true) {
            //     this.$refs['tabs'].activeName = '00' + this.$route.query.status;
            // }
        }
    }
</script>
