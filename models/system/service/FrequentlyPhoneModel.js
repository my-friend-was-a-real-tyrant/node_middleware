const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class FrequentlyPhoneModel {
    // ....
    // ..获取常用电话列表
    // ....
    static getFrequentlyPhoneList({ userId, parkId }) {
        const api = requestAPIList['67']['6701'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId
        };

        return request(httpRequestParams);
    }
}
	

module.exports = FrequentlyPhoneModel;