const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class MyFamilyModel {

    // ....
    // ..获取我的家庭所需信息
    // ....
    static getMyFamilyInfo({ userId, roomId }) {
        const api = requestAPIList['23']['2302'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: roomId
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取家庭成员信息
    // ....
    static getMemberInfo({ userId, id, auditStatus }) {
        const api = requestAPIList['23']['2308'];
        const httpRequestParams = new NewRequestParams(api);
        
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            userId,
            auditStatus
        };

        return request(httpRequestParams);
    }

    // ....
    // ..设置房屋代理人
    // ....
    static setAgent({ userId, id }) {
        const api = requestAPIList['23']['2303'];
        const postData = {
            userId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id,
            operation: 4
        });
        httpRequestParams.myParams = postData

        return request(httpRequestParams);
    }

    // ....
    // ..取消房屋代理人
    // ....
    static cancelAgent({ userId, id }) {
        const api = requestAPIList['23']['2303'];
        const postData = {
            userId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id,
            operation: 5
        });
        httpRequestParams.myParams = postData

        return request(httpRequestParams);
    }

    // ....
    // ..同意/拒绝
    // ....
    static auditMember({ type, userId, id }) {
        const api = requestAPIList['23']['2313'];
        const postData = {
            userId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id,
            operation: type === 'agree' ? 1 : 2
        });
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..获取用户房屋列表
    // ....
    static getMyRoomList({ userId }) {
        const api = requestAPIList['23']['2307'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..用户切换园区（选择默认园区）
    // ....
    static setDefaultRoom({ userId, roomId }) {
        const api = requestAPIList['23']['2310'];
        const postData = {
            userId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: roomId
        });
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..删除用户
    // ....
    static delMember({ userId, id }) {
        const api = requestAPIList['23']['2303'];
        const postData = {
            userId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id,
            operation: 3
        });
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..邀请用户
    // ....
    static inviteMember({ userId, postDataFromFE }) {
        const api = requestAPIList['23']['2314'];
        const postData = {
            userId,
            inviteCellphone: postDataFromFE.cellphone,
            inviteName: postDataFromFE.name,
            parkId: postDataFromFE.parkId,
            roomId: postDataFromFE.roomId,
            identity: postDataFromFE.identity
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }
}

module.exports = MyFamilyModel;