import mall from "../mall/routers"
const routers = [{
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
        redirect: '/index/service',
        children: [{
                path: 'service',
                component(resolve) {
                    require.ensure(['./contains/index/service.vue'], () => {
                        resolve(require('./contains/index/service.vue'));
                    });
                }
            }, {
                path: 'life',
                component(resolve) {
                    require.ensure(['./contains/index/life.vue'], () => {
                        resolve(require('./contains/index/life.vue'));
                    });
                },
                redirect: '/index/life/business',
                children: [{
                    path: 'business',
                    component(resolve) {
                        require.ensure(['./contains/index/life-index/bussiness.vue'], () => {
                            resolve(require('./contains/index/life-index/bussiness.vue'));
                        });
                    }
                }, {
                    path: 'null',
                    component(resolve) {
                        require.ensure(['./contains/index/life-index/null.vue'], () => {
                            resolve(require('./contains/index/life-index/null.vue'));
                        });
                    }
                }]
            },
            {
                path: 'person',
                component(resolve) {
                    require.ensure(['./contains/index/person.vue'], () => {
                        resolve(require('./contains/index/person.vue'));
                    });
                }
            },
            {
                path: 'visitorPerson',
                component(resolve) {
                    require.ensure(['./contains/index/visitorPerson.vue'], () => {
                        resolve(require('./contains/index/visitorPerson.vue'));
                    });
                }
            },
            {
                path: 'manager',
                component(resolve) {
                    require.ensure(['./contains/index/manager.vue'], () => {
                        resolve(require('./contains/index/manager.vue'));
                    });
                }
            }
        ]
    },
    //全部分类
    {
        path: '/service/allclass',
        component(resolve) {
            require.ensure(['./contains/index/life-index/allclass.vue'], () => {
                resolve(require('./contains/index/life-index/allclass.vue'));
            });
        }
    },
    //二级分类
    {
        path: '/service/classfiySecond',
        component(resolve) {
            require.ensure(['./contains/index/life-index/classfiySecond.vue'], () => {
                resolve(require('./contains/index/life-index/classfiySecond.vue'));
            });
        }
    },
    // 惠服务
    // 惠服务----报修
    {
        path: '/service/repairment',
        component(resolve) {
            require.ensure(['./contains/index/service/repairment.vue'], () => {
                resolve(require('./contains/index/service/repairment.vue'));
            });
        }
    },
    {
        path: '/service/repairment/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/service/repairment.vue'], () => {
                resolve(require('./contains/index/service/repairment.vue'));
            });
        }
    },
    // 惠服务----表扬投诉

    {
        path: '/service/myComplaint',
        component(resolve) {
            require.ensure(['./contains/index/service/myComplaint.vue'], () => {
                resolve(require('./contains/index/service/myComplaint.vue'));
            });
        }
    },
    {
        path: '/service/myComplaint/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/service/myComplaint.vue'], () => {
                resolve(require('./contains/index/service/myComplaint.vue'));
            });
        }
    },
    {
        path: '/service/myComplaint/complaint/:type',
        component(resolve) {
            require.ensure(['./contains/index/service/myComplaint/complaint.vue'], () => {
                resolve(require('./contains/index/service/myComplaint/complaint.vue'));
            });
        }
    },
    {
        path: '/service/myComplaint/complaintInfo',
        component(resolve) {
            require.ensure(['./contains/index/service/myComplaint/complaintInfo.vue'], () => {
                resolve(require('./contains/index/service/myComplaint/complaintInfo.vue'));
            });
        }
    },
    // 惠服务----园区活动
    {
        path: '/service/activity',
        component(resolve) {
            require.ensure(['./contains/index/service/activity.vue'], () => {
                resolve(require('./contains/index/service/activity.vue'));
            });
        }
    },
    {
        path: '/service/activity/activityInfo',
        component(resolve) {
            require.ensure(['./contains/index/service/activity/activityInfo.vue'], () => {
                resolve(require('./contains/index/service/activity/activityInfo.vue'));
            });
        }
    },
    {
        path: '/service/activity/activityEnrolled',
        component(resolve) {
            require.ensure(['./contains/index/service/activity/activityEnrolled.vue'], () => {
                resolve(require('./contains/index/service/activity/activityEnrolled.vue'));
            });
        }
    },
    {
        path: '/service/activity/activityInfo/enrollActivity',
        component(resolve) {
            require.ensure(['./contains/index/service/activity/activityInfo/enrollActivity.vue'], () => {
                resolve(require('./contains/index/service/activity/activityInfo/enrollActivity.vue'));
            });
        }
    },
    // 惠服务----园区公告
    {
        path: '/service/announcement',
        component(resolve) {
            require.ensure(['./contains/index/service/announcement.vue'], () => {
                resolve(require('./contains/index/service/announcement.vue'));
            });
        }
    },
    {
        path: '/service/announcement/announcementInfo',
        component(resolve) {
            require.ensure(['./contains/index/service/announcement/announcementInfo.vue'], () => {
                resolve(require('./contains/index/service/announcement/announcementInfo.vue'));
            });
        }
    },
    // 惠服务----自助缴费
    {
        path: '/service/payment',
        component(resolve) {
            require.ensure(['./contains/index/service/payment.vue'], () => {
                resolve(require('./contains/index/service/payment.vue'));
            });
        }
    },
    // 调查问卷
    {
        path: '/service/queastion',
        component(resolve) {
            require.ensure(['./contains/index/service/queastion.vue'], () => {
                resolve(require('./contains/index/service/queastion.vue'));
            });
        }
    },
    // 调查问卷详情
    {
        path: '/service/queastion/queastiondetail',
        component(resolve) {
            require.ensure(['./contains/index/service/queastion/queastion-detail.vue'], () => {
                resolve(require('./contains/index/service/queastion/queastion-detail.vue'));
            });
        }
    },
    {
        path: '/service/house',
        component(resolve) {
            require.ensure(['./contains/index/service/house.vue'], () => {
                resolve(require('./contains/index/service/house.vue'));
            });
        }
    },
    {
        path: '/service/payment/pay',
        component(resolve) {
            require.ensure(['./contains/index/service/payment/pay.vue'], () => {
                resolve(require('./contains/index/service/payment/pay.vue'));
            });
        }
    },
    // 惠服务----常用电话
    {
        path: '/service/commonTelephone',
        component(resolve) {
            require.ensure(['./contains/index/service/commonTelephone.vue'], () => {
                resolve(require('./contains/index/service/commonTelephone.vue'));
            });
        }
    },
    // 惠服务----园区报事
    {
        path: '/service/report',
        component(resolve) {
            require.ensure(['./contains/index/service/report.vue'], () => {
                resolve(require('./contains/index/service/report.vue'));
            });
        }
    },
    // 惠服务----咨询建议
    {
        path: '/service/suggestion',
        component(resolve) {
            require.ensure(['./contains/index/service/suggestion.vue'], () => {
                resolve(require('./contains/index/service/suggestion.vue'));
            });
        }
    },
    {
        path: '/service/suggestion/suggest',
        component(resolve) {
            require.ensure(['./contains/index/service/suggestion/suggest.vue'], () => {
                resolve(require('./contains/index/service/suggestion/suggest.vue'));
            });
        }
    },
    {
        path: '/service/suggestion/suggestionInfo',
        component(resolve) {
            require.ensure(['./contains/index/service/suggestion/suggestionInfo.vue'], () => {
                resolve(require('./contains/index/service/suggestion/suggestionInfo.vue'));
            });
        }
    },
    // 惠生活
    // 惠生活----领券中心
    {
        path: '/life/coupon',
        component(resolve) {
            require.ensure(['./contains/index/life/coupon.vue'], () => {
                resolve(require('./contains/index/life/coupon.vue'));
            });
        }
    },
    {
        path: '/life/exchange',
        component(resolve) {
            require.ensure(['./contains/index/life/exchange.vue'], () => {
                resolve(require('./contains/index/life/exchange.vue'));
            });
        }
    },
    {
        path: '/life/coupon/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/life/coupon.vue'], () => {
                resolve(require('./contains/index/life/coupon.vue'));
            });
        }
    },
    // 个人中心
    // 个人中心----编辑个人信息
    {
        path: '/person/editMyMessage',
        component(resolve) {
            require.ensure(['./contains/index/person/editMyMessage.vue'], () => {
                resolve(require('./contains/index/person/editMyMessage.vue'));
            });
        }
    },
    {
        path: '/person/editMyMessage/changePhoneCall',
        component(resolve) {
            require.ensure(['./contains/index/person/editMyMessage/changePhoneCall.vue'], () => {
                resolve(require('./contains/index/person/editMyMessage/changePhoneCall.vue'));
            });
        }
    },
    // 个人中心----我的家庭
    {
        path: '/person/myFamily',
        component(resolve) {
            require.ensure(['./contains/index/person/myFamily.vue'], () => {
                resolve(require('./contains/index/person/myFamily.vue'));
            });
        }
    },
    {
        path: '/person/myFamily/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/person/myFamily.vue'], () => {
                resolve(require('./contains/index/person/myFamily.vue'));
            });
        }
    },
    {
        path: '/person/myFamily/familyMemberInfo/:type',
        component(resolve) {
            require.ensure(['./contains/index/person/myFamily/familyMemberInfo.vue'], () => {
                resolve(require('./contains/index/person/myFamily/familyMemberInfo.vue'));
            });
        }
    },
    {
        path: '/person/myFamily/addHouse',
        component(resolve) {
            require.ensure(['./contains/index/person/myFamily/addHouse.vue'], () => {
                resolve(require('./contains/index/person/myFamily/addHouse.vue'));
            });
        },
        redirect: '/person/myFamily/addHouse/choosePark',
        children: [{
            path: 'choosePark',
            component(resolve) {
                require.ensure(['./contains/index/person/myFamily/addHouse/choosePark.vue'], () => {
                    resolve(require('./contains/index/person/myFamily/addHouse/choosePark.vue'));
                });
            },
            redirect: '/person/myFamily/addHouse/choosePark/park',
            children: [{
                path: 'park',
                component(resolve) {
                    require.ensure(['publicContains/choosePark/park.vue'], () => {
                        resolve(require('publicContains/choosePark/park.vue'));
                    });
                }
            }, {
                path: 'build',
                component(resolve) {
                    require.ensure(['publicContains/choosePark/build.vue'], () => {
                        resolve(require('publicContains/choosePark/build.vue'));
                    });
                }
            }, {
                path: 'room',
                component(resolve) {
                    require.ensure(['publicContains/choosePark/room.vue'], () => {
                        resolve(require('publicContains/choosePark/room.vue'));
                    });
                }
            }]
        }, {
            path: 'apply',
            component(resolve) {
                require.ensure(['./contains/index/person/myFamily/addHouse/apply.vue'], () => {
                    resolve(require('./contains/index/person/myFamily/addHouse/apply.vue'));
                });
            }
        }, {
            path: 'error',
            component(resolve) {
                require.ensure(['./contains/index/person/myFamily/addHouse/error.vue'], () => {
                    resolve(require('./contains/index/person/myFamily/addHouse/error.vue'));
                });
            }
        }, {
            path: 'invite',
            component(resolve) {
                require.ensure(['./contains/index/person/myFamily/addHouse/invite.vue'], () => {
                    resolve(require('./contains/index/person/myFamily/addHouse/invite.vue'));
                });
            }
        }]
    },
    {
        path: '/person/myFamily/changeDefaultHouse/:fromPage',
        component(resolve) {
            require.ensure(['./contains/index/person/myFamily/changeDefaultHouse.vue'], () => {
                resolve(require('./contains/index/person/myFamily/changeDefaultHouse.vue'));
            });
        }
    },
    {
        path: '/person/myFamily/inviteMember',
        component(resolve) {
            require.ensure(['./contains/index/person/myFamily/inviteMember.vue'], () => {
                resolve(require('./contains/index/person/myFamily/inviteMember.vue'));
            });
        }
    },
    // 个人中心----我的报修记录
    {
        path: '/person/myRepairment',
        component(resolve) {
            require.ensure(['./contains/index/person/myRepairment.vue'], () => {
                resolve(require('./contains/index/person/myRepairment.vue'));
            });
        }
    },
    {
        path: '/person/myRepairment/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/person/myRepairment.vue'], () => {
                resolve(require('./contains/index/person/myRepairment.vue'));
            });
        }
    },
    {
        path: '/person/myRepairment/repairmentInfo',
        component(resolve) {
            require.ensure(['./contains/index/person/myRepairment/repairmentInfo.vue'], () => {
                resolve(require('./contains/index/person/myRepairment/repairmentInfo.vue'));
            });
        }
    },
    // 个人中心----我的饭卡
    {
        path: '/person/card',
        component(resolve) {
            require.ensure(['./contains/index/person/card.vue'], () => {
                resolve(require('./contains/index/person/card.vue'));
            });
        }
    },
    {
        path: '/person/card/pay',
        component(resolve) {
            require.ensure(['./contains/index/person/card/pay.vue'], () => {
                resolve(require('./contains/index/person/card/pay.vue'));
            });
        }
    },
    {
        path: '/person/card/paySuccess',
        component(resolve) {
            require.ensure(['./contains/index/person/card/paySuccess.vue'], () => {
                resolve(require('./contains/index/person/card/paySuccess.vue'));
            });
        }
    },
    {
        path: '/person/card/payError',
        component(resolve) {
            require.ensure(['./contains/index/person/card/payError.vue'], () => {
                resolve(require('./contains/index/person/card/payError.vue'));
            });
        }
    },
    {
        path: '/person/card/payCode',
        component(resolve) {
            require.ensure(['./contains/index/person/card/payCode.vue'], () => {
                resolve(require('./contains/index/person/card/payCode.vue'));
            });
        }
    },
    {
        path: '/person/card/consumption',
        component(resolve) {
            require.ensure(['./contains/index/person/card/consumption.vue'], () => {
                resolve(require('./contains/index/person/card/consumption.vue'));
            });
        }
    },
    {
        path: '/person/card/recharge',
        component(resolve) {
            require.ensure(['./contains/index/person/card/recharge.vue'], () => {
                resolve(require('./contains/index/person/card/recharge.vue'));
            });
        }
    },
    {
        path: '/person/card/nickname',
        component(resolve) {
            require.ensure(['./contains/index/person/card/nickname.vue'], () => {
                resolve(require('./contains/index/person/card/nickname.vue'));
            });
        }
    },
    {
        path: '/person/card/detail',
        component(resolve) {
            require.ensure(['./contains/index/person/card/detail.vue'], () => {
                resolve(require('./contains/index/person/card/detail.vue'));
            });
        }
    },
    // 个人中心----我的收货地址
    {
        path: '/person/myDeliveryAddress',
        component(resolve) {
            require.ensure(['./contains/index/person/myDeliveryAddress.vue'], () => {
                resolve(require('./contains/index/person/myDeliveryAddress.vue'));
            });
        }
    },
    {
        path: '/person/myDeliveryAddress/addDeliveryAddress',
        component(resolve) {
            require.ensure(['./contains/index/person/myDeliveryAddress/addDeliveryAddress.vue'], () => {
                resolve(require('./contains/index/person/myDeliveryAddress/addDeliveryAddress.vue'));
            });
        }
    },
    {
        path: '/person/myDeliveryAddress/editDeliveryAddress',
        component(resolve) {
            require.ensure(['./contains/index/person/myDeliveryAddress/editDeliveryAddress.vue'], () => {
                resolve(require('./contains/index/person/myDeliveryAddress/editDeliveryAddress.vue'));
            });
        }
    },
    // 个人中心----我的优惠券
    {
        path: '/person/myCoupon',
        component(resolve) {
            require.ensure(['./contains/index/person/myCoupon.vue'], () => {
                resolve(require('./contains/index/person/myCoupon.vue'));
            });
        }
    },
    {
        path: '/person/myCoupon/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/person/myCoupon.vue'], () => {
                resolve(require('./contains/index/person/myCoupon.vue'));
            });
        }
    },
    // 个人中心----我的报事
    {
        path: '/person/myReport',
        component(resolve) {
            require.ensure(['./contains/index/person/myReport.vue'], () => {
                resolve(require('./contains/index/person/myReport.vue'));
            });
        }
    },
    {
        path: '/person/myReport/tab/:tabName',
        component(resolve) {
            require.ensure(['./contains/index/person/myReport.vue'], () => {
                resolve(require('./contains/index/person/myReport.vue'));
            });
        }
    },
    {
        path: '/person/myReport/reportInfo',
        component(resolve) {
            require.ensure(['./contains/index/person/myReport/reportInfo.vue'], () => {
                resolve(require('./contains/index/person/myReport/reportInfo.vue'));
            });
        }
    },
    {
        path: '*',
        redirect: '/index'
    },
    ...mall
];

export default routers;