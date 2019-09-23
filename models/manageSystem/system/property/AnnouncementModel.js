const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class AnnouncementModel {
    // ....
    // ..获取公告列表
    // ....
    static getAnnouncementList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['62']['6202'];
        const params = {
            parkId,
            accountId, 
            keywords: postDataFromFE.keywords,
            earliestCreateDatetime: dateTransition(postDataFromFE.startDate),
            latestCreateDatetime: dateTransition(postDataFromFE.endDate),
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取公告详情
    // ....
    static getAnnouncementInfo({ accountId, parkId, id }) {
        const api = requestAPIList['62']['6203'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };
        return request(httpRequestParams);
    }

    // ....
    // ..添加活动
    // ....
    static addAnnouncement({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['62']['6201'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            subject: postDataFromFE.title,
            content: postDataFromFE.content,
            picturePathList: postDataFromFE.imgList,
            contactPerson: postDataFromFE.contact,
            contactCellphone: postDataFromFE.cellphone
        };

        return request(httpRequestParams);
    }

    // ....
    // ..编辑公告
    // ....
    static editAnnouncement({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['62']['6204'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            subject: postDataFromFE.title,
            content: postDataFromFE.content,
            picturePathList: postDataFromFE.imgList,
            contactPerson: postDataFromFE.contact,
            contactCellphone: postDataFromFE.cellphone
        };

        return request(httpRequestParams);
    }

    // ....
    // ..删除公告
    // ....
    static deleteAnnouncement({ accountId, parkId, id }) {
        const api = requestAPIList['62']['6205'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }
}

module.exports = AnnouncementModel;