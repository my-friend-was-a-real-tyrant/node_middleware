const requestAPIList = require('./common/requestAPIList');
const NewRequestParams = require('./common/NewRequestParams');
const request = require('request-promise');

class AppModel {    
    // ....
    // ..App推送列表
    // ....
    static getPushList(params) {
        const api = requestAPIList['18']['1821'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..App处理消息
    // ....
    static handleAppMessage({ pushIds, operation }) {
        const api = requestAPIList['18']['1823'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            operation
        });
        httpRequestParams.myParams = {
            pushIds
        };

        return request(httpRequestParams);
    }

    // ....
    // ..App意见反馈
    // ....
    static feedback({ userId, postDataFromFE }) {
        const api = requestAPIList['15']['1507'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            subject: postDataFromFE.subject,
            content: postDataFromFE.content,
            pictures: postDataFromFE.pictures
        };

        return request(httpRequestParams);
    }
}

module.exports = AppModel;