const baseController = require('../../common/ResDataFormat');
const dateTransition = require('../../common/dateTransition');
const exception = require('../../common/requestModule');
const manageSystemModel = require('../../../models/ManageSystemModel');
const { serverHostname } = require('../../common/constant');

const url = require('url');

class FeedbackController {
    // ....
    // ..获取意见反馈列表
    // ....
    static async getFeedbackList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.feedbackModel.getFeedbackList,
            params: {
                accountId
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取意见反馈详情
    // ....
    static async getFeedbackInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'adviceId'
            },
            method: manageSystemModel.systemModel.feedbackModel.getFeedbackInfo,
            params: {
                accountId,
                adviceId: params.adviceId
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
                for (let i = 0; i < returnData.data.advicePictureList.length; i ++) {
                    returnData.data.advicePictureList[i] = serverHostname + returnData.data.advicePictureList[i].path;
                }
            }
        });
        ctx.body = returnData;
    }
}

module.exports = FeedbackController;