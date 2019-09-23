const baseController = require('../common/ResDataFormat');
const dateTransition = require('../common/dateTransition');
const exception = require('../common/requestModule');
const priceTransform = require('../common/money');
const { serverHostname } = require('../common/constant');
const mallModel = require('../../models/MallModel');

const url = require('url');

class PersonController {
    /**
     * @api {GET} /api/mall/person/orderListInit 我的订单列表初始获取
     * @apiName order list init
     * @apiGroup Mall Person
     * @apiVersion 1.4.1
     * @apiDescription 我的订单列表初始获取
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} allOrderList 所有订单列表
     * @apiSuccess (Reponse 200) {array} notPayOrderList 未支付订单列表
     * @apiSuccess (Reponse 200) {array} notFinishGroupOrderList 待成团订单列表
     * @apiSuccess (Reponse 200) {array} notSendOrderList 待发货订单列表
     * @apiSuccess (Reponse 200) {array} alreadySendedOrderList 已发货订单列表
     * @apiSuccess (Reponse 200) {array} finishedOrderList 已完成订单列表
     * @apiSuccess (list) {int} id 订单ID
     * @apiSuccess (list) {int} statusCode 订单状态码
     * @apiSuccess (list) {string} status 订单状态
     * @apiSuccess (list) {object} merchandise 订单商品
     * @apiSuccess (merchandise) {string} img 商品图片
     * @apiSuccess (merchandise) {string} name 商品名称
     * @apiSuccess (merchandise) {string} content 份量
     * @apiSuccess (merchandise) {double} price 商品单价
     * @apiSuccess (merchandise) {int} count 商品数量
     * @apiSuccess (merchandise) {double} totalPrice 商品总价
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "allOrderList": [{
     *         "id": 1,
     *         "status": "待支付",
     *         "statusCode": 1,
     *         "merchandise": {
     *             "img": "http://www.baidu.com",
     *             "name": "香蕉",
     *             "content": "500g",
     *             "price": 5.01,
     *             "count": 2,
     *             "totalPrice": 9.22
     *         }
     *     }],
     *     "notPayOrderList": [],
     *     "notFinishGroupOrderList": [],
     *     "notSendOrderList": [],
     *     "alreadySendedOrderList": [],
     *     "finishedOrderList": []
     *   }
     * 
     *
     */
    static async orderListInit(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            method: mallModel.personModel.getOrderList,
            params: [{
                userId
            }, {
                userId,
                status: 1
            }, {
                userId,
                status: 2
            }, {
                userId,
                status: 6
            }, {
                userId,
                status: 3
            }, {
                userId,
                status: 4
            }],
            success(responseArr) {
                const allOrderList = [];
                const notPayOrderList = [];
                const notFinishGroupOrderList = [];
                const notSendOrderList = [];
                const alreadySendedOrderList = [];
                const finishedOrderList = [];
                const arr = [
                    allOrderList, 
                    notPayOrderList,
                    notFinishGroupOrderList,
                    notSendOrderList,
                    alreadySendedOrderList,
                    finishedOrderList
                ];

                for (let j = 0; j < arr.length; j ++) {
                    for (let i = 0; i < responseArr[j].returnData.data.length; i ++) {
                        const temp = {
                            id: responseArr[j].returnData.data[i].id,
                            status: responseArr[j].returnData.data[i].status === 1
                                ? '待支付' :
                            (responseArr[j].returnData.data[i].status === 2
                                ? '待成团' :
                            (responseArr[j].returnData.data[i].status === 3
                                ? '已发货' :
                            (responseArr[j].returnData.data[i].status === 4
                                ? '已完成' :
                            (responseArr[j].returnData.data[i].status === 6
                                ? '待发货' : 
                            (responseArr[j].returnData.data[i].status === 8
                                ? '已取消' :
                            (responseArr[j].returnData.data[i].status === 9
                                ? '已关闭' : '')))))),
                            statusCode: responseArr[j].returnData.data[i].status,
                            
                            
                            
                            merchandise: {
                                img: serverHostname + responseArr[j].returnData.data[i].merchandiseList[0].picture,
                                name: responseArr[j].returnData.data[i].merchandiseList[0].merchandiseName,
                                //content: responseArr[j].returnData.data[i].merchandiseList[0].content,
                                price: priceTransform(responseArr[j].returnData.data[i].merchandiseList[0].price),
                                count: responseArr[j].returnData.data[i].quantity,
                                totalPrice: priceTransform(responseArr[j].returnData.data[i].amount),
                                merchandiseId:responseArr[j].returnData.data[i].merchandiseId
                            }
                            
                            
                            
                        };
                        arr[j].push(temp);
                    }
                }
                returnData.allOrderList = allOrderList;
                returnData.notPayOrderList = notPayOrderList;
                returnData.notFinishGroupOrderList = notFinishGroupOrderList;
                returnData.notSendOrderList = notSendOrderList;
                returnData.alreadySendedOrderList = alreadySendedOrderList;
                returnData.finishedOrderList = finishedOrderList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/mall/person/getOrderList 订单列表获取
     * @apiName get order list
     * @apiGroup Mall Person
     * @apiVersion 1.4.1
     * @apiDescription 订单列表获取
     * 
     * @apiParam {int} status 订单状态
     * @apiParam {int} index 最后一条记录id
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/person/getOrderList
     *   {
     *     "status": 1,
     *     "index": 3
     *   }
     *
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} orderList 订单列表
     * @apiSuccess (list) {int} id 订单ID
     * @apiSuccess (list) {int} status 订单状态
     * @apiSuccess (list) {object} merchandise 订单商品
     * @apiSuccess (merchandise) {string} img 商品图片
     * @apiSuccess (merchandise) {string} name 商品名称
     * @apiSuccess (merchandise) {string} content 份量
     * @apiSuccess (merchandise) {number} price 商品单价
     * @apiSuccess (merchandise) {number} count 商品数量
     * @apiSuccess (merchandise) {number} totalPrice 商品总价
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "orderList": [{
     *         "id": 1,
     *         "status": 1,
     *         "merchandise": {
     *             "img": "http://www.baidu.com",
     *             "name": "香蕉",
     *             "content": "500g",
     *             "price": 5.01,
     *             "count": 2,
     *             "totalPrice": 9.22
     *         }
     *     }]
     *   }
     * 
     *
     */
    static async getOrderList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['status', 'index']
            },
            method: mallModel.personModel.getOrderList,
            params: {
                userId,
                status: params.status,
                index: params.index
            },
            success(responseData) {
                const orderList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].id,
                        status: responseData.returnData.data[i].status === 1
                            ? '待支付' :
                        (responseData.returnData.data[i].status === 2
                            ? '待成团' :
                        (responseData.returnData.data[i].status === 3
                            ? '已发货' :
                        (responseData.returnData.data[i].status === 4
                            ? '已完成' :
                        (responseData.returnData.data[i].status === 6
                            ? '待发货' : 
                        (responseData.returnData.data[i].status === 8
                            ? '已取消' :
                        (responseData.returnData.data[i].status === 9
                            ? '已关闭' : '')))))),
                        statusCode: responseData.returnData.data[i].status,
                        merchandise: {
                            img: serverHostname + responseData.returnData.data[i].merchandiseList[0].picture,
                            name: responseData.returnData.data[i].merchandiseList[0].merchandiseName, 
                            price: priceTransform(responseData.returnData.data[i].merchandiseList[0].price),
                            count: responseData.returnData.data[i].quantity,
                            totalPrice: priceTransform(responseData.returnData.data[i].amount),
                            merchandiseId:responseData.returnData.data[i].merchandiseId
                        }
                    };
                    orderList.push(temp);
                }
                returnData.orderList = orderList;
            }
        });
        ctx.body = returnData;
    }


    /**
     * @api {GET} /api/mall/person/getOrderInfo 订单详情获取
     * @apiName get order info
     * @apiGroup Mall Person
     * @apiVersion 1.4.1
     * @apiDescription 订单详情获取
     *
     * @apiParam {int} id 订单ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/mall/person/getOrderInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 这个接口东西太多了。。。。我懒得搞了
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
                properties: ['id']
            },
            method: mallModel.personModel.getOrderInfo,
            params: {
                userId,
                id: params.id
            },
            success(responseData) {
                const temp = {
                    id: responseData.returnData.data.id,
                    getstatus:responseData.returnData.data.status,
                    status: responseData.returnData.data.status === 1
                        ? '待支付' :
                    (responseData.returnData.data.status === 2
                        ? '已付款，等待成团' :
                    (responseData.returnData.data.status === 3
                        ? '商家已发货' :
                    (responseData.returnData.data.status === 4
                        ? '买家已收货' :
                    (responseData.returnData.data.status === 6
                        ? '已成团，商家已接单，等待发货' : 
                    (responseData.returnData.data.status === 8
                        ? '已取消订单' : 
                    (responseData.returnData.data.status === 9
                        ? '已关闭订单' : '')))))),
                    statusCode: responseData.returnData.data.status,
                    // 成团情况
                    countDown: {
                        person: responseData.returnData.data.remainingNumber,
                        hour: 0,
                        minute: 0,
                        second: 0
                    },
                    type:responseData.returnData.data.type,                    
                    deliveryAddress: {
                        name: responseData.returnData.data.personName,
                        cellphone: responseData.returnData.data.cellphone,
                        provinceName: responseData.returnData.data.provinceName,
                        cityName: responseData.returnData.data.cityName,
                        districtName: responseData.returnData.data.districtName,
                        address: responseData.returnData.data.address,
                    },
                    merchandise: {
                        id: responseData.returnData.data.merchandiseList[0].merchandiseId,
                        groupId: responseData.returnData.data.groupId,
                        img: serverHostname + responseData.returnData.data.merchandiseList[0].picture,
                        name: responseData.returnData.data.merchandiseList[0].merchandiseName,
                        content: responseData.returnData.data.merchandiseList[0].content,
                        price: priceTransform(responseData.returnData.data.merchandiseList[0].price),
                        count: responseData.returnData.data.merchandiseList[0].quantity
                    },
                    price: {
                        noCouponPrice: priceTransform(responseData.returnData.data.merchandiseList[0].amount),
                        couponPrice: priceTransform(0),
                        realPrice: priceTransform(responseData.returnData.data.merchandiseList[0].amount)
                    },
                    serialNumber: responseData.returnData.data.serialNumber,
                    // 快递单号
                    expressNumber: responseData.returnData.data.expressNumber,
                    time: {
                        createDatetime: '',
                        payDatetime: '',
                        groupFinishDatetime: '',
                        deliveryDatetime: '',
                        finishDatetime: '',
                        cancelDatetime: ''
                    }
                };
                // 成团情况时间倒计时计算

                let timeDifference = responseData.returnData.data.endTime - responseData.returnData.data.nowTime;

                temp.countDown.day = Math.floor(timeDifference / 86400000);

                timeDifference = timeDifference - (temp.countDown.day * 86400000);

                temp.countDown.hour = Math.floor(timeDifference / 3600000);

                timeDifference = timeDifference - (temp.countDown.hour * 3600000);

                temp.countDown.minute = Math.floor(timeDifference / 60000);

                timeDifference = timeDifference - (temp.countDown.minute * 60000);

                temp.countDown.second = Math.floor(timeDifference / 1000);

                // 优惠券金额与总价计算
                for (let i = 0; i < responseData.returnData.data.paymentList.length; i ++) {
                    if (responseData.returnData.data.paymentList[i].paymentType === 21) {
                        temp.price.couponPrice = priceTransform(responseData.returnData.data.paymentList[i].amount);
                        break;
                    }
                }
                temp.price.realPrice = priceTransform((responseData.returnData.data.merchandiseList[0].amount * 100 - temp.price.couponPrice.price * 100) / 100);
                // 订单时间列表
                for (let i = 0; i < responseData.returnData.data.records.length; i ++) {
                    const record = responseData.returnData.data.records[i];
                    if (record.operation === 11) {
                        temp.time.createDatetime = dateTransition(record.createDatetime, 'datetime');
                    }
                    if (record.operation === 12) {
                        temp.time.payDatetime = dateTransition(record.createDatetime, 'datetime');
                    }
                    if (record.operation === 13) {
                        temp.time.groupFinishDatetime = dateTransition(record.createDatetime, 'datetime');
                    }
                    if (record.operation === 14) {
                        temp.time.deliveryDatetime = dateTransition(record.createDatetime, 'datetime');
                    }
                    if (record.operation === 16) {
                        temp.time.finishDatetime = dateTransition(record.createDatetime, 'datetime');
                    }
                    if (record.operation === 21) {
                        temp.time.cancelDatetime = dateTransition(record.createDatetime, 'datetime');
                    }
                    if (record.operation === 24) {
                        temp.time.cancelDatetime = dateTransition(record.createDatetime, 'datetime');
                    }
                }
                returnData.order = temp;
            }
        });
        if (returnData.order.status === 1 || returnData.order.status === 2) {
            await exception({
                returnData,
                method: mallModel.mallModel.getMerchandiseInfo,
                params: {
                    id: returnData.order.merchandise.id
                },
                success(responseData) {
                    const info = {
                        countDown: {
                            day: 0,
                            hour: 0,
                            minute: 0,
                            second: 0
                        },
                        maxCount: responseData.returnData.data.maxCount,
                        saleCount: responseData.returnData.data.count,
                        groupStatus:responseData.returnData.data.groupStatus
                    }
                    let timeDifference = responseData.returnData.data.endDatetime - responseData.returnData.data.currentDatetime;

                    info.countDown.day = Math.floor(timeDifference / 86400000);

                    timeDifference = timeDifference - (info.countDown.day * 86400000);

                    info.countDown.hour = Math.floor(timeDifference / 3600000);

                    timeDifference = timeDifference - (info.countDown.hour * 3600000);

                    info.countDown.minute = Math.floor(timeDifference / 60000);

                    timeDifference = timeDifference - (info.countDown.minute * 60000);

                    info.countDown.second = Math.floor(timeDifference / 1000);



                    returnData.order.group = info;

                }
            });
        }
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/mall/person/cancelOrder 取消订单
     * @apiName cancel order
     * @apiGroup Mall Person
     * @apiVersion 1.4.1
     * @apiDescription 取消订单
     * 
     * @apiParam {int} id 订单ID
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/mall/person/cancelOrder
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async cancelOrder(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: mallModel.personModel.cancelOrder,
            params: {
                userId,
                id: postData.id
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/mall/person/confirmReceipt 确认收货
     * @apiName confirm receipt
     * @apiGroup Mall Person
     * @apiVersion 1.4.1
     * @apiDescription 确认收货
     * 
     * @apiParam {int} id 订单ID
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/mall/person/confirmReceipt
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async confirmReceipt(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: mallModel.personModel.confirmReceipt,
            params: {
                userId,
                id: postData.id
            }
        });
        ctx.body = returnData;
    }
    
    
   
    
    // ....
    // ..创建拼团订单
    // ....
    
    static async generateTogetherForm(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['addressId', 'merchandiseId', 'groupId', 'quantity', 'couponId']
            },
            method: mallModel.personModel.generateTogetherForm,
            params: {
                userId,
                postDataFromFE: postData
            },
            success(responseData){
                //console.log(responseData);
                returnData.data = responseData.returnData.data;
            }            
        });       
        
        ctx.body = returnData;
    }
    
    // ....
    // ..创建单买订单
    // ....
    
    static async generateSingleForm(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['addressId', 'merchandiseId', 'quantity', 'couponId']
            },
            method: mallModel.personModel.generateSingleForm,
            params: {
                userId,
                postDataFromFE: postData
            },
            success(responseData){
                //console.log(responseData);
                returnData.data = responseData.returnData.data;
            }            
        });       
        
        ctx.body = returnData;
    }
    
    
    
    
    
    
    
    
}

module.exports = PersonController;