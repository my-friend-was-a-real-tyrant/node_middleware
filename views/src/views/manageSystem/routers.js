const routers = [
    {
        path: '/manageSystem/',
        component(resolve) {
            require.ensure(['./contains/system.vue'], () => {
                resolve(require('./contains/system.vue'));
            });
        },
        redirect: '/manageSystem/index',
        children: [{
            path: 'blank',
            component(resolve) {
                require.ensure(['./contains/system/blank.vue'], () => {
                    resolve(require('./contains/system/blank.vue'));
                });
            },
            meta: { permission: 0}
        },{
            path: 'index',
            component(resolve) {
                require.ensure(['./contains/system/index.vue'], () => {
                    resolve(require('./contains/system/index.vue'));
                });
            },
            meta: { permission: 0}
        },
        // 物业管理
        // 物业管理 -- 报修管理
        {
            path: 'property/repairment',
            component(resolve) {
                require.ensure(['./contains/system/property/repairment.vue'], () => {
                    resolve(require('./contains/system/property/repairment.vue'));
                });
            },
            meta: { permission: 1100}
        },{
            path: 'property/repairment/repairmentInfo',
            component(resolve) {
                require.ensure(['./contains/system/property/repairment/repairmentInfo.vue'], () => {
                    resolve(require('./contains/system/property/repairment/repairmentInfo.vue'));
                });
            },
            meta: { permission: 1100}
        },
        // 物业管理 -- 表扬投诉
        {
            path: 'property/complaint',
            component(resolve) {
                require.ensure(['./contains/system/property/complaint.vue'], () => {
                    resolve(require('./contains/system/property/complaint.vue'));
                });
            },
            meta: { permission: 1200}
        },{
            path: 'property/complaint/complaintInfo',
            component(resolve) {
                require.ensure(['./contains/system/property/complaint/complaintInfo.vue'], () => {
                    resolve(require('./contains/system/property/complaint/complaintInfo.vue'));
                });
            },
            meta: { permission: 1200}
        },
        // 物业管理 -- 房屋管理
        {
            path: 'property/room',
            component(resolve) {
                require.ensure(['./contains/system/property/room.vue'], () => {
                    resolve(require('./contains/system/property/room.vue'));
                });
            },
            meta: { permission: 400}
        },
        // 物业管理 -- 缴费管理
        {
            path: 'property/payment',
            component(resolve) {
                require.ensure(['./contains/system/property/payment.vue'], () => {
                    resolve(require('./contains/system/property/payment.vue'));
                });
            },
            meta: { permission: 3800}
        }, {
            path: 'property/payment/propertyDetail',
            component(resolve) {
                require.ensure(['./contains/system/property/payment/propertyDetail.vue'], () => {
                    resolve(require('./contains/system/property/payment/propertyDetail.vue'));
                });
            },
            meta: { permission: 3800}
        }, {
            path: 'property/payment/waterDetail',
            component(resolve) {
                require.ensure(['./contains/system/property/payment/waterDetail.vue'], () => {
                    resolve(require('./contains/system/property/payment/waterDetail.vue'));
                });
            },
            meta: { permission: 3800}
        },
        // 物业管理 -- 公告管理
        {
            path: 'property/announcement',
            component(resolve) {
                require.ensure(['./contains/system/property/announcement.vue'], () => {
                    resolve(require('./contains/system/property/announcement.vue'));
                });
            },
            meta: { permission: 1800}
        },{
            path: 'property/announcement/announcementInfo',
            component(resolve) {
                require.ensure(['./contains/system/property/announcement/announcementInfo.vue'], () => {
                    resolve(require('./contains/system/property/announcement/announcementInfo.vue'));
                });
            },
            meta: { permission: 1800}
        },{
            path: 'property/announcement/addAnnouncement',
            component(resolve) {
                require.ensure(['./contains/system/property/announcement/addAnnouncement.vue'], () => {
                    resolve(require('./contains/system/property/announcement/addAnnouncement.vue'));
                });
            },
            meta: { permission: 1801}
        },{
            path: 'property/announcement/editAnnouncement',
            component(resolve) {
                require.ensure(['./contains/system/property/announcement/editAnnouncement.vue'], () => {
                    resolve(require('./contains/system/property/announcement/editAnnouncement.vue'));
                });
            },
            meta: { permission: 1802}
        },
        // 物业管理 -- 活动管理
        {
            path: 'property/activity',
            component(resolve) {
                require.ensure(['./contains/system/property/activity.vue'], () => {
                    resolve(require('./contains/system/property/activity.vue'));
                });
            },
            meta: { permission: 1500}
        },{
            path: 'property/activity/activityInfo',
            component(resolve) {
                require.ensure(['./contains/system/property/activity/activityInfo.vue'], () => {
                    resolve(require('./contains/system/property/activity/activityInfo.vue'));
                });
            },
            meta: { permission: 1500}
        },{
            path: 'property/activity/addActivity',
            component(resolve) {
                require.ensure(['./contains/system/property/activity/addActivity.vue'], () => {
                    resolve(require('./contains/system/property/activity/addActivity.vue'));
                });
            },
            meta: { permission: 1501}
        },{
            path: 'property/activity/editActivity',
            component(resolve) {
                require.ensure(['./contains/system/property/activity/editActivity.vue'], () => {
                    resolve(require('./contains/system/property/activity/editActivity.vue'));
                });
            },
            meta: { permission: 1502}
        },
        // 物业管理 -- 问卷调查
        {
            path: 'property/questionnaire',
            component(resolve) {
                require.ensure(['./contains/system/property/questionnaire.vue'], () => {
                    resolve(require('./contains/system/property/questionnaire.vue'));
                });
            },
            meta: { permission: 3600}
        },
        {
            path: 'property/questionnairedetail',
            component(resolve) {
                require.ensure(['./contains/system/property/questionnaire/look-detail.vue'], () => {
                    resolve(require('./contains/system/property/questionnaire/look-detail.vue'));
                });
            },
            meta: { permission: 3600}
        },
        {
            path: 'property/addquestionnaire',
            component(resolve) {
                require.ensure(['./contains/system/property/questionnaire/add-questionnaire.vue'], () => {
                    resolve(require('./contains/system/property/questionnaire/add-questionnaire.vue'));
                });
            },
            meta: { permission: 3600}
        },
        {
            path: 'property/questionnairesubmitlist',
            component(resolve) {
                require.ensure(['./contains/system/property/questionnaire/submit-list.vue'], () => {
                    resolve(require('./contains/system/property/questionnaire/submit-list.vue'));
                });
            },
            meta: { permission: 3600}
        },
        {
            path: 'property/questionnairecensus',
            component(resolve) {
                require.ensure(['./contains/system/property/questionnaire/questionnaire-census.vue'], () => {
                    resolve(require('./contains/system/property/questionnaire/questionnaire-census.vue'));
                });
            },
            meta: { permission: 3600}
        },
        // 物业管理 -- 报事管理
        {
            path: 'property/report',
            component(resolve) {
                require.ensure(['./contains/system/property/report.vue'], () => {
                    resolve(require('./contains/system/property/report.vue'));
                });
            },
            meta: { permission: 1300}
        },{
            path: 'property/report/reportInfo',
            component(resolve) {
                require.ensure(['./contains/system/property/report/reportInfo.vue'], () => {
                    resolve(require('./contains/system/property/report/reportInfo.vue'));
                });
            },
            meta: { permission: 1300}
        },
        // 物业管理 -- 咨询建议管理
        {
            path: 'property/suggestion',
            component(resolve) {
                require.ensure(['./contains/system/property/suggestion.vue'], () => {
                    resolve(require('./contains/system/property/suggestion.vue'));
                });
            },
            meta: { permission: 1700}
        },{
            path: 'property/suggestion/suggestionInfo',
            component(resolve) {
                require.ensure(['./contains/system/property/suggestion/suggestionInfo.vue'], () => {
                    resolve(require('./contains/system/property/suggestion/suggestionInfo.vue'));
                });
            },
            meta: { permission: 1700}
        },
        // 物业管理 -- 常用电话管理
        {
            path: 'property/frequentlyPhone',
            component(resolve) {
                require.ensure(['./contains/system/property/frequentlyPhone.vue'], () => {
                    resolve(require('./contains/system/property/frequentlyPhone.vue'));
                });
            },
            meta: { permission: 3600}
        }, {
            path: 'property/frequentlyPhone/addFrequentlyPhone',
            component(resolve) {
                require.ensure(['./contains/system/property/frequentlyPhone/addFrequentlyPhone.vue'], () => {
                    resolve(require('./contains/system/property/frequentlyPhone/addFrequentlyPhone.vue'));
                });
            },
            meta: { permission: 3601}
        }, {
            path: 'property/frequentlyPhone/editFrequentlyPhone',
            component(resolve) {
                require.ensure(['./contains/system/property/frequentlyPhone/editFrequentlyPhone.vue'], () => {
                    resolve(require('./contains/system/property/frequentlyPhone/editFrequentlyPhone.vue'));
                });
            },
            meta: { permission: 3602}
        },
        // 商城管理
        // 商城管理 -- 商品管理
        {
            path: 'mall/merchandise',
            component(resolve) {
                require.ensure(['./contains/system/mall/merchandise.vue'], () => {
                    resolve(require('./contains/system/mall/merchandise.vue'));
                });
            },
            redirect: '/manageSystem/mall/merchandise/merchandise',
            meta: { permission: 3100},
            children: [
                {
                    path: 'merchandise',
                    component(resolve) {
                        require.ensure(['./contains/system/mall/merchandise/merchandise.vue'], () => {
                            resolve(require('./contains/system/mall/merchandise/merchandise.vue'));
                        });
                    },
                    meta: { permission: 3100}
                },{
                    path: 'merchandise/merchandiseInfo',
                    component(resolve) {
                        require.ensure(['./contains/system/mall/merchandise/merchandise/merchandiseInfo.vue'], () => {
                            resolve(require('./contains/system/mall/merchandise/merchandise/merchandiseInfo.vue'));
                        });
                    },
                    meta: { permission: 3100}
                },{
                    path: 'merchandise/editMerchandise',
                    component(resolve) {
                        require.ensure(['./contains/system/mall/merchandise/merchandise/editMerchandise.vue'], () => {
                            resolve(require('./contains/system/mall/merchandise/merchandise/editMerchandise.vue'));
                        });
                    },
                    meta: { permission: 3100}
                },{
                    path: 'merchandise/addMerchandise',
                    component(resolve) {
                        require.ensure(['./contains/system/mall/merchandise/merchandise/addMerchandise.vue'], () => {
                            resolve(require('./contains/system/mall/merchandise/merchandise/addMerchandise.vue'));
                        });
                    },
                    meta: { permission: 3101}
                }
            ]
        }, 
        // 商城管理 -- 优惠券管理
        {
            path: 'mall/coupon',
            component(resolve) {
                require.ensure(['./contains/system/mall/coupon.vue'], () => {
                    resolve(require('./contains/system/mall/coupon.vue'));
                });
            },
            meta: { permission: 3300}
        }, {
            path: 'mall/coupon/createCoupon',
            component(resolve) {
                require.ensure(['./contains/system/mall/coupon/createCoupon.vue'], () => {
                    resolve(require('./contains/system/mall/coupon/createCoupon.vue'));
                });
            },
            meta: { permission: 3301}
        },
        //分类管理
        {
            path: 'mall/classify',
            component(resolve) {
                require.ensure(['./contains/system/mall/classify.vue'], () => {
                    resolve(require('./contains/system/mall/classify.vue'));
                });
            },
            meta: { permission: 3400}
        },
        // 商城管理 -- 订单管理
        {
            path: 'mall/order',
            component(resolve) {
                require.ensure(['./contains/system/mall/order.vue'], () => {
                    resolve(require('./contains/system/mall/order.vue'));
                });
            },
            meta: { permission: 3200}
        },
        // 管理员管理
        // 管理员管理 -- 管理员管理
        {
            path: 'manager/manager',
            component(resolve) {
                require.ensure(['./contains/system/manager/manager.vue'], () => {
                    resolve(require('./contains/system/manager/manager.vue'));
                });
            },
            meta: { permission: 300}
        },{
            path: 'manager/manager/managerInfo',
            component(resolve) {
                require.ensure(['./contains/system/manager/manager/managerInfo.vue'], () => {
                    resolve(require('./contains/system/manager/manager/managerInfo.vue'));
                });
            },
            meta: { permission: 300}
        },{
            path: 'manager/manager/addManager',
            component(resolve) {
                require.ensure(['./contains/system/manager/manager/addManager.vue'], () => {
                    resolve(require('./contains/system/manager/manager/addManager.vue'));
                });
            },
            meta: { permission: 301}
        },{
            path: 'manager/manager/editManager',
            component(resolve) {
                require.ensure(['./contains/system/manager/manager/editManager.vue'], () => {
                    resolve(require('./contains/system/manager/manager/editManager.vue'));
                });
            },
            meta: { permission: 302}
        },{
            path: 'manager/manager/editManagerDepartment',
            component(resolve) {
                require.ensure(['./contains/system/manager/manager/editManagerDepartment.vue'], () => {
                    resolve(require('./contains/system/manager/manager/editManagerDepartment.vue'));
                });
            },
            meta: { permission: 304}
        },
         // 管理员管理 --次级管理员管理
         {
            path: '/manageSystem/system/submanager/submanagerInfo',
            component(resolve) {
                require.ensure(['./contains/system/submanager/submanagerInfo.vue'], () => {
                    resolve(require('./contains/system/submanager/submanagerInfo.vue'));
                });
            },
            meta: { permission: 300}
        },{
            path: '/manageSystem/system/submanager/addSubManager',
            component(resolve) {
                require.ensure(['./contains/system/submanager/addSubManager.vue'], () => {
                    resolve(require('./contains/system/submanager/addSubManager.vue'));
                });
            },
            meta: { permission: 301}
        },{
            path: '/manageSystem/system/submanager/editSubManager',
            component(resolve) {
                require.ensure(['./contains/system/submanager/editSubManager.vue'], () => {
                    resolve(require('./contains/system/submanager/editSubManager.vue'));
                });
            },
            meta: { permission: 302}
        },
        // 管理员管理 -- 操作日志
        {
            path: 'manager/logs',
            component(resolve) {
                require.ensure(['./contains/system/manager/logs.vue'], () => {
                    resolve(require('./contains/system/manager/logs.vue'));
                });
            },
            meta: { permission: -1}
        }, 
        // 管理员管理 -- 大楼管理
        {
            path: 'manager/building',
            component(resolve) {
                require.ensure(['./contains/system/manager/building.vue'], () => {
                    resolve(require('./contains/system/manager/building.vue'));
                });
            },
            meta: { permission: 400}
        }, 
        // 管理员管理 -- 部门管理
        {
            path: 'manager/department',
            component(resolve) {
                require.ensure(['./contains/system/manager/department.vue'], () => {
                    resolve(require('./contains/system/manager/department.vue'));
                });
            },
            meta: { permission: 200}
        }, {
            path: 'manager/department/addDepartment',
            component(resolve) {
                require.ensure(['./contains/system/manager/department/addDepartment.vue'], () => {
                    resolve(require('./contains/system/manager/department/addDepartment.vue'));
                });
            },
            meta: { permission: 201}
        }, {
            path: 'manager/department/editDepartment',
            component(resolve) {
                require.ensure(['./contains/system/manager/department/editDepartment.vue'], () => {
                    resolve(require('./contains/system/manager/department/editDepartment.vue'));
                });
            },
            meta: { permission: 202}
        }, 
        // 系统管理
        // 系统管理 -- 异常日志
        {
            path: 'system/exception',
            component(resolve) {
                require.ensure(['./contains/system/system/exception.vue'], () => {
                    resolve(require('./contains/system/system/exception.vue'));
                });
            },
            meta: { permission: -1}
        }, 
        // 系统管理 -- 接口日志
        {
            path: 'system/access',
            component(resolve) {
                require.ensure(['./contains/system/system/access.vue'], () => {
                    resolve(require('./contains/system/system/access.vue'));
                });
            },
            meta: { permission: -1}
        }, 
        // 系统管理 -- 短信管理
        {
            path: 'system/sms',
            component(resolve) {
                require.ensure(['./contains/system/system/sms.vue'], () => {
                    resolve(require('./contains/system/system/sms.vue'));
                });
            },
            meta: { permission: -1}
        }, 
        // 系统管理 -- 园区管理
        {
            path: 'system/park',
            component(resolve) {
                require.ensure(['./contains/system/system/park.vue'], () => {
                    resolve(require('./contains/system/system/park.vue'));
                });
            },
            meta: { permission: -1}
        },
        // 系统管理 -- 次级管理员
        {
            path: 'system/submanager',
            component(resolve) {
                require.ensure(['./contains/system/submanager/index.vue'], () => {
                    resolve(require('./contains/system/submanager/index.vue'));
                });
            },
            meta: { permission: -2}
        },
        // 用户管理
        // 用户管理 -- 操作日志
        {
            path: 'user/operationLogs',
            component(resolve) {
                require.ensure(['./contains/system/user/operationLogs.vue'], () => {
                    resolve(require('./contains/system/user/operationLogs.vue'));
                });
            },
            meta: { permission: 100}
        }, 
        // 用户管理 -- 活跃用户
        {
            path: 'user/activityUser',
            component(resolve) {
                require.ensure(['./contains/system/user/activityUser.vue'], () => {
                    resolve(require('./contains/system/user/activityUser.vue'));
                });
            },
            meta: { permission: -1}
        },
        // 用户管理 -- 用户统计
        {
            path: 'user/userStatistics',
            component(resolve) {
                require.ensure(['./contains/system/user/userStatistics.vue'], () => {
                    resolve(require('./contains/system/user/userStatistics.vue'));
                });
            },
            meta: { permission: -1}
        },
        // 用户管理 -- 功能使用统计
        {
            path: 'user/functionStatistics',
            component(resolve) {
                require.ensure(['./contains/system/user/functionStatistics.vue'], () => {
                    resolve(require('./contains/system/user/functionStatistics.vue'));
                });
            },
            meta: { permission: -1}
        },
        // 意见反馈
        {
            path: 'feedback',
            component(resolve) {
                require.ensure(['./contains/system/feedback.vue'], () => {
                    resolve(require('./contains/system/feedback.vue'));
                });
            },
            meta: { permission: -1}
        },
        {
            path: 'feedback/details',
            name: 'index',
            component(resolve) {
                require.ensure(['./contains/system/feedback/details.vue'], () => {
                    resolve(require('./contains/system/feedback/details.vue'));
                });
            },
            meta: { permission: -1}
        },
        // 活动脚本
        {
            path: 'activity/index',
            name: 'index',
            component(resolve) {
                require.ensure(['./contains/system/activity/index.vue'], () => {
                    resolve(require('./contains/system/activity/index.vue'));
                });
            },
            meta: { permission: 100}
        },
        {
            path: 'activity/goldactive',
            name: 'goldactive',
            component(resolve) {
                require.ensure(['./contains/system/activity/goldactive.vue'], () => {
                    resolve(require('./contains/system/activity/goldactive.vue'));
                });
            },
            meta: { permission: 100}
        }
    ]
    },{
        path: '/manageSystem/login',
        component(resolve) {
            require.ensure(['./contains/login.vue'], () => {
                resolve(require('./contains/login.vue'));
            });
        }
    },{
        path: '*',
        redirect: '/manageSystem/'
    }
];

export default routers;