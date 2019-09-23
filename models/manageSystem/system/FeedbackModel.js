const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../controllers/common/dateTransition');
const qs = require('querystring');

class FeedbackModel {
    // ....
    // ..获取意见反馈列表
    // ....
    static getFeedbackList({ accountId }) {
        const api = requestAPIList['16']['1616'];
        const params = {
            accountId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取意见反馈详情
    // ....
    static getFeedbackInfo({ accountId, adviceId }) {
        const api = requestAPIList['16']['1615'];
        const params = {
            accountId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            adviceId
        });
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = FeedbackModel;