const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class OperationLogsModel {
    // ....
    // ..获取日志列表
    // ....
    static getLogsList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['16']['1611'];
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

module.exports = OperationLogsModel;