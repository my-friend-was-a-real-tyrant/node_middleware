const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class MyRepairmentModel {
    // ....
    // ..获取用户报修记录
    // ....
    static getRepairmentList({ userId, parkId }) {
        const api = requestAPIList['25']['2502'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取用户报修详情
    // ....
    static getRepairmentInfo({ userId, repairmentId }) {
        const api = requestAPIList['25']['2503'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: repairmentId
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..用户评价维修服务
    // ....
    static assessRepairment({ userId, repairmentId, assess }) {
        const api = requestAPIList['25']['2504'];
        const postData = {
            userId,
            evaluate: assess
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: repairmentId
        });
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }
}

module.exports = MyRepairmentModel;