// 园区报事模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const systemModel = require('../../../models/SystemModel');

class ReportController {
    /**
     * @api {POST} /api/system/service/report/submitReport 园区报事
     * @apiName submit report
     * @apiGroup System Service Report
     * @apiVersion 1.4.1
     * @apiDescription 园区报事
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 房间ID
     * @apiParam {int} type 报事类型
     * @apiParam {string} title 报事标题
     * @apiParam {string} content 报事详情
     * @apiParam {array} imgList 报事图片地址
     * @apiParam {string} name 报事联系人姓名
     * @apiParam {string} cellphone 报事联系人联系方式
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/service/report/submitReport
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "type": 1,
     *     "title": "haha",
     *     "content": "游泳池坏了",
     *     "imgList": [],
     *     "name": "徐凌",
     *     "cellphone": "13333333333"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async submitReport(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'roomId', 'type', 'title', 'content', 'imgList', 'name', 'cellphone']
            },
            method: systemModel.serviceModel.reportModel.submitReport,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ReportController;