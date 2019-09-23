const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const { serverHostname } = require('../../common/constant');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class MyRepairmentController {
    /**
     * @api {GET} /api/system/personalCenter/getRepairmentList 获取用户报修列表
     * @apiName get my repairment list
     * @apiGroup System PersonalCenter MyRepairment
     * @apiVersion 1.4.1
     * @apiDescription 获取用户报修列表
     * 
     * @apiParam {int} parkId 园区ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/personalCenter/getRepairmentList
     *   {
     *     "parkId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} repairmentList 全部报修列表
     * @apiSuccess (Reponse 200) {array} auditingRepairmentList 审核中报修列表
     * @apiSuccess (Reponse 200) {array} reportedRepairmentList 已转送报修列表
     * @apiSuccess (Reponse 200) {array} repairingRepairmentList 维修中报修列表
     * @apiSuccess (Reponse 200) {array} finishRepairmentList 待评价报修列表
     * @apiSuccess (list) {int} repairmentId 报修ID
     * @apiSuccess (list) {string} description 描述
     * @apiSuccess (list) {string} date 报修日期
     * @apiSuccess (list) {string} area 报修地点
     * @apiSuccess (list) {int} status 报修状态
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairmentList": [{
     *         "repairmentId": 1,
     *         "description": "哈哈哈",
     *         "date": "2017-02-02",
     *         "area": "楼下游泳池",
     *         "status": 1
     *     }],
     *     "auditingRepairmentList": [],
     *     "reportedRepairmentList": [],
     *     "repairingRepairmentList": [],
     *     "finishRepairmentList": []
     *   }
     * 
     *
     */
    static async getRepairmentList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'parkId'
            },
            method: systemModel.personalCenterModel.myRepairmentModel.getRepairmentList,
            params: {
                userId,
                parkId: params.parkId
            },
            success(responseData) {
                const repairmentList = [];
                const auditingRepairmentList = []; // 审核中列表
                const reportedRepairmentList = []; // 已转送列表
                const repairingRepairmentList = []; // 维修中列表
                const finishRepairmentList = []; // 待评价列表
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const date = dateTransition(responseData.returnData.data[i].createDatetime);

                    const tempRepairment = {
                        repairmentId: responseData.returnData.data[i].id,
                        description: responseData.returnData.data[i].description,
                        date,
                        area: responseData.returnData.data[i].region,
                        status: responseData.returnData.data[i].status
                    }
                    repairmentList.push(tempRepairment);
                    switch(tempRepairment.status) {
                        case 1:
                            auditingRepairmentList.push(tempRepairment);
                            break;
                        case 4:
                            reportedRepairmentList.push(tempRepairment);
                            break;
                        case 2:
                            repairingRepairmentList.push(tempRepairment);
                            break;
                        case 5:
                            finishRepairmentList.push(tempRepairment); 
                            break;
                    }
                }
                returnData.repairmentList = repairmentList;
                returnData.auditingRepairmentList = auditingRepairmentList;
                returnData.reportedRepairmentList = reportedRepairmentList;
                returnData.repairingRepairmentList = repairingRepairmentList;
                returnData.finishRepairmentList = finishRepairmentList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/personalCenter/getRepairmentInfo 获取用户报修详情
     * @apiName get my repairment info
     * @apiGroup System PersonalCenter MyRepairment
     * @apiVersion 1.4.1
     * @apiDescription 获取用户报修详情
     * 
     * @apiParam {int} repairmentId 报修ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/personalCenter/getRepairmentInfo
     *   {
     *     "repairmentId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} info 报修详情
     * @apiSuccess (info) {string} repairmentType 报修类型
     * @apiSuccess (info) {string} repairmentContent 报修描述
     * @apiSuccess (info) {string} repairmentArea 报修地点
     * @apiSuccess (info) {string} bestTime 最佳上门时间
     * @apiSuccess (info) {string} repairmentCreateTime 报修日期
     * @apiSuccess (info) {int} repairmentStatus 报修状态
     * @apiSuccess (info) {string} repairMan 维修员姓名
     * @apiSuccess (info) {string} repairManCellphone 维修员手机号
     * @apiSuccess (info) {string} statusChangeTime 最后一次状态改变时间
     * @apiSuccess (info) {array} userImgList 用户转送图
     * @apiSuccess (info) {array} manageImgList 物业转送图
     * @apiSuccess (info) {string} remark 备注
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "info": {
     *         "repairmentType": "居家报修",
     *         "repairmentContent": "xxx坏了",
     *         "repairmentArea": "楼下游泳池",
     *         "bestTime": "周一, 周二, 16:00至23:00",
     *         "repairmentCreateTime": "2017-02-02 hh-mm-ss",
     *         "repairmentStatus": 1,
     *         "repairMan": "徐凌",
     *         "repairManCellphone": "13333333333",
     *         "statusChangeTime": "2017-02-02 hh-mm-ss",
     *         "userImgList": [],
     *         "manageImgList": [],
     *         "remark": "这是一个备注"
     *     }
     *   }
     * 
     *
     */
    static async getRepairmentInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'repairmentId'
            },
            method: systemModel.personalCenterModel.myRepairmentModel.getRepairmentInfo,
            params: {
                userId,
                repairmentId: params.repairmentId
            },
            success(responseData) {
                const tempInfo = {
                    repairmentType: '',
                    repairmentContent: '',
                    repairmentArea: '',
                    bestTime: '',
                    repairmentCreateTime: '',
                    repairmentStatus: '',
                    repairMan: '',
                    repairManCellphone: '',
                    statusChangeTime: '',
                    userImgList: [],
                    manageImgList: [],
                    remark: ''
                }
                tempInfo.repairmentType = responseData.returnData.data.type === 1 ? '居家报修' : '公共报修';
                tempInfo.repairmentContent = responseData.returnData.data.description;
                tempInfo.repairmentArea = responseData.returnData.data.region;
                tempInfo.bestTime = responseData.returnData.data.bestTimeDescribe;
                tempInfo.repairmentCreateTime = dateTransition(responseData.returnData.data.createDatetime, 'datetime');
                tempInfo.repairmentStatus = responseData.returnData.data.status;
                tempInfo.repairMan = responseData.returnData.data.serviceman;
                tempInfo.repairManCellphone = responseData.returnData.data.servicemanCellphone;
                tempInfo.remark = responseData.returnData.data.recordsList.length === 0 
                    ? ''
                    : (responseData.returnData.data.recordsList[responseData.returnData.data.recordsList.length - 1].remark === ''
                    ? responseData.returnData.data.recordsList[responseData.returnData.data.recordsList.length - 1].description 
                    : responseData.returnData.data.recordsList[responseData.returnData.data.recordsList.length - 1].remark);
                for (let i = 0; i < responseData.returnData.data.pictureList.length; i ++) {
                    const url = serverHostname + responseData.returnData.data.pictureList[i];
                    tempInfo.userImgList.push(url);
                }
                for (let i = 0; i < responseData.returnData.data.managePictureList.length; i ++) {
                    const url = serverHostname + responseData.returnData.data.managePictureList[i];
                    tempInfo.manageImgList.push(url);
                }
                if (Object.prototype.hasOwnProperty.call(responseData.returnData.data, 'lastStatusChangeDatetime') === true) {
                    tempInfo.statusChangeTime = dateTransition(responseData.returnData.data.lastStatusChangeDatetime, 'datetime');
                }
                returnData.info = tempInfo;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/personalCenter/assessRepairment 评价维修服务
     * @apiName assess repairment
     * @apiGroup System PersonalCenter MyRepairment
     * @apiVersion 1.4.1
     * @apiDescription 评价维修服务
     * 
     * @apiParam {int} repairmentId 报修ID
     * @apiParam {int} assess 评价(1, 3, 5)
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/personalCenter/assessRepairment
     *   {
     *     "repairmentId": 1,
     *     "assess": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async assessRepairment(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['repairmentId', 'assess']
            },
            method: systemModel.personalCenterModel.myRepairmentModel.assessRepairment,
            params: {
                userId,
                repairmentId: postData.repairmentId,
                assess: postData.assess
            }
        });
        ctx.body = returnData;
    }
}

module.exports = MyRepairmentController;