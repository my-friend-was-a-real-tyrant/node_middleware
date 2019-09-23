const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class ExceptionController {
    // ....
    // ..获取异常日志列表
    // ....
    static async getLogsList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate']
            },
            method: manageSystemModel.systemModel.systemModel.exceptionLogModel.getLogsList,
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
                        module: responseData.returnData.data.list[i].module,
                        parameters: responseData.returnData.data.list[i].parameters,
                        content: responseData.returnData.data.list[i].content
                    };
                    logsList.push(temp);
                }
                returnData.logsList = logsList;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ExceptionController;