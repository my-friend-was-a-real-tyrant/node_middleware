const baseController = require('../common/ResDataFormat');
const dateTransition = require('../common/dateTransition');
const exception = require('../common/requestModule');
const priceTransform = require('../common/money');
const { serverHostname } = require('../common/constant');
const mallModel = require('../../models/MallModel');

const url = require('url');

class MallController {
    
    
    /**
     * @api {GET} /api/mall/mall/getGoodsList 获取商品详情
     * @apiName get merchandise list
     * @apiGroup Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取商品详情
     *
     
     * 
     *
     */
//    static async getGoodsList(ctx) {
//        let returnData = baseController.getSuccess();
//        const params = url.parse(ctx.request.url, true).query;  
//        console.log( ctx.request.url );
//        console.log( params );     
//        await exception({
//            returnData,
//            validator: {
//                params,
//                properties: ['id']
//            },
//            /*params: {
//                merchandiseId: params.merchandiseId                            
//            },*/            
//            method: mallModel.mallModel.getGoodsList,            
//            success(responseData) {
//               returnData.data = responseData.returnData.data;
//            }
//        });
//        ctx.body = 'returnData';
//    }
    
    
    
    static async getGoodsList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            params: {                
                id: params.id
            },
            method: mallModel.mallModel.getGoodsList,            
            success(responseData) {
               returnData.data = responseData.returnData.data;
            }
        })
        ctx.body = returnData;
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    /**
     * @api {GET} /api/mall/mall/getMerchandiseList 获取团购商品列表
     * @apiName get merchandise list
     * @apiGroup Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取团购商品列表
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} merchandiseList 团购商品列表
     * @apiSuccess (list) {int} id 团购商品ID
     * @apiSuccess (list) {int} groupId 团购ID
     * @apiSuccess (list) {string} description 描述
     * @apiSuccess (list) {string} name 商品名
     * @apiSuccess (list) {string} price 商品价格
     * @apiSuccess (list) {string} img 商品图片
     * @apiSuccess (list) {int} status 状态(1-未上架;2-团购中)
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "merchandiseList": [{
     *         "id": 1,
     *         "groupId": 1,
     *         "description": "哈哈哈",
     *         "name": "香蕉",
     *         "img": "/img/haha/abc.jpg",
     *         "price": "2.22",
     *         "status": 1,
     *     }]
     *   }
     * 
     *
     */
    static async getMerchandiseList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            method: mallModel.mallModel.getMerchandiseList,
            success(responseData) {
                const merchandiseList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].id,
                        groupId: responseData.returnData.data[i].groupId,
                        name: responseData.returnData.data[i].name,
                        description: responseData.returnData.data[i].description.length > 25 
                            ? responseData.returnData.data[i].description.slice(0, 25)
                            : responseData.returnData.data[i].description,
                        price: responseData.returnData.data[i].groupPrice,
                        img: serverHostname + responseData.returnData.data[i].picture,
                        status: responseData.returnData.data[i].groupStatus
                    };
                    merchandiseList.push(temp);
                }
                returnData.merchandiseList = merchandiseList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/mall/mall/getMerchandiseInfo  团购商品详情
     * @apiName get merchandise info
     * @apiGroup Mall
     * @apiVersion 1.0.0
     * @apiDescription  团购商品详情
     * 
     * @apiParam {int} id 商品ID
     * @apiParam {int} groupId 团购ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/mall/getMerchandiseInfo
     *   {
     *     "id": 1,
     *     "groupId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} info 商品详情
     * @apiSuccess (info) {string} name 商品名称
     * @apiSuccess (info) {string} description 商品描述
     * @apiSuccess (info) {string} content 商品分量
     * @apiSuccess (info) {object} originPrice 原价
     * @apiSuccess (info) {object} groupPrice 团购价
     * @apiSuccess (info) {object} countDown 倒计时
     * @apiSuccess (info) {array} imgList 图片列表
     * @apiSuccess (info) {int} maxCount 最大数量
     * @apiSuccess (info) {int} saleCount 已团数量
     * @apiSuccess (info) {string} detail 详情图片
     * @apiSuccess (info) {int} status 状态(1-未上架;2-团购中)
     * @apiSuccess (countDown) {int} day 倒计时天
     * @apiSuccess (countDown) {int} hour 倒计时小时
     * @apiSuccess (countDown) {int} minute 倒计时分钟
     * @apiSuccess (countDown) {int} second 倒计时秒     
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "info": {
     *         "name": "香蕉",
     *         "description": "哈哈哈",
     *         "content": "500g",
     *         "originPrice": {
     *             "price": 10,
     *             "integer": "10",
     *             "decimal": "00"
     *         },
     *         "groupPrice": {
     *             "price": 9.8,
     *             "integer": "9",
     *             "decimal": "80"
     *         },
     *         "countDown": {
     *             "day": 0,
     *             "hour": 1,
     *             "minute": 2,
     *             "second": 3
     *         },
     *         "imgList": [],
     *         "maxCount": 10,
     *         "saleCount": 5,
     *         "detail": "http://www.baidu.com",
     *         "status": 1, 
     *     }
     *   }
     * 
     *
     */
    static async getMerchandiseInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['id', 'groupId']
            },
            method: mallModel.mallModel.getMerchandiseInfo,
            params: {
                id: params.id,
                groupId: params.groupId
            },
            success(responseData) {
                const info = {
                    //groupStatus:responseData.returnData.data.groupStatus,
                    name: responseData.returnData.data.name,
                    description: responseData.returnData.data.description,
                    content: responseData.returnData.data.content,
                    originPrice: priceTransform(responseData.returnData.data.price),
                    groupPrice: priceTransform(responseData.returnData.data.groupPrice),
                    countDown: {
                        day: 0,
                        hour: 0,
                        minute: 0,
                        second: 0
                    },
                    imgList: [],
                    maxCount: responseData.returnData.data.maxCount,
                    saleCount: responseData.returnData.data.count,
                    detail: serverHostname + responseData.returnData.data.details,
                    groupStatus: responseData.returnData.data.groupStatus,
                    status:responseData.returnData.data.status
                }
                for (let i = 0; i < responseData.returnData.data.pictures.length; i ++) {
                    info.imgList.push(serverHostname + responseData.returnData.data.pictures[i]);
                }
                let timeDifference = responseData.returnData.data.endDatetime - responseData.returnData.data.currentDatetime;
                info.countDown.day = Math.floor(timeDifference / 86400000);
                timeDifference = timeDifference - (info.countDown.day * 86400000);
                info.countDown.hour = Math.floor(timeDifference / 3600000);
                timeDifference = timeDifference - (info.countDown.hour * 3600000);
                info.countDown.minute = Math.floor(timeDifference / 60000);
                timeDifference = timeDifference - (info.countDown.minute * 60000);
                info.countDown.second = Math.floor(timeDifference / 1000);
                returnData.info = info;
            }
        });
        
        
        ctx.body = returnData;
    }

    
    
    /**
     * @api {GET}  拼团商品详情     
     * @apiGroup Mall
     * @apiVersion 1.0.0
     * @apiDescription 拼团商品详情
     * 
     * @apiParam {int} id 商品ID
     * @apiParam {int} groupId 团购ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/mall/getTogetherDetails
     *   {
     *     "id": 1,
     *     "groupId": 1
     *   }
    
     * 
     * 
     *
     */
    static async getTogetherDetails(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        console.log( params.id );
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'                
            },
            method: mallModel.mallModel.getTogetherDetails,
            params: {
                id: params.id
            },
            success(responseData) {
                console.log( responseData );
                returnData.data = responseData.returnData.data;             
            }
        });
        console.log( returnData );        
        ctx.body = returnData;
    }

    
    
    
     /**
     * @api {GET}  拼团列表     
     * @apiGroup Mall
     * @apiVersion 1.0.0
     * @apiDescription 拼团列表
     * 
     * @apiParam {int} id 商品ID
     * @apiParam {int} groupId 团购ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/mall/getTogetherTable
     *   {
     *     "id": 1
     *   }
    
     * 
     * 
     *
     */
    static async getTogetherTable(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['id']
            },
            method: mallModel.mallModel.getTogetherTable,
            params: {
                id: params.id                
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;             
            }
        });
        
        ctx.body = returnData;
    }
    
    
    
    
    
    
     /**
     * @api {GET}  推荐商品列表     
     * @apiGroup Mall
     * @apiVersion 1.0.0
     * @apiDescription 推荐商品列表
     * 
     * @apiParam {int} id 商品ID
     * @apiParam {int} groupId 团购ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/mall/getRecommendInfo
     *   {
     *     "id": 1,
     *     "groupId": 1
     *   }
    
     * 
     * 
     *
     */
    static async getRecommendInfo(ctx) {
        let returnData = baseController.getSuccess();
        await exception({
            returnData,
            method: mallModel.mallModel.getRecommendInfo,
            success(responseData) {
                returnData.data = responseData.returnData.data;             
            }
        });
        
        ctx.body = returnData;
    }
    
    
    
    
    
    
    
    
    
    
    /**
     * @api {GET} /api/mall/mall/getCouponList 获取可用优惠券列表
     * @apiName get coupon list
     * @apiGroup Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取可用优惠券列表
     * 
     * @apiParam {number} price 价格
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/mall/getCouponList
     *   {
     *     "price": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} availableList 可用优惠券列表
     * @apiSuccess (Reponse 200) {array} unavailableList 不可用优惠券列表
     * @apiSuccess (list) {number} id 优惠券ID
     * @apiSuccess (list) {number} type 优惠券种类（商城／商户／支付）
     * @apiSuccess (list) {string} merchantName 商户名
     * @apiSuccess (list) {number} preferentialType 优惠种类（打折／满减）
     * @apiSuccess (list) {number} face 券面信息
     * @apiSuccess (list) {number} maxValue 最大面额
     * @apiSuccess (list) {string} expireDatetime 过期时间
     * @apiSuccess (list) {string} couponDescription 说明
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "availableList": [{
     *         "id": 1,
     *         "type": 1,
     *         "merchantName": "重大商城",
     *         "preferentialType": 1,
     *         "face": 10,
     *         "maxValue": 10,
     *         "expireDatetime": "2017-02-02",
     *         "couponDescription": "满100减100"
     *     }],
     *     "unavailableList": []
     *   }
     *
     */
    static async getCouponList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'price'
            },
            method: mallModel.mallModel.getCouponList,
            params: {
                userId,
                price: params.price
            },
            success(responseData) {
                const availableList = [];
                const unavailableList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].couponId,
                        type: responseData.returnData.data[i].type,
                        preferentialType: responseData.returnData.data[i].preferentialType,
                        couponDescription: responseData.returnData.data[i].preferentialType === 1
                            ? `满${responseData.returnData.data[i].amountCondition}元可用`
                            : `满${responseData.returnData.data[i].amountCondition}元可用` + (responseData.returnData.data[i].maxValue === 0 ? '' : `，最高可抵${responseData.returnData.data[i].maxValue}元`),
                        face: responseData.returnData.data[i].face,
                        maxValue: responseData.returnData.data[i].preferentialType === 1 
                            ? responseData.returnData.data[i].face
                            : responseData.returnData.data[i].maxValue,
                        // merchantName: responseDataArr[0].returnData.data[i].merchantName,
                        merchantName: '中大商城',
                        // userReceiveQuantity: 1,
                        expireDatetime: dateTransition(responseData.returnData.data[i].expireDatetime)
                    };
                    if (responseData.returnData.data[i].beAvailable === true) {
                        availableList.push(temp);
                    } else {
                        unavailableList.push(temp);
                    }
                }
                returnData.availableList = availableList;
                returnData.unavailableList = unavailableList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/mall/mall/createOrder 创建订单
     * @apiName create order
     * @apiGroup Mall
     * @apiVersion 1.0.0
     * @apiDescription 创建订单
     * 
     * @apiParam {int} addressId 收货地址ID
     * @apiParam {int} merchandiseId 商品ID
     * @apiParam {int} quantity 商品数量
     * @apiParam {int} couponId 优惠券ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/mall/mall/createOrder
     *   {
     *     "addressId": 1,
     *     "merchandiseId": 1,
     *     "quantity": 1,
     *     "couponId": 1,
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {number} id 订单id
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "id": 1
     *   }
     * 
     *
     */
    static async createOrder(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['addressId', 'merchandiseId', 'quantity', 'couponId']
            },
            method: mallModel.mallModel.createOrder,
            params: {
                userId,
                postDataFromFE: postData
            },
            success(responseData) {
                returnData.id = responseData.returnData.data.id
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/mall/mall/getOrderInfo 获取订单详情
     * @apiName get order info
     * @apiGroup Mall
     * @apiVersion 1.4.1
     * @apiDescription 获取订单详情
     * 
     * @apiParam {int} id 订单ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/mall/getOrderInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} orderInfo 商品详情
     * @apiSuccess (info) {number} price 总价
     * @apiSuccess (info) {string} merchandiseName 商品名称
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "orderInfo": {
     *         "price": 50.4,
     *         "merchandiseName": "美国车厘子",
     *         "status": 1
     *     }
     *   }
     * 
     *
     */
    static async getOrderInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: mallModel.mallModel.getOrderInfo,
            params: {
                userId,
                id: params.id
            },
            success(responseData) {
                const info = {
                    price: responseData.returnData.data.remainAmount,
                    merchandiseName: responseData.returnData.data.merchandiseList[0].merchandiseName,
                    status: responseData.returnData.data.status
                };
                returnData.orderInfo = info;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/mall/mall/payOrder 支付订单
     * @apiName pay order
     * @apiGroup Mall
     * @apiVersion 1.4.1
     * @apiDescription 支付订单
     * 
     * @apiParam {int} id 订单id
     * @apiParam {int} type 支付类型
     *
     * @apiParamExample {json} Request Example
     *   POST /api/mall/mall/payOrder
     *   {
     *     "id": 1,
     *     "type": 2
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {string} appId appId
     * @apiSuccess (Reponse 200) {string} timestamp 时间戳
     * @apiSuccess (Reponse 200) {string} nonceStr 随机串
     * @apiSuccess (Reponse 200) {string} package 微信需要的package
     * @apiSuccess (Reponse 200) {string} paySign 签名
     * @apiSuccess (Reponse 200) {string} partnerId 不记得了
     * @apiSuccess (Reponse 200) {string} orderStr 支付宝需要的orderStr
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "appId": "xxxx",
     *     "timestamp": "11111",
     *     "nonceStr": "123",
     *     "package": "asda",
     *     "paySign": "asdf",
     *     "partnerId": "asdf",
     *     "orderStr": "kj"
     *   }
     * 
     *
     */
    static async payOrder(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'type']
            },
            method: mallModel.mallModel.payOrder,
            params: {
                userId,
                id: postData.id,
                type: postData.type
            },
            success(responseData) {
                returnData.appId = responseData.returnData.data.appId;
                returnData.timestamp = responseData.returnData.data.timeStamp;
                returnData.nonceStr = responseData.returnData.data.nonceStr;
                returnData.package = responseData.returnData.data.package;
                returnData.paySign = responseData.returnData.data.paySign;
                returnData.partnerId = responseData.returnData.data.partnerId;
                returnData.orderStr = responseData.returnData.data.orderStr;                
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/mall/mall/payOrderByCmb 一网通支付订单
     * @apiName pay order by cmb
     * @apiGroup Mall
     * @apiVersion 1.4.1
     * @apiDescription 一网通支付订单
     * 
     * @apiParam {int} id 订单id
     *
     * @apiParamExample {json} Request Example
     *   POST /api/mall/mall/payOrderByCmb
     *   {
     *     "id": 1,
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {string} orderStr orderStr
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "orderStr": "xxxx",
     *   }
     * 
     *
     */
    static async payOrderByCmb(ctx) {
        let returnData = baseController.getSuccess();
        console.log(ctx.session);
        const { cellphone } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: mallModel.mallModel.payOrderByCmb,
            params: {
                cellphone,
                id: postData.id,
            },
            success(responseData) {
                returnData.orderStr = responseData.returnData.data.orderStr;              
            }
        });
        ctx.body = returnData;
    }

    static async createBillOrder(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['ids','id']
            },
            method: mallModel.mallModel.createBillOrder,
            params: {
                id: postData.id,
                ids: postData.ids
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;

    }


    static async payBillOrder(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'type']
            },
            method: mallModel.mallModel.payBillOrder,
            params: {
                userId,
                id: postData.id,
                type: postData.type
            },
            success(responseData) {
                returnData.appId = responseData.returnData.data.appId;
                returnData.timestamp = responseData.returnData.data.timeStamp;
                returnData.nonceStr = responseData.returnData.data.nonceStr;
                returnData.package = responseData.returnData.data.package;
                returnData.paySign = responseData.returnData.data.paySign;
                returnData.partnerId = responseData.returnData.data.partnerId;
                returnData.orderStr = responseData.returnData.data.orderStr;                
            }
        });
        ctx.body = returnData;
    }




}

module.exports = MallController;