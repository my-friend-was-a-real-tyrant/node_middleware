const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class FunctionStatisticsController {
    // ....
    // ..获取功能使用数据
    // ....
    static async getFunctionStatistics(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: [manageSystemModel.systemModel.userModel.functionStatisticsModel.getComlpaintStatistics,
                manageSystemModel.systemModel.userModel.functionStatisticsModel.getRepairmentStatistics,
                manageSystemModel.systemModel.userModel.functionStatisticsModel.getReportStatistics,
                manageSystemModel.systemModel.userModel.functionStatisticsModel.getSuggestionStatistics,
                manageSystemModel.systemModel.userModel.functionStatisticsModel.getActivityStatistics],
            params: [{
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            }, {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            }, {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            }, {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            }, {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            }],
            success(responseDataArr) {
                let count = responseDataArr[0].returnData.data.count + 
                    responseDataArr[1].returnData.data.count + 
                    responseDataArr[2].returnData.data.count + 
                    responseDataArr[3].returnData.data.count + 
                    responseDataArr[4].returnData.data.count;
                if (count === 0) {
                    count = 1;
                }
                returnData.data = {
                    complaint: {
                        count: responseDataArr[0].returnData.data.count,
                        percent: Math.round((responseDataArr[0].returnData.data.count / count) * 100)
                    },
                    repairment: {
                        count: responseDataArr[1].returnData.data.count,
                        percent: Math.round((responseDataArr[1].returnData.data.count / count) * 100)
                    },
                    report: {
                        count: responseDataArr[2].returnData.data.count,
                        percent: Math.round((responseDataArr[2].returnData.data.count / count) * 100)
                    },
                    suggestion: {
                        count: responseDataArr[3].returnData.data.count,
                        percent: Math.round((responseDataArr[3].returnData.data.count / count) * 100)
                    },
                    activity: {
                        count: responseDataArr[4].returnData.data.count,
                        percent: Math.round((responseDataArr[4].returnData.data.count / count) * 100)
                    }
                }
                // returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取报修使用图表数据
    // ....
    static async getRepairmentCharts(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: manageSystemModel.systemModel.userModel.functionStatisticsModel.getRepairmentCharts,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取表扬投诉使用图表数据
    // ....
    static async getComplaintCharts(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: manageSystemModel.systemModel.userModel.functionStatisticsModel.getComplaintCharts,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取报事使用图表数据
    // ....
    static async getReportCharts(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: manageSystemModel.systemModel.userModel.functionStatisticsModel.getReportCharts,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取咨询建议使用图表数据
    // ....
    static async getSuggestionCharts(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: manageSystemModel.systemModel.userModel.functionStatisticsModel.getSuggestionCharts,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取园区活动使用图表数据
    // ....
    static async getActivityCharts(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: manageSystemModel.systemModel.userModel.functionStatisticsModel.getActivityCharts,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = FunctionStatisticsController;