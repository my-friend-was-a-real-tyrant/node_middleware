// 表扬投诉模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const { serverHostname } = require('../../common/constant');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class ActivityController {
    /**
     * @api {GET} /api/system/service/activity/getActivityList 获取活动列表
     * @apiName get activity list
     * @apiGroup System Service Activity
     * @apiVersion 1.4.1
     * @apiDescription 获取园区活动列表
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 房间ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/complaint/getActivityList
     *   {
     *     "parkId": 1,
     *     "roomId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} activityList 活动列表
     * @apiSuccess (list) {int} id 活动ID
     * @apiSuccess (list) {string} img 活动图片地址
     * @apiSuccess (list) {string} title 题目
     * @apiSuccess (list) {string} date 日期
     * @apiSuccess (list) {string} content 内容（缩略版）
     * @apiSuccess (list) {string} status 报名状态("IN_DATE"-报名中;"OUT_OF_DATE"-已结束)
     * @apiSuccess (list) {int} isFinished 是否过期(0-过期;1-没过期)
     * @apiSuccess (list) {int} actualCount 已报名人数
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "activityList": [{
     *         "id": 1,
     *         "content": "哈哈哈",
     *         "title": "今天我要表扬谁",
     *         "img": "/img/haha/abc.jpg",
     *         "date": "2017-02-02",
     *         "status": "IN_DATE",
     *         "isFinished": 0,
     *         "actualCount": 1
     *     }]
     *   }
     * 
     *
     */
    static async getActivityList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['parkId', 'roomId']
            },
            method: systemModel.serviceModel.activityModel.getActivityList,
            params: {
                userId,
                parkId: params.parkId,
                roomId: params.roomId
            },
            success(responseData) {
                returnData.activityList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].id,
                        title: responseData.returnData.data[i].title,
                        content: responseData.returnData.data[i].content.length > 35
                            ? responseData.returnData.data[i].content.slice(0, 35).concat('...')
                            : responseData.returnData.data[i].content,
                        img: responseData.returnData.data[i].pictures[0] 
                            ? (serverHostname + responseData.returnData.data[i].pictures[0])
                            : '',
                        date: dateTransition(responseData.returnData.data[i].createDatetime),
                        status: responseData.returnData.data[i].remark,
                        isFinished: responseData.returnData.data[i].expire,
                        actualCount: responseData.returnData.data[i].actualCount
                    };
                    returnData.activityList.push(temp);
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/service/activity/getActivityInfo 获取活动详情
     * @apiName get activity info
     * @apiGroup System Service Activity
     * @apiVersion 1.4.1
     * @apiDescription 获取园区活动详情
     * 
     * @apiParam {int} activityId 活动ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/complaint/getActivityInfo
     *   {
     *     "activityId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} activityInfo 活动列表
     * @apiSuccess (info) {string} img 活动图片地址
     * @apiSuccess (info) {string} title 题目
     * @apiSuccess (info) {string} createDatetime 发布时间
     * @apiSuccess (info) {string} content 内容
     * @apiSuccess (info) {string} enrollTime 报名时间
     * @apiSuccess (info) {string} activityTime 活动时间
     * @apiSuccess (info) {string} activityAddress 活动地点
     * @apiSuccess (info) {string} activityTarget 活动对象
     * @apiSuccess (info) {string} contact 联系人
     * @apiSuccess (info) {string} contactCellphone 联系方式
     * @apiSuccess (info) {boolean} isEnrolled 是否报名
     * @apiSuccess (info) {string} status 报名状态("IN_DATE"-报名中;"OUT_OF_DATE"-已结束)
     * @apiSuccess (info) {int} applyId 报名id
     * @apiSuccess (info) {int} actualCount 活动报名人数
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "activityInfo": {
     *         "content": "哈哈哈",
     *         "title": "今天我要表扬谁",
     *         "createDatetime": "2017-12-12", 
     *         "img": "/img/haha/abc.jpg",
     *         "enrollTime": "2017-02-02 至 2017-02-20",
     *         "activityTime": "2017-12-12 12:12 至 2012-12-12 12:12",
     *         "activityAddress": "中大银泰城二期地下防空洞",
     *         "activityTarget": "14至14岁的儿童",
     *         "contact": "王先生",
     *         "contactCellphone": "13333333333",
     *         "isEnrolled": false,
     *         "status": "IN_DATE",
     *         "applyId": 1,
     *         "actualCount": 1
     *     }
     *   }
     * 
     *
     */
    static async getActivityInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'activityId'
            },
            method: systemModel.serviceModel.activityModel.getActivityInfo,
            params: {
                userId,
                activityId: params.activityId
            },
            success(responseData) {
                const temp = {
                    title: responseData.returnData.data.title,
                    createDatetime: dateTransition(responseData.returnData.data.createDatetime),
                    content: responseData.returnData.data.content,
                    img: [],
                    enrollTime: dateTransition(responseData.returnData.data.createDatetime, 'minute') + ' 至 ' + dateTransition(responseData.returnData.data.applyEndDatetime, 'minute'),
                    activityTime: dateTransition(responseData.returnData.data.beginDatetime, 'minute') + ' 至 ' + dateTransition(responseData.returnData.data.endDatetime, 'minute'),
                    activityAddress: responseData.returnData.data.address,
                    activityTarget: responseData.returnData.data.objectDescription,
                    contact: responseData.returnData.data.linkMan,
                    contactCellphone: responseData.returnData.data.linkPhone,
                    isEnrolled: responseData.returnData.data.applied === 'N' 
                        ? false
                        : true,
                    status: responseData.returnData.data.remark,
                    applyId: responseData.returnData.data.applied === 'N' 
                        ? undefined
                        : responseData.returnData.data.applyId,
                    actualCount: responseData.returnData.data.actualCount
                };
                for (let i = 0; i < responseData.returnData.data.pictures.length; i ++) {
                    temp.img.push(serverHostname + responseData.returnData.data.pictures[i]);
                }
                returnData.activityInfo = temp;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/service/activity/enrollActivity 报名活动
     * @apiName enroll activity
     * @apiGroup System Service Activity
     * @apiVersion 1.4.1
     * @apiDescription 报名活动
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 当前房间ID
     * @apiParam {int} id 活动ID
     * @apiParam {string} name 姓名
     * @apiParam {string} cellphone 联系方式
     * @apiParam {int} count 人数
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/service/complaint/enrollActivity
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "id": 1,
     *     "name": "徐凌",
     *     "cellphone": "13333333333",
     *     "count": 3
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async enrollActivity(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postDataFromFE = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postDataFromFE,
                properties: ['parkId', 'roomId', 'id', 'name', 'cellphone', 'count']
            },
            method: systemModel.serviceModel.activityModel.enrollActivity,
            params: {
                userId,
                postDataFromFE
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/service/activity/getEnrolledActivityList 获取已报名的活动列表
     * @apiName get enrolled activity list
     * @apiGroup System Service Activity
     * @apiVersion 1.4.1
     * @apiDescription 获取已报名的活动列表
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 房间ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/complaint/getActivityList
     *   {
     *     "parkId": 1,
     *     "roomId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} activityList 活动列表
     * @apiSuccess (list) {int} id 活动ID
     * @apiSuccess (list) {string} img 活动图片地址
     * @apiSuccess (list) {string} title 题目
     * @apiSuccess (list) {string} date 日期
     * @apiSuccess (list) {string} content 内容（缩略版）
     * @apiSuccess (list) {int} actualCount 已报名人数
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "activityList": [{
     *         "id": 1,
     *         "content": "哈哈哈",
     *         "title": "今天我要表扬谁",
     *         "img": "/img/haha/abc.jpg",
     *         "date": "2017-02-02",
     *         "actualCount": 1
     *     }]
     *   }
     * 
     *
     */
    static async getEnrolledActivityList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['parkId', 'roomId']
            },
            method: systemModel.serviceModel.activityModel.getEnrolledActivityList,
            params: {
                userId,
                parkId: params.parkId,
                roomId: params.roomId
            },
            success(responseData) {
                returnData.activityList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].id,
                        title: responseData.returnData.data[i].title,
                        content: responseData.returnData.data[i].content.length > 35
                            ? responseData.returnData.data[i].content.slice(0, 35).concat('...')
                            : responseData.returnData.data[i].content,
                        img: responseData.returnData.data[i].pictures[0] 
                            ? (serverHostname + responseData.returnData.data[i].pictures[0])
                            : '',
                        date: dateTransition(responseData.returnData.data[i].createDatetime),
                        actualCount: responseData.returnData.data[i].actualCount
                    };
                    returnData.activityList.push(temp);
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/system/service/activity/cancelEnrollActivity 取消报名活动
     * @apiName cancel enroll activity
     * @apiGroup System Service Activity
     * @apiVersion 1.4.1
     * @apiDescription 取消报名活动
     * 
     * @apiParam {int} id 报名ID
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/system/service/complaint/enrollActivity
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async cancelEnrollActivity(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postDataFromFE = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postDataFromFE,
                properties: 'id'
            },
            method: systemModel.serviceModel.activityModel.cancelEnrollActivity,
            params: {
                userId,
                id: postDataFromFE.id
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ActivityController;