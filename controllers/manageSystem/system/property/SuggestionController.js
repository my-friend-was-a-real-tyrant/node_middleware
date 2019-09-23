const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');
const qs = require('querystring');

const url = require('url');

class SuggestionController {
    /**
     * @api {GET} /api/manageSystem/system/property/suggestion/getSuggestionList 获取咨询建议列表
     * @apiName get suggestion list
     * @apiGroup ManageSystem System Property Suggestion
     * @apiVersion 1.0.0
     * @apiDescription 获取咨询建议列表
     * 
     * @apiParam {int} pageNo 页码
     * @apiParam {int} pageSize 每页尺寸
     * @apiParam {string} keywords 关键字
     * @apiParam {number} startDate 开始日期(13位时间戳)
     * @apiParam {number} endDate 截止日期（13位时间戳）
     * @apiParam {bool} belongToMe 是否只看指派给自己的
     * @apiParam {string} building 楼栋
     * @apiParam {string} room 房屋
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/suggestion/getSuggestionList
     *   {
     *     "pageNo": 1,
     *     "pageSize": 10,
     *     "keywords": "",
     *     "startDate": 1500000000000,
     *     "endDate": 1500000000000,
     *     "belongToMe": true,
     *     "building": "",
     *     "room": ""
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} suggestionList 全部报修列表
     * @apiSuccess (list) {int} id 报事ID
     * @apiSuccess (list) {int} address 地址
     * @apiSuccess (list) {string} userName 咨询人
     * @apiSuccess (list) {string} userCellphone 联系方式
     * @apiSuccess (list) {string} datetime 咨询时间
     * @apiSuccess (list) {string} status 状态
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairmentList": [{
     *         "id": 1,
     *         "address": "楼下泳池",
     *         "userName": "徐凌",
     *         "userCellphone": "13333333333",
     *         "datetime": "2017-02-02 09:09:09",
     *         "status": "已转送"
     *     }]
     *   }
     * 
     *
     */
    static async getSuggestionList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate', 'belongToMe', 'building', 'room']
            },
            method: manageSystemModel.systemModel.propertyModel.suggestionModel.getSuggestionList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const suggestionList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        address: responseData.returnData.data.list[i].simpleName,
                        userName: responseData.returnData.data.list[i].userRealName,
                        userCellphone: responseData.returnData.data.list[i].userCellphone,
                        datetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime'),
                        status: responseData.returnData.data.list[i].status,
                        statusForApp: responseData.returnData.data.list[i].status,
                    };
                    suggestionList.push(temp);
                }
                for (let i = 0; i < suggestionList.length; i ++) {
                    suggestionList[i].status = (suggestionList[i].status === 1 ? '未回复' : '已回复');
                }
                returnData.suggestionList = suggestionList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/suggestion/getSuggestionList 获取咨询建议详情
     * @apiName get suggestion info
     * @apiGroup ManageSystem System Property Suggestion
     * @apiVersion 1.0.0
     * @apiDescription 获取咨询建议详情
     * 
     * @apiParam {int} id 咨询建议id
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/suggestion/getSuggestionInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} suggestionInfo 咨询建议详情
     * @apiSuccess (info) {int} id 咨询建议ID
     * @apiSuccess (info) {string} number 编号
     * @apiSuccess (info) {string} userName 咨询人
     * @apiSuccess (info) {string} userCellphone 联系方式
     * @apiSuccess (info) {string} datetime 咨询时间
     * @apiSuccess (info) {string} content 内容
     * @apiSuccess (info) {array} answer 回复列表
     * @apiSuccess (answer) {int} id 回复id
     * @apiSuccess (answer) {string} datetime 回复时间
     * @apiSuccess (answer) {string} content 回复内容
     * @apiSuccess (answer) {string} operator 回复人
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "suggestionInfo": {
     *         "id": 1,
     *         "number": "12312312312313",
     *         "userName": "徐凌",
     *         "userCellphone": "13333333333",
     *         "datetime": "2017-02-02 09:09:09",
     *         "content": "哈哈哈哈哈哈哈哈哈",
     *         "answer": [
     *             {
     *                 "id": 1,
     *                 "datetime": "2018-09-09",
     *                 "content": "呵呵呵呵呵呵呵呵呵呵",
     *                 "operator": "王萌"
     *             }
     *         ]
     *     }
     *   }
     * 
     *
     */
    static async getSuggestionInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.suggestionModel.getSuggestionInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                const temp = {
                    id: responseData.returnData.data.id,
                    number: responseData.returnData.data.number,
                    userName: responseData.returnData.data.userRealName,
                    userCellphone: responseData.returnData.data.userCellphone,
                    datetime: dateTransition(responseData.returnData.data.createDatetime, 'minute'),
                    content: responseData.returnData.data.content,
                    answer: [],
                    operationRecordsList: responseData.returnData.data.consultReverts
                };
                for (let i = 0; i < responseData.returnData.data.consultReverts.length; i ++) {
                    if (responseData.returnData.data.consultReverts[i].operation === 2) {
                        const answerTemp = {
                            id: responseData.returnData.data.consultReverts[i].id,
                            datetime: dateTransition(responseData.returnData.data.consultReverts[i].createDatetime, 'minute'),
                            content: responseData.returnData.data.consultReverts[i].content,
                            operator: responseData.returnData.data.consultReverts[i].operationAccountRealName
                        }
                        temp.answer.push(answerTemp);
                    }
                }
                for (let i = 0; i < temp.operationRecordsList.length; i ++) {
                    temp.operationRecordsList[i] = {
                        event: temp.operationRecordsList[i].operation === 1
                            ? '转派'
                            : (temp.operationRecordsList[i].operation === 2
                            ? '回复'
                            : '未知'),
                        operation: temp.operationRecordsList[i].operation === 1 
                            ? temp.operationRecordsList[i].operationAccountRealName + '转派至' + temp.operationRecordsList[i].targetAccountRealName
                            : (temp.operationRecordsList[i].operation === 2 
                            ? temp.operationRecordsList[i].operationAccountRealName + '回复用户' : '未知'),
                        remark: temp.operationRecordsList[i].content,
                        operator: temp.operationRecordsList[i].operationAccountRealName ? temp.operationRecordsList[i].operationAccountRealName + '(' + temp.operationRecordsList[i].operationAccountCellphone + ')' : '无',
                        operateDatetime: dateTransition(temp.operationRecordsList[i].createDatetime, 'minute')
                    };
                }
                returnData.suggestionInfo = temp;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/suggestion/getAppointTaskManagerList 获取咨询建议转派人员名单
     * @apiName get appoint task manager list
     * @apiGroup ManageSystem System Property Suggestion
     * @apiVersion 1.0.0
     * @apiDescription 获取咨询建议指派人员名单
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {list} managerList 列表
     * @apiSuccess (list) {int} value value
     * @apiSuccess (list) {string} label label
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "managerList": [
     *         {
     *             "value": 1,
     *             "label": "徐凌(13333333333)"
     *         }
     *     ]
     *   }
     * 
     *
     */
    static async getAppointTaskManagerList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.propertyModel.suggestionModel.getAppointTaskManagerList,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                const managerList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        value: responseData.returnData.data[i].id,
                        label: responseData.returnData.data[i].realName + '/' + responseData.returnData.data[i].cellphone
                    };
                    managerList.push(temp);
                }
                returnData.managerList = managerList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/suggestion/appointTask 转派咨询建议任务
     * @apiName appoint task
     * @apiGroup ManageSystem System Property Suggestion
     * @apiVersion 1.0.0
     * @apiDescription 转派咨询建议任务
     * 
     * @apiParam {int} id 表扬投诉ID
     * @apiParam {string} remark 备注
     * @apiParam {int} manager 转派人id
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/suggestion/appointTask
     *   {
     *     "id": 1,
     *     "remark": "哈哈",
     *     "manager": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async appointTask(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['remark', 'manager', 'id']
            },
            method: manageSystemModel.systemModel.propertyModel.suggestionModel.appointTask,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/suggestion/answerSuggestion 回复咨询建议
     * @apiName answer suggestion
     * @apiGroup ManageSystem System Property Suggestion
     * @apiVersion 1.0.0
     * @apiDescription 回复咨询建议
     * 
     * @apiParam {int} id 咨询建议ID
     * @apiParam {string} answer 回复内容
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/suggestion/answerSuggestion
     *   {
     *     "id": 1,
     *     "answer": "哈哈哈哈哈哈哈哈哈哈"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async answerSuggestion(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'answer']
            },
            method: manageSystemModel.systemModel.propertyModel.suggestionModel.answerSuggestion,
            params: {
                accountId,
                parkId: defaultParkId,
                id: postData.id,
                answer: postData.answer
            }
        });
        ctx.body = returnData;
    }
}

module.exports = SuggestionController;