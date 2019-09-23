const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class RepairmentModel {
    // ....
    // ..获取报修列表
    // ....
    static getRepairmentList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['26']['2601'];
        const params = {
            accountId, 
            parkId,
            keywords: postDataFromFE.keywords,
            status: postDataFromFE.repairmentStatus,
            type: postDataFromFE.repairmentType,
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
    // ..获取报修详情
    // ....
    static getRepairmentInfo({ accountId, parkId, repairmentId }) {
        const api = requestAPIList['26']['2602'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: repairmentId
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);        
    }

    // ....
    // ..获取维修员列表
    // ....
    static getRepairManList({ accountId, parkId }) {
        const api = requestAPIList['14']['1408'];
        const params = {
            accountId,
            parkId,
            permission: 1102,
            type: 2
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取指派管理员列表
    // ....
    static getRepairmentManagerList({ accountId, parkId }) {
        const api = requestAPIList['14']['1408'];
        const params = {
            accountId,
            parkId,
            permission: 1102,
            type: 1
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..审批报修
    // ....
    static approveRepairment({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['26']['2603'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.repairmentId,
            operation: postDataFromFE.approveType
        });

        const postData = {
            accountId,
            parkId,
            serviceman: postDataFromFE.repairMan,
            managePicture: postDataFromFE.reportImgList,
            description: postDataFromFE.remark
        };
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..完成维修
    // ....
    static finishRepairment({ accountId, parkId, repairmentId, remark, finishImgList }) {
        const api = requestAPIList['26']['2603'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: repairmentId,
            operation: 4
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            description: remark,
            completePicture: finishImgList
        };

        return request(httpRequestParams);
    }
}

module.exports = RepairmentModel;