// 表扬投诉模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const { serverHostname } = require('../../common/constant');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class ComplaintController {
    /**
     * @api {GET} /api/system/service/complaint/getComplaintList 获取用户表扬投诉列表
     * @apiName get my complaint list
     * @apiGroup System Service Complaint
     * @apiVersion 1.4.1
     * @apiDescription 获取用户表扬投诉列表
     * 
     * @apiParam {int} parkId 园区ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/complaint/getComplaintList
     *   {
     *     "parkId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} complaintList 全部报修列表
     * @apiSuccess (Reponse 200) {array} praiseList 审核中报修列表
     * @apiSuccess (list) {int} id 表扬投诉ID
     * @apiSuccess (list) {string} description 描述
     * @apiSuccess (list) {string} title 题目
     * @apiSuccess (list) {string} img 图片地址
     * @apiSuccess (list) {string} date 日期
     * @apiSuccess (list) {string} status 状态
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "complaintList": [{
     *         "id": 1,
     *         "description": "哈哈哈",
     *         "title": "今天我要表扬谁",
     *         "img": "/img/haha/abc.jpg",
     *         "date": "2017-02-02",
     *         "status": "处理中"
     *     }],
     *     "praiseList": []
     *   }
     * 
     *
     */
    static async getComplaintList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'parkId'
            },
            method: [systemModel.serviceModel.complaintModel.getComplaintList, systemModel.serviceModel.complaintModel.getPraiseList],
            params: [{
                userId,
                parkId: params.parkId
            }, {
                userId,
                parkId: params.parkId
            }],
            success(responseArr) {
                returnData.complaintList = [];
                for (let i = 0; i < responseArr[0].returnData.data.length; i ++) {
                    const temp = {
                        id: responseArr[0].returnData.data[i].id,
                        title: responseArr[0].returnData.data[i].subject,
                        description: responseArr[0].returnData.data[i].content.length > 35
                            ? responseArr[0].returnData.data[i].content.slice(0, 35).concat('...')
                            : responseArr[0].returnData.data[i].content,
                        img: responseArr[0].returnData.data[i].pictures.length > 0 
                            ? (serverHostname + responseArr[0].returnData.data[i].pictures[0])
                            : '',
                        date: dateTransition(responseArr[0].returnData.data[i].createDatetime),
                        status: responseArr[0].returnData.data[i].status === 1 ? '处理中' : '处理完成'
                    };
                    returnData.complaintList.push(temp);
                }
                returnData.praiseList = [];
                for (let i = 0; i < responseArr[1].returnData.data.length; i ++) {
                    const temp = {
                        id: responseArr[1].returnData.data[i].id,
                        title: responseArr[1].returnData.data[i].subject,
                        description: responseArr[1].returnData.data[i].content.length > 35
                            ? responseArr[1].returnData.data[i].content.slice(0, 35).concat('...')
                            : responseArr[1].returnData.data[i].content,
                        img: responseArr[1].returnData.data[i].pictures.length > 0 
                            ? (serverHostname + responseArr[1].returnData.data[i].pictures[0])
                            : '',
                        date: dateTransition(responseArr[1].returnData.data[i].createDatetime)
                    }
                    returnData.praiseList.push(temp);
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/service/complaint/submitComplaint 用户表扬投诉
     * @apiName submit complaint
     * @apiGroup System Service Complaint
     * @apiVersion 1.4.1
     * @apiDescription 用户表扬投诉
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 房间ID
     * @apiParam {string} title 表扬投诉标题
     * @apiParam {string} description 表扬投诉详情
     * @apiParam {array} imgList 表扬投诉附图
     * @apiParam {int} type 表扬投诉类型,1投诉2表扬
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/service/complaint/submitComplaint
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "title": "我要表扬谁",
     *     "description": "哈哈哈哈哈哈",
     *     "imgList": [],
     *     "type": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async submitComplaint(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'title', 'description', 'imgList', 'type', 'roomId']
            },
            method: systemModel.serviceModel.complaintModel.submitComplaint,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/service/complaint/getComplaintInfo 获取用户表扬投诉详情
     * @apiName get my complaint info
     * @apiGroup System Service Complaint
     * @apiVersion 1.4.1
     * @apiDescription 获取用户表扬投诉详情
     * 
     * @apiParam {int} id 表扬投诉ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/complaint/getComplaintInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {string} title 表扬投诉题目
     * @apiSuccess (Reponse 200) {string} date 表扬投诉日期
     * @apiSuccess (Reponse 200) {string} img 表扬投诉图片
     * @apiSuccess (Reponse 200) {string} description 表扬投诉详情
     * @apiSuccess (Reponse 200) {string} status 状态
     * @apiSuccess (Reponse 200) {string} changeDatetime 最后一个状态改变时间
     * @apiSuccess (Reponse 200) {string} remark 备注
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "title": "我要表扬谁",
     *     "date": "2017-02-02",
     *     "img": "/a/a/a.jpg",
     *     "description": "哈哈哈哈哈哈哈",
     *     "status": "处理中",
     *     "changeDatetime": "2017-02-02 hh:mm",
     *     "remark": "备注"
     *   }
     * 
     *
     */
    static async getComplaintInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: systemModel.serviceModel.complaintModel.getComplaintInfo,
            params: {
                userId,
                id: params.id
            },
            success(responseData) {
                returnData.title = responseData.returnData.data.subject;
                returnData.date = dateTransition(responseData.returnData.data.createDatetime);
                returnData.img = responseData.returnData.data.pictures.length > 0 
                    ? serverHostname + responseData.returnData.data.pictures[0]
                    : '';
                returnData.description = responseData.returnData.data.content;
                returnData.status = responseData.returnData.data.status === 1 ? '处理中' : '处理完成';
                returnData.changeDatetime = dateTransition(responseData.returnData.data.createDatetime, 'minute')
                returnData.remark = responseData.returnData.data.operationRecords.length === 0 || responseData.returnData.data.operationRecords[responseData.returnData.data.operationRecords.length - 1].operation === 3
                    ? '无'
                    : responseData.returnData.data.operationRecords[responseData.returnData.data.operationRecords.length - 1].remark;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {DELETE} /api/system/service/complaint/deleteComplaint 删除表扬投诉
     * @apiName delete my complaint
     * @apiGroup System Service Complaint
     * @apiVersion 1.4.1
     * @apiDescription 删除表扬投诉
     * 
     * @apiParam {int} id 表扬投诉详情
     *
     * @apiParamExample {json} Request Example
     *   DELETE /api/system/service/complaint/deleteComplaint
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async deleteComplaint(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: systemModel.serviceModel.complaintModel.deleteComplaint,
            params: {
                userId,
                id: params.id
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ComplaintController;