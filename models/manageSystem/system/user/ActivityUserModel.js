const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class ActivityUserModel {
    // ....
    // ..获取日志列表
    // ....
    static getActivityUser({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['16']['1612'];
        const params = {
            accountId,
            parkId,
            queryType: postDataFromFE.type,
            queryDatetime: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = ActivityUserModel;