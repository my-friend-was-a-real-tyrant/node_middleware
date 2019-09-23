const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class UserStatisticsController {
    // ....
    // ..获取活跃用户数据
    // ....
    static async getUserStatistics(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: manageSystemModel.systemModel.userModel.userStatisticsModel.getUserStatistics,
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

module.exports = UserStatisticsController;