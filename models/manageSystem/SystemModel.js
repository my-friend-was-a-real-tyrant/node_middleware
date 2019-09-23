const requestAPIList = require('../common/requestAPIList');
const NewRequestParams = require('../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

const propertyModel = require('./system/PropertyModel');
const mallModel = require('./system/MallModel');
const managerModel = require('./system/ManagerModel');
const systemModel = require('./system/SystemModel');
const userModel = require('./system/UserModel');
const feedbackModel = require('./system/FeedbackModel');

class SystemModel {
    // ....
    // ..获取园区列表
    // ....
    static getParkList() {
        const api = requestAPIList['21']['2101'];
        const httpRequestParams = new NewRequestParams(api);

        return (request(httpRequestParams));
    }

    static choosePark({ accountId, parkId }) {
        const api = requestAPIList['13']['1321'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..修改密码
    // ....
    static changePassword({ accountId, oldPassword, newPassword }) {
        const api = requestAPIList['13']['1302'];
        const postData = {
            oldPassword,
            newPassword,
            accountId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            operation: 1
        });
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..修改手机号
    // ....
    static changeCellphone({ accountId, oldCellphone, cellphone, smsCode }) {
        const api = requestAPIList['13']['1302'];
        const postData = {
            oldCellphone,
            cellphone,
            accountId,
            authCode: smsCode
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            operation: 2
        });
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取验证码
    // ....
    static getSmsCode({ accountId, cellphone }) {
        const api = requestAPIList['15']['1512'];
        const postData = {
            cellphone,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取验证码
    // ....
    static getIndexComplaintCount({ accountId, parkId }) {
        const api = requestAPIList['28']['2811'];
        const postData = {
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取验证码
    // ....
    static getIndexRepairsCount({ accountId, parkId }) {
        const api = requestAPIList['26']['2611'];
        const postData = {
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取验证码
    // ....
    static getIndexReportsCount({ accountId, parkId }) {
        const api = requestAPIList['66']['6611'];
        const postData = {
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }
    
    // ....
    // ..获取验证码
    // ....
    static getIndexInfo({ accountId, parkId }) {
        const api = requestAPIList['13']['1322'];
        const postData = {
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取报修满意度
    // ....
    static getRepairmentCsr({ accountId, parkId, year }) {
        const api = requestAPIList['26']['2612'];
        const postData = {
            accountId,
            parkId,
            year
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取功能使用量信息
    // ....
    static getFunctionProportion({ accountId, parkId, type }) {
        const api = requestAPIList['26']['2613'];
        const postData = {
            accountId,
            parkId,
            type
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }
}

module.exports = {
    getParkList: SystemModel.getParkList,
    choosePark: SystemModel.choosePark,
    changePassword: SystemModel.changePassword,
    changeCellphone: SystemModel.changeCellphone,
    getSmsCode: SystemModel.getSmsCode,
    getIndexComplaintCount: SystemModel.getIndexComplaintCount,
    getIndexRepairsCount: SystemModel.getIndexRepairsCount,
    getIndexReportsCount: SystemModel.getIndexReportsCount,
    getIndexInfo: SystemModel.getIndexInfo,
    getRepairmentCsr: SystemModel.getRepairmentCsr,
    getFunctionProportion: SystemModel.getFunctionProportion,
    propertyModel,
    mallModel,
    managerModel,
    systemModel,
    userModel,
    feedbackModel
};