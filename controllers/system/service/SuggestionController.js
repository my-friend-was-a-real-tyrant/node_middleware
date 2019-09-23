// 园区报事模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class SuggestionController {
    /**
     * @api {POST} /api/system/service/suggestion/submitSuggestion 提交咨询建议
     * @apiName submit suggestion
     * @apiGroup System Service Suggestion
     * @apiVersion 1.4.1
     * @apiDescription 提交咨询建议
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} roomId 房间ID
     * @apiParam {string} question 问题
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/service/suggestion/submitSuggestion
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "question": "1"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async submitSuggestion(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'roomId', 'question']
            },
            method: systemModel.serviceModel.suggestionModel.submitSuggestion,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/service/suggestion/getSuggestionList 获取用户投诉建议列表
     * @apiName get my suggestion list
     * @apiGroup System Service Suggestion
     * @apiVersion 1.4.1
     * @apiDescription 获取用户投诉建议列表
     * 
     * @apiParam {int} parkId 园区ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/suggestion/getSuggestionList
     *   {
     *     "parkId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} suggestionList 全部咨询建议列表
     * @apiSuccess (list) {int} id ID
     * @apiSuccess (list) {string} datetime 时间
     * @apiSuccess (list) {string} question 问题
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "complaintList": [{
     *         "id": 1,
     *         "datetime": "datetime",
     *         "question": "今天我要表扬谁"
     *     }]
     *   }
     * 
     *
     */
    static async getSuggestionList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'parkId'
            },
            method: systemModel.serviceModel.suggestionModel.getSuggestionList,
            params: {
                userId,
                parkId: params.parkId
            },
            success(responseData) {
                returnData.suggestionList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].id,
                        datetime: dateTransition(responseData.returnData.data[i].createDatetime),
                        question: responseData.returnData.data[i].title.lenth > 20
                            ? responseData.returnData.data[i].title.slice(0, 20).concat('...')
                            : responseData.returnData.data[i].title,
                        revertDatetime: dateTransition(responseData.returnData.data[i].revertDatetime),
                        answer: responseData.returnData.data[i].revertContent == null 
                            ?  responseData.returnData.data[i].revertContent
                            :  ( responseData.returnData.data[i].revertContent.lenth > 20 
                                ? responseData.returnData.data[i].revertContent.slice(0, 20).concat('...')
                                : responseData.returnData.data[i].revertContent   
                            )
                    };
                    returnData.suggestionList.push(temp);
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/service/suggestion/getSuggestionInfo 获取用户咨询建议详情
     * @apiName get my suggestion info
     * @apiGroup System Service Suggestion
     * @apiVersion 1.4.1
     * @apiDescription 获取用户咨询建议详情
     * 
     * @apiParam {int} suggestionId 咨询建议id
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/suggestion/getSuggestionInfo
     *   {
     *     "suggestionId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} suggestionInfo 咨询建议详情
     * @apiSuccess (info) {object} question 问题
     * @apiSuccess (info) {list} answer 回答
     * @apiSuccess (question) {string} text 文字
     * @apiSuccess (question) {string} datetime 时间
     * @apiSuccess (answer) {string} text 文字
     * @apiSuccess (answer) {string} datetime 时间
     * @apiSuccess (answer) {string} operator 回复人
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "suggestionInfo": {
     *         "question": {
     *             "text": "hahahah",
     *             "datetime": "2018-02-02 08:08:08"
     *         },
     *         "answer": [
     *             {
     *                 "id": 1,
     *                 "text": "houhouhou",
     *                 "datetime": "2019-09-09 09:09:09",
     *                 "operator": "小王"
     *             }
     *         ]
     *     }
     *   }
     * 
     *
     */
    static async getSuggestionInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'suggestionId'
            },
            method: systemModel.serviceModel.suggestionModel.getSuggestionInfo,
            params: {
                userId,
                id: params.suggestionId
            },
            success(responseData) {
                returnData.suggestionInfo = {
                    question: {
                        text: responseData.returnData.data.content,
                        datetime: dateTransition(responseData.returnData.data.createDatetime)
                    },
                    answer: []
                };
                for (let i = 0; i < responseData.returnData.data.consultReverts.length; i ++) {
                    if (responseData.returnData.data.consultReverts[i].operation === 2) {
                        const temp = {
                            id: responseData.returnData.data.consultReverts[i].id,
                            datetime: dateTransition(responseData.returnData.data.consultReverts[i].createDatetime),
                            text: responseData.returnData.data.consultReverts[i].content,
                            operator: responseData.returnData.data.consultReverts[i].operationAccountRealName
                        };
                        returnData.suggestionInfo.answer.push(temp);
                    }
                }
            }
        });
        ctx.body = returnData;
    }
}

module.exports = SuggestionController;