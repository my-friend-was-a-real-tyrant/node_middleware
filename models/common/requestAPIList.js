const env = process.env.NODE_ENV;
const baseUrl = env === 'development' ? 'http://192.168.100.49' : 'http://127.0.0.1';
// const baseUrl = env === 'development' ? 'http://system-test.zhongdapuhui.com' : 'http://127.0.0.1';
//  const baseUrl ='http://192.168.100.49' ;

const admin = {
    baseUrl,
    port: env === 'production' ? '16600' :
        env === 'test' ? '16500' : '16100'
};
const sms = {
    baseUrl,
    port: env === 'production' ? '16610' :
        env === 'test' ? '16510' : '16110'
};
const property = {
    baseUrl,
    port: env === 'production' ? '16620' :
        env === 'test' ? '16520' : '16120'
};
const basic = {
    baseUrl,
    port: env === 'production' ? '16630' :
        env === 'test' ? '16530' : '16130'
};
const mall = {
    baseUrl,
    port: env === 'production' ? '16650' :
        env === 'test' ? '16550' : '16150'
};

module.exports = {
    '11': {
        description: 'System Region',
        '1101': {
            baseUrl: basic.baseUrl,
            port: basic.port,
            description: '省列表',
            path: '/v1/provinces',
            method: 'get'
        },
        '1102': {
            baseUrl: basic.baseUrl,
            port: basic.port,
            description: '市列表',
            path: '/v1/provinces/{id}/cities',
            method: 'get'
        },
        '1103': {
            baseUrl: basic.baseUrl,
            port: basic.port,
            description: '区（县）列表',
            path: '/v1/cities/{id}/districts',
            method: 'get'
        }
    },
    '12': {
        description: 'System File',
        '1201': {
            baseUrl: basic.baseUrl,
            port: basic.port,
            description: '异常日志',
            path: '/manage/v1/exception-logs',
            method: 'get'
        },
        '1211': {
            baseUrl: basic.baseUrl,
            port: basic.port,
            description: '接口日志',
            path: '/manage/v1/access-logs',
            method: 'get'
        }
    },
    '13': {
        description: 'Admin Account',
        '1301': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '登录',
            path: '/manage/v1/login',
            method: 'post'
        },
        '1302': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '编辑',
            path: '/manage/v1/account/{operation}',
            method: 'patch'
        },
        '1321': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '获取园区权限',
            path: '/manage/v1/account/permissions',
            method: 'get'
        },
        '1322': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '获取用户部门职位',
            path: 'manage/v1/account/info/index',
            method: 'get'
        }
    },
    '14': {
        description: '管理员管理',
        '1401': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '创建管理员',
            path: '/manage/v1/accounts',
            method: 'post'
        },
        '1402': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '获取管理员列表',
            path: '/manage/v1/accounts',
            method: 'get'
        },
        '1403': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '查看管理员详情',
            path: '/manage/v1/accounts/{id}',
            method: 'get'
        },
        '1404': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '编辑管理员',
            path: '/manage/v1/accounts/{id}/{operation}',
            method: 'patch'
        },
        '1405': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '分配部门',
            path: '/manage/v1/accounts/{managerId}/department',
            method: 'post'
        },
        '1406': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '设为园区经理',
            path: '/manage/v1/accounts/{managerId}/park-manager',
            method: 'post'
        },
        '1407': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '移出部门',
            path: '/manage/v1/accounts/eip/{id}',
            method: 'delete'
        },
        '1408': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '简单部门列表',
            path: '/manage/v1/accounts/simple',
            method: 'get'
        },
        '1411': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '查看管理员操作日志',
            path: '/manage/v1/account-logs',
            method: 'get'
        }
    },
    '15': {
        description: 'System User',
        '1501': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '获取基本信息/openid是否绑定手机号',
            path: '/user/v1/simple',
            method: 'get'
        },
        '1506': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '编辑个人信息',
            path: '/user/v1/modify',
            method: 'patch'
        },
        '1507': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '意见反馈',
            path: '/user/v1/advice',
            method: 'post'
        },
        '1512': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '发送验证码',
            path: '/user/v1/auth-code',
            method: 'post'
        },
        '1513': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '注册与登录',
            path: '/user/v1/login',
            method: 'post'
        }
    },
    '16': {
        description: 'User Manage',
        '1611': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '获取用户操作日志',
            path: '/user/v1/logs',
            method: 'get'
        },
        '1612': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '获取活跃用户数据',
            path: '/manage/v1/logs/statistic',
            method: 'get'
        },
        '1613': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '获取用户统计数据',
            path: '/manage/v1/statistics/newuser',
            method: 'get'
        },
        '1614': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '记录用户登录',
            path: '/manage/v1/user/login',
            method: 'post'
        },
        '1615': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '意见反馈详情',
            path: '/manage/v1/advices/{adviceId}',
            method: 'get'
        },
        '1616': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '意见反馈列表',
            path: '/manage/v1/advices',
            method: 'get'
        }
    },
    '18': {
        description: 'System File',
        '1801': {
            baseUrl: sms.baseUrl,
            port: sms.port,
            description: '短信列表',
            path: '/manage/v1/sms',
            method: 'get'
        },
        '1821': {
            baseUrl: sms.baseUrl,
            port: sms.port,
            description: 'App推送列表',
            path: '/v1/app-push',
            method: 'get'
        },
        '1823': {
            baseUrl: sms.baseUrl,
            port: sms.port,
            description: 'App消息处理',
            path: '/v1/app-push/{operation}',
            method: 'patch'
        }
    },
    '19': {
        description: 'System File',
        '1901': {
            // baseUrl: 'http://system.zhongdapuhui.com',
            // port: basicPort,
            // port: '80',
            description: '文件上传',
            path: '/v1/file',
            method: 'post'
        }
    },
    '21': {
        description: 'Property Room',
        '2101': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '选择园区列表',
            path: '/v1/parks',
            method: 'get'
        },
        '2102': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '选择楼房列表',
            path: '/v1/parks/{id}/buildings',
            method: 'get'
        },
        '2103': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '选择房间列表',
            path: '/v1/buildings/{code}/rooms',
            method: 'get'
        }
    },
    '22': {
        description: 'System Park Manage',
        '2201': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '新建园区',
            path: '/manage/v1/parks',
            method: 'post'
        },
        '2202': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '园区列表',
            path: '/manage/v1/parks',
            method: 'get'
        },
        '2211': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '导入房屋',
            path: '/manage/v1/room-file',
            method: 'post'
        },
        '2212': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '房屋列表',
            path: '/manage/v1/parks/{parkId}/rooms',
            method: 'get'
        },
        '2214': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '房屋列表',
            path: '/manage/v1/roomsmodify/{roomId}',
            method: 'patch'
        },
        '2221': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '大楼列表',
            path: '/manage/v1/buildings',
            method: 'get'
        },
        '2222': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '编辑大楼',
            path: 'manage/v1/buildings/{buildingId}/{operation}',
            method: 'patch'
        }
    },
    '23': {
        description: 'Property Proprietor',
        '2301': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '提交认证',
            path: '/user/v1/proprietors',
            method: 'post'
        },
        '2302': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取成员列表',
            path: '/user/v1/rooms/{id}',
            method: 'get'
        },
        '2303': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '审核家庭成员',
            path: '/user/v1/proprietors/{id}/{operation}',
            method: 'patch'
        },
        '2307': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取房屋列表',
            path: '/user/v1/rooms',
            method: 'get'
        },
        '2308': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '查看成员信息',
            path: '/user/v1/proprietors/{id}',
            method: 'get'
        },
        '2310': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '设为默认房屋',
            path: '/user/v1/rooms/{id}',
            method: 'patch'
        },
        '2311': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取默认房屋（用户基本信息）',
            path: '/user/v1/default-room',
            method: 'get'
        },
        '2313': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '审批／拒绝家庭成员',
            path: '/user/v1/proprietor-records/{id}/{operation}',
            method: 'patch'
        },
        '2314': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '邀请家庭成员',
            path: '/user/v1/proprietor-records/inviteProprietor',
            method: 'post'
        },
        '2315': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '我有邀请码',
            path: '/user/v1/proprietor-records/judgeInvite',
            method: 'post'
        }
    },
    '24': {
        // 缴费管理
        '2401': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '物业费列表',
            path: '/manage/v1/propertyParkBills',
            method: 'get'
        },
        '2402': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费列表',
            path: '/manage/v1/otherParkBills',
            method: 'get'
        },
        '2403': {
            baseUrl: property.baseUrl,
            port: admin.port,
            description: '支付规则初始化',
            path: '/manger/payment/payRule',
            method: 'get'
        },
        '2404': {
            baseUrl: property.baseUrl,
            port: admin.port,
            description: '支付规则保存',
            path: '/manger/payment/save',
            method: 'post'
        },
        '2405': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '物业费明细',
            path: '/manage/v1/propertyRoomBills',
            method: 'get'
        },
        '2406': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费明细',
            path: '/manage/v1/otherRoomBills',
            method: 'get'
        },
        '2407': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '物业费明细编辑',
            path: '/manage/v1/bill/property/modify',
            method: 'patch'
        },
        '2408': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费明细编辑',
            path: 'manage/v1/bill/other/modify',
            method: 'patch'
        },
        '2409': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费明细预存金额编辑',
            path: '/manger/payment/save',
            method: 'post'
        },
        '2411': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '导入物业列表',
            path: '/manage/v1/property-bill-file',
            method: 'post'
        },
        '2412': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '导入水电费列表',
            path: '/manage/v1/other-bill-file',
            method: 'post'
        },
        '2413': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '下载模板',
            path: '/manage/v1/downFile/{templateId}',
            method: 'post'
        },
        '2414': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '物业费导出全部',
            path: '/manage/v1/propertyParkExcel/{year}',
            method: 'post'
        },
        '2415': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费导出全部',
            path: '/manage/v1/otherParkExcel/{year}',
            method: 'post'
        },
        '2416': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '物业费导出单条',
            path: '/manage/v1/propertyRoomExcel/{year}',
            method: 'post'
        },
        '2417': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费导出单条',
            path: '/manage/v1/otherRoomExcel/{year}',
            method: 'post'
        },
        '2418': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费预存金额',
            path: '/manage/v1/bill/other/roomPreStorage',
            method: 'get'
        },
        '2419': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '水费预存金额编辑',
            path: '/manage/v1/bill/roomPreStorage/modify',
            method: 'patch'
        },
        
        
        
        '2420': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '用户物业费列表',
            path: 'user/v1/propertyRoomBills',
            method: 'get'
        },
        '2421': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '用户水电费列表',
            path: 'user/v1/otherRoomBills',
            method: 'get'
        },
        '2422': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '创建缴费订单',
            path: 'user/v1/bill/order/{roomId}',
            method: 'post'
        },
        '2423': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '缴费支付',
            path: 'user/v1/bills/{id}/pay',
            method: 'post'
        },
    },
    '25': {
        description: 'Property Repair',
        '2501': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '发起报修',
            path: '/user/v1/repairs',
            method: 'post'
        },
        '2502': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取报修列表',
            path: '/user/v1/repairs',
            method: 'get'
        },
        '2503': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取报修详情',
            path: '/user/v1/repairs/{id}',
            method: 'get'
        },
        '2504': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '用户发表报修评价',
            path: '/user/v1/repairs/{id}',
            method: 'patch'
        }
    },
    '26': {
        description: 'Property Repair Manage',
        '2601': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取报修列表',
            path: '/manage/v1/repairs',
            method: 'get'
        },
        '2602': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取报修详情',
            path: '/manage/v1/repairs/{id}',
            method: 'get'
        },
        '2603': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '修改报修',
            path: '/manage/v1/repairs/{id}/{operation}',
            method: 'patch'
        },
        '2611': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取首页报修数量',
            path: '/manage/v1/repairs/index',
            method: 'get'
        },
        '2612': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取首页报修满意度',
            path: '/manage/v1/repairs/csr/index',
            method: 'get'
        },
        '2613': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取功能使用量',
            path: '/manage/v1/pie/index',
            method: 'get'
        },
        '2614': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取报修功能图表数据',
            path: '/manage/v1/statistics/repairs/linechart',
            method: 'get'
        },
        '2615': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取保修功能使用数据',
            path: '/manage/v1/statistics/repairs/count',
            method: 'get'
        }
    },
    '27': {
        description: '投诉与表扬',
        '2701': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '创建',
            path: '/user/v1/complaints',
            method: 'post'
        },
        '2702': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '列表',
            path: '/user/v1/complaints',
            method: 'get'
        },
        '2703': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '详情',
            path: '/user/v1/complaints/{id}',
            method: 'get'
        },
        '2704': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '删除',
            path: '/user/v1/complaints/{id}',
            method: 'delete'
        }
    },
    '28': {
        description: '投诉表扬管理',
        '2801': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '列表',
            path: '/manage/v1/complaints',
            method: 'get'
        },
        '2802': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '详情',
            path: '/manage/v1/complaints/{id}',
            method: 'get'
        },
        '2803': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '删除',
            path: '/manage/v1/complaints/{id}',
            method: 'delete'
        },
        '2804': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '处理',
            path: '/manage/v1/complaints/{id}/{operation}',
            method: 'patch'
        },
        '2805': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '转报事',
            path: '/manage/v1/complaints/{id}/reports',
            method: 'post'
        },
        '2806': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '投诉表扬图表数据',
            path: '/manage/v1/statistics/complaints/linechart',
            method: 'get'
        },
        '2807': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取表扬投诉功能使用数据',
            path: '/manage/v1/statistics/complaints/count',
            method: 'get'
        },
        '2811': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取指派给我的投诉数量',
            path: '/manage/v1/complaints/index',
            method: 'get'
        }
    },
    '29': {
        description: '园区活动',
        '2901': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '报名活动',
            path: '/user/v1/activities/{id}/apply',
            method: 'post'
        },
        '2904': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '活动列表',
            path: '/user/v1/activities',
            method: 'get'
        },
        '2905': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '已报名的活动列表',
            path: '/user/v1/activities/{parkId}/user',
            method: 'get'
        },
        '2906': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '取消报名',
            path: '/user/v1/applies/{id}',
            method: 'patch'
        },
        '2907': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '活动详情',
            path: '/user/v1/activities/{activityId}',
            method: 'get'
        }
    },
    '30': {
        description: '园区活动管理',
        '3001': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '添加活动',
            path: '/manage/v1/activities',
            method: 'post'
        },
        '3002': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '修改活动',
            path: '/manage/v1/activities/{id}',
            method: 'patch'
        },
        '3003': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '活动列表',
            path: '/manage/v1/activities',
            method: 'get'
        },
        '3004': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '活动详情',
            path: '/manage/v1/activities/{id}',
            method: 'get'
        },
        '3005': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '导出活动报名列表',
            path: '/manage/v1/activities/{id}/export',
            method: 'get'
        },
        '3006': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '活动的报名列表',
            path: '/manage/v1/activities/{id}/applies',
            method: 'get'
        },
        '3007': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '活动图表数据',
            path: '/manage/v1/statistics/activities/linechart',
            method: 'get'
        },
        '3008': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '活动试用数据',
            path: '/manage/v1/statistics/activities/count',
            method: 'get'
        }
    },
    '31': {
        description: 'Mall Address',
        '3101': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '用户添加收货地址',
            path: '/user/v1/addresses',
            method: 'post'
        },
        '3102': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '获取收货地址列表',
            path: '/user/v1/addresses',
            method: 'get'
        },
        '3103': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '获取收货地址详情',
            path: '/user/v1/addresses/{id}',
            method: 'get'
        },
        '3104': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '编辑收货地址',
            path: '/user/v1/addresses/{id}',
            method: 'patch'
        },
        '3105': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '删除收货地址',
            path: '/user/v1/addresses/{id}',
            method: 'delete'
        },
        '3106': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '设为默认收货地址',
            path: '/user/v1/addresses/{id}/default',
            method: 'patch'
        }
    },
    '33': {
        description: '商品',
        '3301': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '商品列表',
            path: '/user/v1/merchandises',
            method: 'get'
        },
        '3302': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '商品详情',
            path: '/user/v1/merchandises/{merchandiseId}',
            method: 'get'
        },
        '3303': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '团购详情',
            path: '/user/v1/merchandisesGroup/{groupId}',
            method: 'get'
        },
        '3304': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '拼团商品详情',
            path: '/user/v1/merchandises/{merchandiseId}/reference',
            method: 'get'
        },
        '3305': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '拼团列表',
            path: '/user/v1/merchandisesGroup/spell',
            method: 'get'
        },
        '3306': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '推荐商品列表',
            path: '/user/v1/merchandises/reference',
            method: 'get'
        }
        
    },
    '34': {
        description: '商品管理',
        '3401': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '创建',
            path: '/manage/v1/merchandises',
            method: 'post'
        },
        '3402': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '列表',
            path: '/manage/v1/merchandises',
            method: 'get'
        },
        '3403': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '详情',
            path: '/manage/v1/merchandises/{id}',
            method: 'get'
        },
        '3404': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '编辑',
            path: '/manage/v1/merchandises/{id}',
            method: 'patch'
        },
        // '3411': {
        //     description: '类别列表',
        //     path: '/manage/mall/{accountId}/v1/merchandise-types',
        //     method: 'get'
        // },
        '3421': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '创建团购',
            path: '/manage/v1/merchandises/{merchandiseId}/groups',
            method: 'post'
        },
        '3422': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '团购历史列表',
            path: '/manage/v1/merchandises/{merchandiseId}/groups',
            method: 'get'
        },
        '3423': {
            description: '团购详情',
            path: '/manage/mall/{accountId}/v1/groups/{id}',
            method: 'get'
        },
        '3424': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '编辑团购',
            path: '/manage/v1/groups/{groupId}',
            method: 'patch'
        },
        '3425': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '设置拼团',
            path: '/manage/v1/merchandise/{merchandiseId}/spell',
            method: 'patch'
        },
        '3426': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '单买分页列表',
            path: 'manage/v1/merchandisesGroups/single-list',            
            method: 'get'
        },
        '3427': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '拼团分页列表',
            path: '/manage/v1/merchandisesGroups/spell-list',
            method: 'get'
        },
        '3428': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '拼团详情',
            path: '/manage/v1/merchandiseSpellDetails',
            method: 'get'
        },
        '3429': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '强制成团',
            path: '/manage/v1/merchandiseGroup/spell-compel',
            method: 'patch'
        },
        '3430': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '上/下架商品',
            path: '/manage/v1/merchandises/{merchandiseId}/up-down',
            method: 'patch'
        },
        '3431': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: ' 获取统计',
            path: '/manage/v1/merchandises/census',
            method: 'get'
        },
        '3432': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: ' 取消拼团',
            path: '/manage/v1/merchandise/{merchandiseId}/spell-cancel',
            method: 'patch'
        }

        
    },
    '35': {
        description: '订单',
        '3501': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '创建订单',
            path: '/user/v1/orders',
            method: 'post'
        },
        '3502': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '订单列表',
            path: '/user/v1/orders',
            method: 'get'
        },
        '3503': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '订单详情',
            path: '/user/v1/orders/{orderId}',
            method: 'get'
        },
        '3504': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '订单编辑',
            path: '/user/v1/orders/{orderId}/{operation}',
            method: 'patch'
        },
        '3505': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '创建拼团订单',
            path: '/user/v1/orders/spell',
            method: 'post'
        },
        '3506': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '创建单买订单',
            path: '/user/v1/merchandises/single',
            method: 'post'
        },
        
        
        
        '3511': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '支付订单',
            path: '/user/v1/orders/{id}/pay',
            method: 'post'
        },
        '3512': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '一网通支付订单',
            path: '/user/v1/orders/{id}/pay-cmb',
            method: 'post'
        }
    },
    '36': {
        description: '订单管理',
        '3601': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '订单列表',
            path: '/manage/v1/orders',
            method: 'get'
        },
        '3611': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '导出订单',
            path: '/manage/v1/groups/{groupId}/orders',
            method: 'get'
        },
        '3612': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '导入订单',
            path: '/manage/v1/orders/express-info',
            method: 'post'
        },
        '3613': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '导出单买订单',
            path: '/manage/v1/merchandiseSingles/{singleId}/orders',
            method: 'get'
        }
        
    },
    '37': {
        description: '优惠券',
        '3701': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '可领列表',
            path: '/user/v1/center-coupons',
            method: 'get'
        },
        '3702': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '已领列表',
            path: '/user/v1/coupons',
            method: 'get'
        },
        '3703': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '领取优惠券',
            path: '/user/v1/coupons/{batchId}',
            method: 'patch'
        },
        '3704': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '可用优惠券列表',
            path: '/user/v1/available-coupons',
            method: 'get'
        }
    },
    '38': {
        description: '优惠券管理',
        '3801': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '创建',
            path: '/manage/v1/coupons',
            method: 'post'
        },
        '3802': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '列表',
            path: '/manage/v1/coupons',
            method: 'get'
        },
        '3803': {
            baseUrl: mall.baseUrl,
            port: mall.port,
            description: '删除',
            path: '/manage/v1/coupons/{id}',
            method: 'delete'
        }
    },
    '61': {
        description: '社区公告',
        '6101': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '查看社区公告列表',
            path: '/user/v1/notices',
            method: 'get'
        },
        '6102': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '查看社区公告详情',
            path: '/user/v1/notices/{announcementId}',
            method: 'get'
        }
    },
    '62': {
        description: '社区公告管理',
        '6201': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '添加活动',
            path: '/manage/v1/notices',
            method: 'post'
        },
        '6202': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '公告列表',
            path: '/manage/v1/notices',
            method: 'get'
        },
        '6203': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '公告详情',
            path: '/manage/v1/notices/{id}',
            method: 'get'
        },
        '6204': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '编辑公告',
            path: '/manage/v1/notices/{id}',
            method: 'patch'
        },
        '6205': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '删除公告',
            path: '/manage/v1/notices/{id}',
            method: 'delete'
        }
    },
    '63': {
        description: '咨询建议',
        '6301': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '新建咨询建议',
            path: '/user/v1/consults',
            method: 'post'
        },
        '6302': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '咨询建议列表',
            path: '/user/v1/consults',
            method: 'get'
        },
        '6303': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '咨询建议详情',
            path: '/user/v1/consults/{id}',
            method: 'get'
        }
    },
    '64': {
        description: '咨询建议管理',
        '6401': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '咨询建议列表',
            path: '/manage/v1/consults',
            method: 'get'
        },
        '6402': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '咨询建议详情',
            path: '/manage/v1/consults/{id}',
            method: 'get'
        },
        '6403': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '咨询建议处理',
            path: '/manage/v1/consults/{id}',
            method: 'patch'
        },
        '6404': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '咨询建议图表',
            path: '/manage/v1/statistics/consults/linechart',
            method: 'get'
        },
        '6405': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '获取咨询建议数据',
            path: '/manage/v1/statistics/consults/count',
            method: 'get'
        }
    },
    '65': {
        description: '园区报事',
        '6501': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '新建报事',
            path: '/user/v1/reports',
            method: 'post'
        },
        '6502': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '用户查看报事列表',
            path: '/user/v1/reports',
            method: 'get'
        },
        '6503': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '用户查看报事详情',
            path: '/user/v1/reports/{id}',
            method: 'get'
        }
    },
    '66': {
        description: '报事管理',
        '6601': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '报事列表',
            path: '/manage/v1/reports',
            method: 'get'
        },
        '6602': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '报事详情',
            path: '/manage/v1/reports/{id}',
            method: 'get'
        },
        '6603': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '处理报事',
            path: '/manage/v1/reports/{id}',
            method: 'patch'
        },
        '6604': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '报事功能图表数据',
            path: '/manage/v1/statistics/reports/linechart',
            method: 'get'
        },
        '6605': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '报事功能数据统计',
            path: '/manage/v1/statistics/reports/count',
            method: 'get'
        },
        '6611': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '查询首页报事数量',
            path: '/manage/v1/reports/index',
            method: 'get'
        }
    },
    '67': {
        description: '常用电话',
        '6701': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '常用电话',
            path: '/user/v1/contacts',
            method: 'get'
        }
    },
    '68': {
        description: '常用电话管理',
        '6802': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '常用电话列表',
            path: '/manage/v1/contacts',
            method: 'get'
        },
        '6805': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '常用电话组添加',
            path: '/manage/v1/contactGroups',
            method: 'post'
        },
        '6806': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '常用电话组名修改',
            path: '/manage/v1/contactGroups/{id}',
            method: 'patch'
        },
        '6807': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '删除常用电话组',
            path: '/manage/v1/contactGroups/{id}',
            method: 'delete'
        },
        '6808': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '批量增加组中联系人',
            path: '/manage/v1/contacts/multiple',
            method: 'post'
        },
        '6809': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '批量编辑组中联系人',
            path: '/manage/v1/contacts/multiple',
            method: 'patch'
        },
        '6810': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '批量删除组中联系人',
            path: '/manage/v1/contacts/multiple',
            method: 'delete'
        },
        '6811': {
            baseUrl: property.baseUrl,
            port: property.port,
            description: '查看分组详情',
            path: '/manage/v1/contactGroups/{id}',
            method: 'get'
        }
    },
    '92': {
        description: '部门管理',
        '9201': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '添加部门',
            path: '/manage/v1/departments',
            method: 'post'
        },
        '9202': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '简单部门列表',
            path: '/manage/v1/departments/simple',
            method: 'get'
        },
        '9203': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '部门列表',
            path: '/manage/v1/departments',
            method: 'get'
        },
        '9204': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '部门详情',
            path: '/manage/v1/departments/{id}',
            method: 'get'
        },
        '9205': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '部门删除',
            path: '/manage/v1/departments/{id}',
            method: 'delete'
        },
        '9206': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '部门编辑',
            path: '/manage/v1/departments/{id}',
            method: 'patch'
        }
    },
    '94': {
        description: '权限管理',
        '9401': {
            baseUrl: admin.baseUrl,
            port: admin.port,
            description: '权限列表',
            path: '/manage/v1.1/permissions',
            method: 'get'
        }
    }
}