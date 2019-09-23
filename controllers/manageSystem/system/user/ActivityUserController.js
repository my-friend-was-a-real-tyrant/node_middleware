const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class ActivityUserController {
    // ....
    // ..获取活跃用户数据
    // ....
    static async getActivityUser(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['type' ,'date']
            },
            method: manageSystemModel.systemModel.userModel.activityUserModel.getActivityUser,
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

module.exports = ActivityUserController;