const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class ActivityModel {
    // ....
    // ..获取活动列表
    // ....
    static getActivityList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['30']['3003'];
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
    // ..获取活动详情
    // ....
    static getActivityInfo({ accountId, parkId, id }) {
        const api = requestAPIList['30']['3004'];
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
    // ..获取活动的报名名单
    // ....
    static getActivityEnrollList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['30']['3006'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };

        return request(httpRequestParams);
    }

    // ....
    // ..添加活动
    // ....
    static addActivity({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['30']['3001'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            title: postDataFromFE.title,
            content: postDataFromFE.content,
            applyEndDate: dateTransition(postDataFromFE.enrollEndDate, 'datetime'),
            totalCount: postDataFromFE.maxCount,
            imgUrlList: postDataFromFE.imgList,
            beginDatetime: dateTransition(postDataFromFE.activityStartDatetime, 'datetime'),
            endDatetime: dateTransition(postDataFromFE.activityEndDatetime, 'datetime'),
            objectDescription: postDataFromFE.target,
            linkMan: postDataFromFE.contact,
            linkPhone: postDataFromFE.cellphone,
            address: postDataFromFE.address
        };

        return request(httpRequestParams);
    }

    // ....
    // ..编辑活动
    // ....
    static editActivity({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['30']['3002'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            title: postDataFromFE.title,
            content: postDataFromFE.content,
            applyEndDate: dateTransition(postDataFromFE.enrollEndDate, 'datetime'),
            totalCount: postDataFromFE.maxCount,
            imgUrlList: postDataFromFE.imgList,
            beginDatetime: dateTransition(postDataFromFE.activityStartDatetime, 'datetime'),
            endDatetime: dateTransition(postDataFromFE.activityEndDatetime, 'datetime'),
            objectDescription: postDataFromFE.target,
            linkMan: postDataFromFE.contact,
            linkPhone: postDataFromFE.cellphone,
            address: postDataFromFE.address
        };

        return request(httpRequestParams);
    }

    // ....
    // ..导出活动报名列表
    // ....
    static exportEnrollList({ accountId, parkId, id }) {
        const api = requestAPIList['30']['3005'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        }

        return request(httpRequestParams);
    }
}

module.exports = ActivityModel;