const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class ComplaintModel {
    // ....
    // ..获取园区表扬投诉列表
    // ....
    static getComplaintList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['28']['2801'];
        const params = {
            accountId, 
            parkId,
            keywords: postDataFromFE.keywords,
            type: postDataFromFE.type,
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
    // ..获取表扬投诉信息
    // ....
    static getComplaintInfo({ accountId, parkId, id }) {
        const api = requestAPIList['28']['2802'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..删除表扬投诉
    // ....
    static deleteComplaint({ accountId, id }) {
        const api = requestAPIList['28']['2803'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..处理完成表扬投诉
    // ....
    static finishComplaint({ accountId, parkId, id, remark }) {
        const api = requestAPIList['28']['2804'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id,
            operation: 2
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            description: remark
        };

        return request(httpRequestParams);
    }

    // ....
    // ..投诉转报事
    // ....
    static changeComplaintType({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['28']['2805'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            description: postDataFromFE.remark,
            type: postDataFromFE.report
        };

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
            permission: 1202
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..转派投诉任务
    // ....
    static appointTask({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['28']['2804'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id,
            operation: 1
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            description: postDataFromFE.remark,
            targetAccountId: postDataFromFE.manager
        };

        return request(httpRequestParams);
    }
}

module.exports = ComplaintModel;