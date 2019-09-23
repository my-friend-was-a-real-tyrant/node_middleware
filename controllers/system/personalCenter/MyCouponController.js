const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const { serverHostname } = require('../../common/constant');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class MyCouponController {
    /**
     * @api {GET} /api/system/personalCenter/myCoupon/getMyCouponList 获取我的优惠券
     * @apiName get my coupon list
     * @apiGroup System PersonalCenter MyCoupon
     * @apiVersion 1.4.1
     * @apiDescription 获取我的优惠券
     * 
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} neverUsedList 全部报修列表
     * @apiSuccess (Reponse 200) {array} alreadyUsedList 审核中报修列表
     * @apiSuccess (Reponse 200) {array} expiredList 已转送报修列表
     * @apiSuccess (list) {int} id 优惠券ID
     * @apiSuccess (list) {int} type 优惠券种类
     * @apiSuccess (list) {int} preferentialType 优惠种类
     * @apiSuccess (list) {string} couponDescription 描述
     * @apiSuccess (list) {int} face 面值／折扣率
     * @apiSuccess (list) {string} merchantName 商户名称
     * @apiSuccess (list) {string} expireDatetime 过期时间
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "neverUsedList": [{
     *         "id": 1,
     *         "type": 1,
     *         "preferentialType": 1,
     *         "couponDescription": "满100打5折，最高减3元",
     *         "face": 0.5,
     *         "merchantName": "星巴克",
     *         "expireDatetime": "2017-02-02"
     *     }],
     *     "alreadyUsedList": [],
     *     "expiredList": []
     *   }
     * 
     *
     */
    static async getMyCouponList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            method: [
                systemModel.personalCenterModel.myCouponModel.getMyCouponList,
                systemModel.personalCenterModel.myCouponModel.getMyCouponList,
                systemModel.personalCenterModel.myCouponModel.getMyCouponList
            ],
            params: [{
                userId,
                status: 2
            }, {
                userId,
                status: 3
            }, {
                userId,
                status: 4
            }],
            success(responseDataArr) {
                const neverUsedList = [];
                const alreadyUsedList = [];
                const expiredList = [];
                for (let i = 0; i < responseDataArr[0].returnData.data.length; i ++) {
                    const temp = {
                        id: responseDataArr[0].returnData.data[i].id,
                        type: responseDataArr[0].returnData.data[i].type,
                        preferentialType: responseDataArr[0].returnData.data[i].preferentialType,
                        couponDescription: responseDataArr[0].returnData.data[i].preferentialType === 1
                            ? `满${responseDataArr[0].returnData.data[i].amountCondition}元可用`
                            : `满${responseDataArr[0].returnData.data[i].amountCondition}元可用，最高可抵${responseDataArr[0].returnData.data[i].maxValue}元`,
                        face: responseDataArr[0].returnData.data[i].face,
                        // merchantName: responseDataArr[0].returnData.data[i].merchantName,
                        merchantName: '中大商城',
                        // userReceiveQuantity: 1,
                        expireDatetime: dateTransition(responseDataArr[0].returnData.data[i].expireDatetime)
                    };
                    neverUsedList.push(temp);
                }
                for (let i = 0; i < responseDataArr[1].returnData.data.length; i ++) {
                    const temp = {
                        id: responseDataArr[1].returnData.data[i].id,
                        type: responseDataArr[1].returnData.data[i].type,
                        preferentialType: responseDataArr[1].returnData.data[i].preferentialType,
                        couponDescription: responseDataArr[1].returnData.data[i].preferentialType === 1
                            ? `满${responseDataArr[1].returnData.data[i].amountCondition}元可用`
                            : `满${responseDataArr[1].returnData.data[i].amountCondition}元可用，最高可抵${responseDataArr[1].returnData.data[i].maxValue}元`,
                        face: responseDataArr[1].returnData.data[i].face,
                        // merchantName: responseDataArr[1].returnData.data[i].merchantName,
                        merchantName: '中大商城',
                        // userReceiveQuantity: 1,
                        expireDatetime: dateTransition(responseDataArr[1].returnData.data[i].expireDatetime)
                    };
                    alreadyUsedList.push(temp);
                }
                for (let i = 0; i < responseDataArr[2].returnData.data.length; i ++) {
                    const temp = {
                        id: responseDataArr[2].returnData.data[i].id,
                        type: responseDataArr[2].returnData.data[i].type,
                        preferentialType: responseDataArr[2].returnData.data[i].preferentialType,
                        couponDescription: responseDataArr[2].returnData.data[i].preferentialType === 1
                            ? `满${responseDataArr[2].returnData.data[i].amountCondition}元可用`
                            : `满${responseDataArr[2].returnData.data[i].amountCondition}元可用，最高可抵${responseDataArr[2].returnData.data[i].maxValue}元`,
                        face: responseDataArr[2].returnData.data[i].face,
                        // merchantName: responseDataArr[2].returnData.data[i].merchantName,
                        merchantName: '中大商城',
                        // userReceiveQuantity: 1,
                        expireDatetime: dateTransition(responseDataArr[2].returnData.data[i].expireDatetime)
                    };
                    expiredList.push(temp);
                }
                returnData.neverUsedList = neverUsedList;
                returnData.alreadyUsedList = alreadyUsedList;
                returnData.expiredList = expiredList;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = MyCouponController;