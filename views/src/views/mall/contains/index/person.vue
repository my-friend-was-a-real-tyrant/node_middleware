<style lang="less" scoped>
    .order-icon(@n, @i: 0) when (@i < @n) {
        .personal-order-icon-@{i} {
            background-position: 0 (@i * -.48rem);
        }
        .order-icon(@n, (@i + 1));
    }
    .personal{
        &-order{ display: flex; flex-direction: column; align-items: center; flex-grow: 1; flex-shrink: 0; font-size: .22rem; color: #333;
            &-wrapper{ display: flex; justify-content: space-between; width: 100%; padding-bottom: .3rem; border-bottom: 1px solid #dcdcdc;}
            &-icon{ width: .52rem; height: .48rem; margin: .3rem 0; background-image: url('../../img/menu_icon.jpg'); background-size: 100% auto;}
            .order-icon(5);

            &-list{
                &-item{ display: flex; align-items: center; justify-content: space-between; width: 100%; padding: .3rem; border-bottom: 1px solid #dcdcdc;
                    span{ flex-grow: 1; font-size: .28rem; color: #333;}
                }
            }
        }
    }
    .icon{ flex-shrink: 0; display: inline-block; width: .13rem; height: .24rem; background-image: url(../../../../publicSource/img/push_icon.png); background-size: 100% 100%; background-repeat: no-repeat;}
</style>
<template>
    <div class="personal">
        <div class="personal-order-wrapper">
            <div class="personal-order" v-for="(subMenu, index) in orderMenu" :key="subMenu.name" @click="handleGo(subMenu.path)">
                <i class="personal-order-icon" :class="'personal-order-icon-' + index"></i>
                <span>{{ subMenu.name }}</span>
            </div>
        </div>
        <ul class="personal-order-list">
            <li class="personal-order-list-item" v-for="item in navList" :key="item.name" @click="handleGo(item.path)">
                <span>{{ item.name }}</span>
                <i class="icon"></i>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                orderMenu: [{
                    name: '待付款',
                    path: '/index/person/myOrder/tab/001'
                }, {
                    name: '待成团',
                    path: '/index/person/myOrder/tab/001'
                }, {
                    name: '待发货',
                    path: '/index/person/myOrder/tab/006'
                }, {
                    name: '已发货',
                    path: '/index/person/myOrder/tab/003'
                }, {
                    name: '已完成',
                    path: '/index/person/myOrder/tab/004'
                }],
                navList: [{
                    name: '全部订单',
                    path: '/index/person/myOrder'
                }, {
                    name: '我的收货地址',
                    path: '/deliveryAddress/deliveryAddressList'
                }, {
                    name: '我的优惠券',
                    path: '/index/person/myCoupon'
                }]
            }
        },
        methods: {
            handleGo(path) {
                this.$router.push(path);
            }
        }
    }
</script>
