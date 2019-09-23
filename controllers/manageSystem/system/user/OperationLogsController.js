const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class OperationLogsController {
    // ....
    // ..获取日志列表
    // ....
    static async getLogsList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo' ,'pageSize', 'keywords', 'startDate', 'endDate']
            },
            method: manageSystemModel.systemModel.userModel.operationLogsModel.getLogsList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const logsList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        logsId: responseData.returnData.data.list[i].id,
                        description: responseData.returnData.data.list[i].description,
                        userName: responseData.returnData.data.list[i].userRealName,
                        cellphone: responseData.returnData.data.list[i].userCellphone,
                        operationDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime')
                    };
                    logsList.push(temp);
                }
                returnData.logsList = logsList;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = OperationLogsController;