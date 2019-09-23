const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class AccessLogsModel {
    static getLogsList({ accountId, postDataFromFE }) {
        const api = requestAPIList['12']['1211'];
        const params = {
            accountId,
            keywords: postDataFromFE.keywords,
            method: postDataFromFE.method,
            earliestCreateDatetime: dateTransition(postDataFromFE.startDate, 'datetime'),
            latestCreateDatetime: dateTransition(postDataFromFE.endDate, 'datetime'),
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = AccessLogsModel;