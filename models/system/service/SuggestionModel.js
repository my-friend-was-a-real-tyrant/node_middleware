const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class SuggestionModel {
    // ....
    // ..咨询建议
    // ....
    static submitSuggestion({ userId, postDataFromFE }) {
        const api = requestAPIList['63']['6301'];
        const { parkId, roomId, question } = postDataFromFE;
        const postData = {
            userId,
            parkId,
            roomId,
            title: question,
            content: question
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..获取咨询建议列表
    // ....
    static getSuggestionList({ userId, parkId }) {
        const api = requestAPIList['63']['6302'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取咨询建议详情
    // ....
    static getSuggestionInfo({ userId, id }) {
        const api = requestAPIList['63']['6303'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }
}

module.exports = SuggestionModel;