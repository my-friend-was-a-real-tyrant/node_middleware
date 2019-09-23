const routers = [
    {
        path: '/test',
        component(resolve) {
            require.ensure(['./contains/test.vue'], () => {
                resolve(require('./contains/test.vue'));
            });
        }
    },
    // 系统首页（菜单页）
    {
        path: '/index',
        component(resolve) {
            require.ensure(['./contains/index.vue'], () => {
                resolve(require('./contains/index.vue'));
            });
        },
        redirect: '/index/mall',
        children: [
            {
                path: 'mall',
                component(resolve) {
                    require.ensure(['./contains/index/mall.vue'], () => {
                        resolve(require('./contains/index/mall.vue'));
                    });
                }
            },{
                path: 'person',
                component(resolve) {
                    require.ensure(['./contains/index/person.vue'], () => {
                        resolve(require('./contains/index/person.vue'));
                    });
                }
            }
        ]
    },
    // 商城
    // 商品详情
    {
        path: '/mall/merchandiseInfo',
        component(resolve) {
            require.ensure(['./contains/index/mall/merchandiseInfo.vue'], () => {
                resolve(require('./contains/index/mall/merchandiseInfo.vue'));
            });
        }
    },
    // 创建订单
    {
        path: '/mall/createOrder',
        component(resolve) {
            require.ensure(['./contains/index/mall/createOrder.vue'], () => {
                resolve(require('./contains/index/mall/createOrder.vue'));
            });
        }
    },
    // 支付
    {
        path: '/mall/payOrder',
        component(resolve) {
            require.ensure(['./contains/index/mall/payOrder.vue'], () => {
                resolve(require('./contains/index/mall/payOrder.vue'));
            });
        }
    },
    // 拼团
    {
        path: '/mall/collage',
        component(resolve) {
            require.ensure(['./contains/index/mall/collage.vue'], () => {
                resolve(require('./contains/index/mall/collage.vue'));
            });
        }
    },
    // 我的
    // 我的优惠券
    {
        path: '/index/person/myCoupon',
        component(resolve) {
            require.ensure(['./contains/index/person/myCoupon.vue'], () => {
                resolve(require('./contains/index/person/myCoupon.vue'));
            });
        }
    },
    {
        path: '/index/person/myCoupon/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/person/myCoupon.vue'], () => {
                resolve(require('./contains/index/person/myCoupon.vue'));
            });
        }
    },
    // 我的订单
    {
        path: '/index/person/myOrder',
        component(resolve) {
            require.ensure(['./contains/index/person/myOrder.vue'], () => {
                resolve(require('./contains/index/person/myOrder.vue'));
            });
        }
    },{
        path: '/index/person/myOrder/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/person/myOrder.vue'], () => {
                resolve(require('./contains/index/person/myOrder.vue'));
            });
        }
    },{
        path: '/index/person/myOrder/orderInfo',
        component(resolve) {
            require.ensure(['./contains/index/person/myOrder/orderInfo.vue'], () => {
                resolve(require('./contains/index/person/myOrder/orderInfo.vue'));
            });
        }
    },
    // 收货地址
    // 收货地址列表
    {
        path: '/deliveryAddress/deliveryAddressList',
        component(resolve) {
            require.ensure(['./contains/index/common/myDeliveryAddress.vue'], () => {
                resolve(require('./contains/index/common/myDeliveryAddress.vue'));
            });
        }
    },{
        path: '/deliveryAddress/addDeliveryAddress',
        component(resolve) {
            require.ensure(['./contains/index/common/myDeliveryAddress/addDeliveryAddress.vue'], () => {
                resolve(require('./contains/index/common/myDeliveryAddress/addDeliveryAddress.vue'));
            });
        }
    },{
        path: '/deliveryAddress/editDeliveryAddress',
        component(resolve) {
            require.ensure(['./contains/index/common/myDeliveryAddress/editDeliveryAddress.vue'], () => {
                resolve(require('./contains/index/common/myDeliveryAddress/editDeliveryAddress.vue'));
            });
        }
    },
    {
        path: '*',
        redirect: '/index'
    }
];

export default routers;