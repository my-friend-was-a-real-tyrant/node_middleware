const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class UserStatisticsModel {
    // ....
    // ..获取日志列表
    // ....
    static getUserStatistics({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['16']['1613'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = UserStatisticsModel;