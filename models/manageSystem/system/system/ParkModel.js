const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class ParkModel {
    // ....
    // ..获取园区列表
    // ....
    static getParkList({ postDataFromFE }) {
        const api = requestAPIList['22']['2202'];
        const params = {
            keywords: postDataFromFE.keywords,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..添加园区
    // ....
    static addPark({ accountId, postDataFromFE }) {
        const api = requestAPIList['22']['2201'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            name: postDataFromFE.name,
            address: postDataFromFE.address,
            districtId: postDataFromFE.districtId
        };

        return request(httpRequestParams);
    }
}

module.exports = ParkModel;