// 维修服务模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const systemModel = require('../../../models/SystemModel');

class RepairmentController {
    /**
     * @api {POST} /api/system/service/repairment/personalRepair 居家报修
     * @apiName personal repair
     * @apiGroup System Service Repairment
     * @apiVersion 1.4.1
     * @apiDescription 居家报修
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 房间ID
     * @apiParam {string} repairmentArea 报修区域
     * @apiParam {string} repairmentContent 报修详情
     * @apiParam {array} repairmentImgUrl 报修图片地址
     * @apiParam {string} bestTime 最佳上门时间
     * @apiParam {string} name 报修联系人姓名
     * @apiParam {string} cellphone 报修联系人联系方式
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/service/repairment/personalRepair
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "repairmentArea": "银泰城1-1-1",
     *     "repairmentContent": "游泳池坏了",
     *     "repairmentImgUrl": [],
     *     "bestTime": "周一, 周二 16:00至23:00"
     *     "name": "徐凌",
     *     "cellphone": "13333333333"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async personalRepair(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'roomId', 'repairmentArea', 'repairmentContent', 'repairmentImgUrl', 'bestTime', 'name', 'cellphone']
            },
            method: systemModel.serviceModel.repairmentModel.personalRepair,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/service/repairment/commonRepair 公共报修
     * @apiName common repair
     * @apiGroup System Service Repairment
     * @apiVersion 1.4.1
     * @apiDescription 公共报修
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 房间ID
     * @apiParam {string} repairmentArea 报修区域
     * @apiParam {string} repairmentContent 报修详情
     * @apiParam {array} repairmentImgUrl 报修图片地址
     * @apiParam {string} name 报修联系人姓名
     * @apiParam {string} cellphone 报修联系人联系方式
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/service/repairment/personalRepair
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "repairmentArea": "楼下游泳池",
     *     "repairmentContent": "游泳池坏了",
     *     "repairmentImgUrl": [],
     *     "name": "徐凌",
     *     "cellphone": "13333333333"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async commonRepair(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'roomId', 'repairmentArea', 'repairmentContent', 'repairmentImgUrl', 'name', 'cellphone']
            },
            method: systemModel.serviceModel.repairmentModel.commonRepair,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
}

module.exports = RepairmentController;