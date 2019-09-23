const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class ActivityModel {
    // ....
    // ..获取活动列表
    // ....
    static getActivityList({ userId, parkId, roomId }) {
        const api = requestAPIList['29']['2904'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId,
            roomId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取活动详情
    // ....
    static getActivityInfo({ userId, activityId }) {
        const api = requestAPIList['29']['2907'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            activityId
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..报名活动
    // ....
    static enrollActivity({ userId, postDataFromFE }) {
        const api = requestAPIList['29']['2901'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });
        httpRequestParams.myParams = {
            userId,
            parkId: postDataFromFE.parkId,
            userCount: postDataFromFE.count,
            userCellphone: postDataFromFE.cellphone,
            userName: postDataFromFE.name,
            roomId: postDataFromFE.roomId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取已报名的活动列表
    // ....
    static getEnrolledActivityList({ userId, parkId, roomId }) {
        const api = requestAPIList['29']['2904'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId,
            roomId,
            applied: 1
        };

        return request(httpRequestParams);
    }

    // ....
    // ..取消报名活动
    // ....
    static cancelEnrollActivity({ userId, id }) {
        const api = requestAPIList['29']['2906'];
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
	

module.exports = ActivityModel;