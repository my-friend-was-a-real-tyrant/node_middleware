const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class MyReportModel {
    // ....
    // ..获取用户报事记录
    // ....
    static getReportList({ userId, parkId }) {
        const api = requestAPIList['65']['6502'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取用户报事记录
    // ....
    static getReportInfo({ userId, id }) {
        const api = requestAPIList['65']['6503'];
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

module.exports = MyReportModel;