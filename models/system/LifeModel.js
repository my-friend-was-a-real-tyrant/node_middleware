const requestAPIList = require('../common/requestAPIList');
const NewRequestParams = require('../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../controllers/common/dateTransition');
const qs = require('querystring');

class LifeModel {
    // ....
    // ..获取可领优惠券列表
    // ....
    static getCouponList({ userId }) {
        const api = requestAPIList['37']['3701'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..领取优惠券
    // ....
    static receiveCoupon({ userId, batchId }) {
        const api = requestAPIList['37']['3703'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            batchId
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }
    
    
    // 用户水电费列表获取
    static userWaterListGet({ parkId,roomId }) {
        const api = requestAPIList['24']['2421'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            parkId,
            roomId
        }
        return request(httpRequestParams);
    }
    
    // 用户物业费列表获取
    static userPropertyListGet({ parkId,roomId }) {
        const api = requestAPIList['24']['2420'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            parkId,
            roomId
        }
        return request(httpRequestParams);
    }
    
}

module.exports = LifeModel;