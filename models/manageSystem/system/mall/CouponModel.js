const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class CouponModel {
    // ....
    // ..获取优惠券列表
    // ....
    static getCouponList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['38']['3802'];
        const params = {
            accountId,
            parkId,
            keywords: postDataFromFE.keywords,
            preferentialType: postDataFromFE.preferentialType,
            type: postDataFromFE.type,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return (request(httpRequestParams));
    }

    // ....
    // ..新建优惠券
    // ....
    static createCoupon({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['38']['3801'];
        const postData = {
            accountId,
            parkId,
            preferentialType: postDataFromFE.preferentialType,
            type: postDataFromFE.type,
            quantity: postDataFromFE.quantity,
            amountCondition: postDataFromFE.amountCondition,
            face: postDataFromFE.face,
            maxValue: postDataFromFE.maxDiscountAmount,
            deliveryDatetime: dateTransition(postDataFromFE.startDatetime, 'datetime'),
            expireDatetime: dateTransition(postDataFromFE.endDatetime, 'datetime'),
            // merchantId: 1,
            description: postDataFromFE.description
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..删除优惠券
    // ....
    static deleteCoupon({ accountId, parkId, id }) {
        const api = requestAPIList['38']['3803'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }
}

module.exports = CouponModel;