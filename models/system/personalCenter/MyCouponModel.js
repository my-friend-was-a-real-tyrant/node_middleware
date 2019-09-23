const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class MyCouponModel {
    // ....
    // ..获取我的优惠券
    // ....
    static getMyCouponList({ userId, status }) {
        const api = requestAPIList['37']['3702'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            status
        }

        return request(httpRequestParams);
    }
}

module.exports = MyCouponModel;