const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class ReportModel {
    // ....
    // ..获取报事列表
    // ....
    static getReportList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['66']['6601'];
        const params = {
            accountId, 
            parkId,
            keywords: postDataFromFE.keywords,
            status: postDataFromFE.status,
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
    // ..获取报事详情
    // ....
    static getReportInfo({ accountId, parkId, id }) {
        const api = requestAPIList['66']['6602'];
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
    // ..完成维修
    // ....
    static finishReport({ accountId, parkId, id, remark }) {
        const api = requestAPIList['66']['6603'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            operation: 2,
            remark
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
            permission: 1302
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..转派报事任务
    // ....
    static appointTask({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['66']['6603'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id,
            operation: 1
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            operation: 1,
            remark: postDataFromFE.remark,
            targetAccountId: postDataFromFE.manager
        };

        return request(httpRequestParams);
    }
}

module.exports = ReportModel;