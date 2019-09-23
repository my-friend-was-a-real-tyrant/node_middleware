const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const { serverHostname } = require('../../common/constant');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class MyReportController {
    /**
     * @api {GET} /api/system/personalCenter/getReportList 获取用户报事列表
     * @apiName get my report list
     * @apiGroup System PersonalCenter MyReport
     * @apiVersion 1.4.1
     * @apiDescription 获取用户报事列表
     * 
     * @apiParam {int} parkId 园区ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/personalCenter/getReportList
     *   {
     *     "parkId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} allReportList 全部报修列表
     * @apiSuccess (Reponse 200) {array} handlingReportList 审核中报修列表
     * @apiSuccess (Reponse 200) {array} handledReportList 已转送报修列表
     * @apiSuccess (list) {int} id 报修ID
     * @apiSuccess (list) {string} type 描述
     * @apiSuccess (list) {string} date 报修日期
     * @apiSuccess (list) {string} title 报修地点
     * @apiSuccess (list) {int} status 报修状态
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "allReportList": [{
     *         "id": 1,
     *         "type": "绿化报事",
     *         "date": "2017-02-02",
     *         "title": "楼下游泳池",
     *         "status": 1
     *     }],
     *     "handlingReportList": [],
     *     "handledReportList": []
     *   }
     * 
     *
     */
    static async getReportList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'parkId'
            },
            method: systemModel.personalCenterModel.myReportModel.getReportList,
            params: {
                userId,
                parkId: params.parkId
            },
            success(responseData) {
                const allReportList = [];
                const handlingReportList = []; // 处理中列表
                const handledReportList = []; // 处理完成列表
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const date = dateTransition(responseData.returnData.data[i].createDatetime);

                    const tempRepairment = {
                        id: responseData.returnData.data[i].id,
                        type: responseData.returnData.data[i].type === 1 
                            ? '服务报事'
                            : (responseData.returnData.data[i].type === 2 
                            ? '安保报事' 
                            : (responseData.returnData.data[i].type === 3 
                            ? '绿化报事' 
                            : (responseData.returnData.data[i].type === 4 
                            ? '设备报事' : ''))),
                        date,
                        title: responseData.returnData.data[i].subject,
                        status: responseData.returnData.data[i].status
                    }
                    allReportList.push(tempRepairment);
                    switch(tempRepairment.status) {
                        case 1:
                            handlingReportList.push(tempRepairment);
                            break;
                        case 2:
                            handledReportList.push(tempRepairment);
                            break;
                    }
                }
                returnData.allReportList = allReportList;
                returnData.handlingReportList = handlingReportList;
                returnData.handledReportList = handledReportList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/personalCenter/getReportInfo 获取用户报事详情
     * @apiName get my report info
     * @apiGroup System PersonalCenter MyReport
     * @apiVersion 1.4.1
     * @apiDescription 获取用户报事详情
     * 
     * @apiParam {int} id 报事ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/personalCenter/getReportInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} info 全部报修列表
     * @apiSuccess (info) {int} id 报事id
     * @apiSuccess (info) {string} type 类型
     * @apiSuccess (info) {string} title 标题
     * @apiSuccess (info) {string} content 内容
     * @apiSuccess (info) {string} datetime 发布时间
     * @apiSuccess (info) {int} status 状态
     * @apiSuccess (info) {string} statusChangeTime  状态改变时间
     * @apiSuccess (info) {stringArray} imgList 图片列表
     * @apiSuccess (info) {string} remark 备注
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "info": {
     *         "id": 1,
     *         "type": "绿化报事",
     *         "title": "标题",
     *         "content": "楼下游泳池",
     *         "datetime": "2017-02-02 18:18",
     *         "status": 1,
     *         "statusChangeTime": "2017-02-02 18:18",
     *         "imgList": ["12.jpg"],
     *         "remark": "备注"
     *     }
     *   }
     * 
     *
     */
    static async getReportInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: systemModel.personalCenterModel.myReportModel.getReportInfo,
            params: {
                userId,
                id: params.id
            },
            success(responseData) {
                const temp = {
                    id: responseData.returnData.data.id,
                    type: responseData.returnData.data.type === 1 
                        ? '服务报事'
                        : (responseData.returnData.data.type === 2 
                        ? '安保报事' 
                        : (responseData.returnData.data.type === 3 
                        ? '绿化报事' 
                        : (responseData.returnData.data.type === 4 
                        ? '设备报事' : ''))),
                    title: responseData.returnData.data.subject,
                    content: responseData.returnData.data.content,
                    datetime: dateTransition(responseData.returnData.data.createDatetime, 'minute'),
                    status: responseData.returnData.data.status,
                    statusChangeTime: responseData.returnData.data.reportRecordsList.length > 0 
                        ? dateTransition(responseData.returnData.data.reportRecordsList[responseData.returnData.data.reportRecordsList.length - 1].createDatetime, 'minute')
                        : '',
                    imgList: [],
                    remark: responseData.returnData.data.reportRecordsList.length > 0 
                        ? responseData.returnData.data.reportRecordsList[responseData.returnData.data.reportRecordsList.length - 1].remark
                        : ''
                };
                for (let i = 0; i < responseData.returnData.data.pictures.length; i ++) {
                    temp.imgList.push(serverHostname + responseData.returnData.data.pictures[i]);
                }
                returnData.info = temp;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = MyReportController;