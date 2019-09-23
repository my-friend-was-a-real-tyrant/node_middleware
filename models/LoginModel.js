const requestAPIList = require('./common/requestAPIList');
const NewRequestParams = require('./common/NewRequestParams');
const request = require('request-promise');

class LoginModel {    
    // ....
    // ..获取验证码
    // ....
    static getSmscode({ cellphone }) {
        const api = requestAPIList['15']['1512'];
        const httpRequestParams = new NewRequestParams(api);
        const postData = {
            cellphone
        };
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..绑定手机
    // ....
    static bindCellphone({ openid, headimgurl, cellphone, smscode }) {
        const api = requestAPIList['15']['1513'];
        const httpRequestParams = new NewRequestParams(api);
        const postData = {
            openId: openid,
            avatar: headimgurl,
            cellphone,
            authCode: smscode
        };
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..app绑定手机
    // ....
    static appBindCellphone({ cellphone, smscode }) {
        const api = requestAPIList['15']['1513'];
        const httpRequestParams = new NewRequestParams(api);
        const postData = {
            cellphone,
            authCode: smscode
        };
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取园区列表
    // ....
    static getParkList() {
        const api = requestAPIList['21']['2101'];
        const httpRequestParams = new NewRequestParams(api);

        return (request(httpRequestParams));
    }

    // ....
    // ..获取楼栋列表
    // ....
    static getBuildingList({ parkId }) {
        const api = requestAPIList['21']['2102'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: parkId
        });

        return (request(httpRequestParams));
    }

    // ....
    // ..获取房屋列表
    // ....
    static getRoomList({ buildId }) {
        const api = requestAPIList['21']['2103'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            code: buildId
        });

        return (request(httpRequestParams));
    }

    // ....
    // ..登录申请
    // ....
    static apply({ userId, postDataFromFE }) {
        const api = requestAPIList['23']['2301'];
        const httpRequestParams = new NewRequestParams(api);
        const postData = {
            userId,
            userRealName: postDataFromFE.myName,
            proprietorType: postDataFromFE.identity,
            proprietorName: postDataFromFE.hostName,
            proprietorCellphone: postDataFromFE.hostCellphone,
            roomId: postDataFromFE.roomId
        };
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..我有邀请码
    // ....
    static invite({ userId, postDataFromFE }) {
        const api = requestAPIList['23']['2315'];
        const httpRequestParams = new NewRequestParams(api);
        postDataFromFE.userId = userId;
        httpRequestParams.myParams = postDataFromFE;

        return (request(httpRequestParams));
    }
}

module.exports = LoginModel;