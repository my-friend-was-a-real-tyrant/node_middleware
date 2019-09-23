const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class LogsController {
    // ....
    // ..获取操作记录列表
    // ....
    static async getLogsList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate', 'method']
            },
            method: manageSystemModel.systemModel.systemModel.accessLogModel.getLogsList,
            params: {
                accountId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const logsList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        createDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime'),
                        method: responseData.returnData.data.list[i].method,
                        uri: responseData.returnData.data.list[i].uri,
                        responseCode: responseData.returnData.data.list[i].responseCode + '(' + responseData.returnData.data.list[i].responseMessage + ')',
                        responseSubCode: (responseData.returnData.data.list[i].responseSubCode === null || responseData.returnData.data.list[i].responseSubCode === undefined || responseData.returnData.data.list[i].responseSubCode === '') ? "" :  responseData.returnData.data.list[i].responseSubCode + '(' + responseData.returnData.data.list[i].responseSubMessage + ')',
                        parameters: responseData.returnData.data.list[i].parameters,
                        returnData: responseData.returnData.data.list[i].data,
                        sourceIp: responseData.returnData.data.list[i].sourceIp,
                        timeCost: responseData.returnData.data.list[i].timeCost + '毫秒',
                        responseStatus: responseData.returnData.data.list[i].responseStatus
                    };
                    logsList.push(temp);
                }
                returnData.logsList = logsList;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = LogsController;