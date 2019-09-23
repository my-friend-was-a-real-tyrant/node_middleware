const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class SmsModel {
    // ....
    // ..获取短信列表
    // ....
    static getSmsList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['18']['1801'];
        const params = {
            accountId,
            parkId,
            keywords: postDataFromFE.keywords,
            earliestCreateDatetime: dateTransition(postDataFromFE.startDate),
            latestCreateDatetime: dateTransition(postDataFromFE.endDate),
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = SmsModel;