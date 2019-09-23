const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class AnnouncementModel {
    // ....
    // ..获取公告列表
    // ....
    static getAnnouncementList({ userId, parkId }) {
        const api = requestAPIList['61']['6101'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取活动详情
    // ....
    static getAnnouncementInfo({ userId, announcementId }) {
        const api = requestAPIList['61']['6102'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            announcementId
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }
}
	

module.exports = AnnouncementModel;