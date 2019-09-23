const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class BuildingModel {
    // ....
    // ..获取大楼列表
    // ....
    static getBuildingList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['22']['2221'];
        const params = {
            accountId,
            parkId,
            keywords: postDataFromFE.keywords,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..分配管家
    // ....
    static distributeBuildingManager({ accountId, parkId, buildingId, managerId }) {
        const api = requestAPIList['22']['2222'];
        const params = {
            accountId,
            parkId,
            employeeId: managerId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            buildingId,
            operation: 2
        });
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = BuildingModel;