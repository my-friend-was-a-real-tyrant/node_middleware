const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class SuggestionModel {
    // ....
    // ..获取咨询建议列表
    // ....
    static getSuggestionList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['64']['6401'];
        const params = {
            accountId, 
            parkId,
            keywords: postDataFromFE.keywords,
            buildingName: postDataFromFE.building,
            roomCode: postDataFromFE.room,
            earliestCreateDatetime: dateTransition(postDataFromFE.startDate),
            latestCreateDatetime: dateTransition(postDataFromFE.endDate),
            toOneself: postDataFromFE.belongToMe === 'true' ? 1 : 0,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取咨询建议详情
    // ....
    static getSuggestionInfo({ accountId, parkId, id }) {
        const api = requestAPIList['64']['6402'];
        const params = {
            accountId, 
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取指派管理员列表
    // ....
    static getAppointTaskManagerList({ accountId, parkId }) {
        const api = requestAPIList['14']['1408'];
        const params = {
            accountId,
            parkId,
            type: 1,
            permission: 1702
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..转派咨询建议任务
    // ....
    static appointTask({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['64']['6403'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            operation: 1,
            content: postDataFromFE.remark,
            targetAccountId: postDataFromFE.manager
        };

        return request(httpRequestParams);
    }

    // ....
    // ..回复咨询建议
    // ....
    static answerSuggestion({ accountId, parkId, id, answer }) {
        const api = requestAPIList['64']['6403'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            operation: 2,
            content: answer
        };

        return request(httpRequestParams);
    }
}

module.exports = SuggestionModel;