const baseController = require('../common/ResDataFormat');
const dateTransition = require('../common/dateTransition');
const exception = require('../common/requestModule');
const systemModel = require('../../models/SystemModel');

const url = require('url');

class LifeController {
    /**
     * @api {GET} /api/system/life/coupon/getCouponList 获取用户可领优惠券列表
     * @apiName get coupon list
     * @apiGroup System Life Coupon
     * @apiVersion 1.4.1
     * @apiDescription 获取用户可领优惠券列表
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} mallList 商城券
     * @apiSuccess (Reponse 200) {array} merchantList 商户券
     * @apiSuccess (Reponse 200) {array} payList 支付券
     * @apiSuccess (list) {number} id 优惠券ID
     * @apiSuccess (list) {number} type 优惠券种类
     * @apiSuccess (list) {number} preferentialType 优惠种类
     * @apiSuccess (list) {string} couponDescription 优惠描述
     * @apiSuccess (list) {number} face 优惠面额
     * @apiSuccess (list) {string} merchantName 商户名
     * @apiSuccess (list) {string} quantity 剩余百分比
     * @apiSuccess (list) {number} userReceiveQuantity 用户已领数量
     * @apiSuccess (list) {string} expireDatetime 过期时间
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "complaintList": [{
     *         "id": 1,
     *         "type": 1,
     *         "preferentialType": 1,
     *         "couponDescription": "满100减100",
     *         "face": 10,
     *         "merchantName": "中大商城",
     *         "quantity": "10%",
     *         "userReceiveQuantity": 1,
     *         "expireDatetime": "2017-09-09",
     *     }],
     *     "praiseList": []
     *   }
     * 
     *
     */
    static async getCouponList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            method: systemModel.lifeModel.getCouponList,
            params: {
                userId
            },
            success(responseData) {
                const mallList = [];
                const merchantList = [];
                const payList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].id,
                        type: responseData.returnData.data[i].type,
                        preferentialType: responseData.returnData.data[i].preferentialType,
                        couponDescription: responseData.returnData.data[i].preferentialType === 1
                            ? `满${responseData.returnData.data[i].amountCondition}元可用`
                            : `满${responseData.returnData.data[i].amountCondition}元可用` + (responseData.returnData.data[i].maxValue === 0 ? '' : `，最高可抵${responseData.returnData.data[i].maxValue}元`),
                        face: responseData.returnData.data[i].face,
                        // merchantName: responseData.returnData.data[i].merchantName,
                        merchantName: '中大商城',
                        quantity: (100 - Math.ceil(responseData.returnData.data[i].deliveryQuantity / responseData.returnData.data[i].quantity * 100)) + '%',
                        userReceiveQuantity: responseData.returnData.data[i].userReceiveQuantity,
                        // userReceiveQuantity: 1,
                        expireDatetime: dateTransition(responseData.returnData.data[i].expireDatetime)
                    };
                    if (temp.type === 1) {
                        mallList.push(temp);
                    } else if (temp.type === 2) {
                        merchantList.push(temp);
                    } else if (temp.type === 3) {
                        payList.push(temp);
                    }
                }
                returnData.mallList = mallList;
                returnData.merchantList = merchantList;
                returnData.payList = payList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/system/life/coupon/receiveCoupon 用户领取优惠券
     * @apiName receive complaint
     * @apiGroup System Life Coupon
     * @apiVersion 1.4.1
     * @apiDescription 用户领取优惠券
     * 
     * @apiParam {int} id 优惠券ID
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/system/life/coupon/receiveCoupon
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async receiveCoupon(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: systemModel.lifeModel.receiveCoupon,
            params: {
                userId,
                batchId: postData.id
            }
        });
        ctx.body = returnData;
    }



    // 用户水电费列表获取
    static async userWaterListGet(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;

        await exception({
            returnData,
            validator: {
                params,
                properties: ['parkId','roomId']
            },
            method: systemModel.lifeModel.userWaterListGet,
            params: {
                parkId: params.parkId,
                roomId: params.roomId
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });

        ctx.body = returnData;
        
    }
    
    // 用户物业费列表获取
    static async userPropertyListGet(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;

        await exception({
            returnData,
            validator: {
                params,
                properties: ['parkId','roomId']
            },
            method: systemModel.lifeModel.userPropertyListGet,
            params: {
                parkId: params.parkId,
                roomId: params.roomId
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });

        ctx.body = returnData;
    }


    
    
    
    
    




}

module.exports = LifeController;