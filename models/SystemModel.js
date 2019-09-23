const NewRequestParams = require('./common/NewRequestParams');

const requestAPIList = require('./common/requestAPIList');

const personalCenterModel = require('./system/PersonalCenterModel');
const serviceModel = require('./system/ServiceModel');
const lifeModel = require('./system/LifeModel');

const request = require('request-promise');

class SystemModel {
    // ....
    // ..获取初始信息
    // ....
    static getInitInfo({ userId }) {
        const api = requestAPIList['23']['2311'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }
}

module.exports = {
    getInitInfo: SystemModel.getInitInfo,
    personalCenterModel,
    serviceModel,
    lifeModel
};