const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class FunctionStatisticsModel {
    // ....
    // ..获取表扬投诉数据
    // ....
    static getComlpaintStatistics({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['28']['2807'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取报修数据
    // ....
    static getRepairmentStatistics({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['26']['2615'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取报事数据
    // ....
    static getReportStatistics({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['66']['6605'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取咨询建议数据
    // ....
    static getSuggestionStatistics({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['64']['6405'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取活动数据
    // ....
    static getActivityStatistics({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['30']['3008'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取报修图表数据
    // ....
    static getRepairmentCharts({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['26']['2614'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取表扬投诉图表数据
    // ....
    static getComplaintCharts({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['28']['2806'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取报事图表数据
    // ....
    static getReportCharts({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['66']['6604'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取咨询建议图表数据
    // ....
    static getSuggestionCharts({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['64']['6404'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取园区活动图表数据
    // ....
    static getActivityCharts({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['30']['3007'];
        const params = {
            accountId,
            parkId,
            type: postDataFromFE.type,
            date: postDataFromFE.date,
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = FunctionStatisticsModel;