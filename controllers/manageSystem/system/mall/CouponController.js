const baseController = require('../../../common/ResDataFormat');
const exception = require('../../../common/requestModule');
const dateTransition = require('../../../common/dateTransition');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class CouponController {
    // ....
    // ..获取优惠券列表
    // ....
    static async getCouponList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'preferentialType', 'type']
            },
            method: manageSystemModel.systemModel.mallModel.couponModel.getCouponList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const couponList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        number: responseData.returnData.data.list[i].number,
                        // merchantName: responseData.returnData.data.list[i].merchantName,
                        merchantName: '中大商城',
                        couponDescription: responseData.returnData.data.list[i].preferentialType === 1
                            ? `满${responseData.returnData.data.list[i].amountCondition}元减${responseData.returnData.data.list[i].face}元`
                            : `满${responseData.returnData.data.list[i].amountCondition}元打${responseData.returnData.data.list[i].face * 10}折` + (responseData.returnData.data.list[i].maxValue === 0 ? '' : `，最高可抵${responseData.returnData.data.list[i].maxValue}元`),
                        deliveryDatetime: dateTransition(responseData.returnData.data.list[i].deliveryDatetime, 'datetime'),
                        expireDatetime: dateTransition(responseData.returnData.data.list[i].expireDatetime, 'datetime'),
                        quantity: responseData.returnData.data.list[i].quantity,
                        deliveryQuantity: responseData.returnData.data.list[i].deliveryQuantity,
                        description: responseData.returnData.data.list[i].description,
                        createDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime'),
                        timeout: responseData.returnData.data.list[i].timeout
                    };
                    couponList.push(temp);
                }
                returnData.couponList = couponList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..新建优惠券
    // ....
    static async createCoupon(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['preferentialType', 'type', 'quantity', 'amountCondition', 'face', 'maxDiscountAmount', 'startDatetime', 'endDatetime', 'description']
            },
            method: manageSystemModel.systemModel.mallModel.couponModel.createCoupon,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..删除优惠券
    // ....
    static async deleteCoupon(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.mallModel.couponModel.deleteCoupon,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            }
        });
        ctx.body = returnData;
    }
}

module.exports = CouponController;