const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class ComplaintModel {
    // ....
    // ..获取投诉列表
    // ....
    static getComplaintList({ userId, parkId }) {
        const api = requestAPIList['27']['2702'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId,
            type: 1
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取表扬列表
    // ....
    static getPraiseList({ userId, parkId }) {
        const api = requestAPIList['27']['2702'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId,
            type: 2
        };

        return request(httpRequestParams);
    }

    // ....
    // ..提出表扬投诉
    // ....
    static submitComplaint({ userId, postDataFromFE }) {
        const api = requestAPIList['27']['2701'];
        const { parkId, title, description, imgList, type, roomId } = postDataFromFE;
        const postData = {
            userId,
            parkId,
            type,
            roomId,
            subject: title,
            content: description,
            pictures: imgList
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..获取表扬投诉详情
    // ....
    static getComplaintInfo({ userId, id }) {
        const api = requestAPIList['27']['2703'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..删除表扬投诉
    // ....
    static deleteComplaint({ userId, id }) {
        const api = requestAPIList['27']['2704'];
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
	

module.exports = ComplaintModel;