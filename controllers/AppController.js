const url = require('url');
const fs = require('fs');
const path = require('path');
const appModel = require('../models/AppModel');
const baseController = require('./common/ResDataFormat');
const exception = require('./common/requestModule');

class AppController {
    /**
     * @api {GET} /api/common/autoUpdate APP自动更新
     * @apiName app auto update
     * @apiGroup APP
     * @apiVersion 1.4.1
     * @apiDescription APP自动更新
     * 
     * @apiParam {number} type app类型(1-用户端;2-管理端)
     * @apiParamExample {json} Request Example
     *   GET /api/common/autoUpdate
     *   {
     *     "type": 1
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} data 版本数据
     * @apiSuccess (data) {string} version 版本号
     * @apiSuccess (data) {number} versionCode 版本id
     * @apiSuccess (data) {string} appName APP名称
     * @apiSuccess (data) {string} url APP下载地址
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "data": {    
     *       "version": "1.0.1",
     *       "versionCode": 1,
     *       "appName": "中大惠生活",
     *       "url": "http://system.zhongdapuhui.com/resource/apk/user/zhongda_u_0.9.1.apk"
     *     }
     *   }
     *
     */
    static async autoUpdate(ctx) {
        const params = url.parse(ctx.request.url, true).query;
        let returnData = {
            code: '00000',
            message: 'success',
            data: {}
        };
        if (Object.prototype.hasOwnProperty.call(params, 'type')) {
            let fileName = '';
            if (params.type === '1') {
                fileName = '../androidConfig.json';
            } else {
                fileName = '../androidManageConfig.json';
            }

            returnData.data = await new Promise((resolve) => {
                fs.readFile(path.join(__dirname, fileName),'utf8',function (err, data) {
                    resolve(JSON.parse(data));
                })
            });
        } else {
            returnData = {
                code: 'E0001',
                message: 'Params Error'
            }
        }
        
        ctx.body = returnData;
    }


    /**
     * @api {GET} /api/app/getPushList APP推送消息列表
     * @apiName app get push list
     * @apiGroup APP
     * @apiVersion 1.4.1
     * @apiDescription APP推送消息列表
     * 
     * @apiParam {number} queryType 查询类型(1-全部消息;2-所有未读消息;3-所有已读消息;4-所有未通知消息)
     * @apiParam {number} userType 用户类型(1-管理员;2-用户;)
     * @apiParamExample {json} Request Example
     *   GET /api/app/getPushList
     *   {
     *     "query": 1,
     *     "userType": 1
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} data 列表数据
     * @apiSuccess (data) {number} id 消息ID
     * @apiSuccess (data) {string} subject 消息标题
     * @apiSuccess (data) {string} content 消息内容
     * @apiSuccess (data) {string} picture 消息图片
     * @apiSuccess (data) {string} url 消息点击后跳转的URL
     * @apiSuccess (data) {bool} read 消息是否已读
     * @apiSuccess (data) {bool} notified 消息是否不再通知
     * @apiSuccess (data) {number} createDatetime 消息生成时间
     * @apiSuccess (data) {number} messageType 消息类型
     * @apiSuccess (data) {number} dataId 数据主键
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "data": {    
     *       "id": 1,
     *       "subject": "标题",
     *       "content": "内容",
     *       "picture": "http://system.zhongdapuhui.com/resource/apk/user/zhongda_u_0.9.1.apk",
     *       "url": "http://system.zhongdapuhui.com/resource/apk/user/zhongda_u_0.9.1.apk",
     *       "read": true,
     *       "notified": true,
     *       "createDatetime": 15000000000,
     *       "messageType": 1,
     *       "dataId": 1
     *     }
     *   }
     *
     */
    static async getPushList(ctx) {
        let returnData = {
            code: '00000',
            message: 'success',
            data: {}
        };
        const params = url.parse(ctx.request.url, true).query;
        if (Object.prototype.hasOwnProperty.call(params, 'queryType') === false || Object.prototype.hasOwnProperty.call(params, 'userType') === false) {
            returnData = {
                code: 'E0001',
                message: 'Params Error'
            };
        } else {
            if (params.userType == 1) {
                if (!Object.prototype.hasOwnProperty.call(ctx.session, 'manager')) {
                    returnData = {
                        code: 'E0004',
                        message: '登录已超时，请重新登录！'
                    };
                } else {
                    params.userId = ctx.session.manager.accountId;
                }
            } else {
                if (!Object.prototype.hasOwnProperty.call(ctx.session, 'user')) {
                    returnData = {
                        code: 'E0004',
                        message: '登录已超时，请重新登录！'
                    };
                } else {
                    params.userId = ctx.session.user.userId;
                }
            }
        }
        if (returnData.code === '00000') {
            try {
                const responseData = await appModel.getPushList(params);
                if (responseData.code !== 10000) {
                    returnData = {
                        code: 'E0003',
                        message: responseData.message
                    }
                } else if (responseData.returnData.subCode !== 10000) {
                    returnData = {
                        code: 'E0003',
                        message: responseData.returnData.subMessage
                    }
                } else {
                    returnData.data = responseData.returnData.data;
                }
            } catch(e) {
                returnData = {
                    code: 'E0002',
                    message: '系统繁忙'
                }
            }
        }
        ctx.body = returnData;
    }


    /**
     * @api {PATCH} /api/app/handleAppMessage APP消息批量已读
     * @apiName app handle message
     * @apiGroup APP
     * @apiVersion 1.4.1
     * @apiDescription APP消息批量已读
     * 
     * @apiParam {array} pushIds 推送消息ID数组
     * @apiParam {number} operation 操作(1-批量已通知;2-批量已读;3-批量删除)
     * @apiParamExample {json} Request Example
     *   PATCH /api/app/handleAppMessage
     *   {
     *     "pushIds": [1, 2, 3],
     *     "operation": 1
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async handleAppMessage(ctx) {
        let returnData = {
            code: '00000',
            message: 'success',
            data: {}
        };
        const params = ctx.request.body;
        if (Object.prototype.hasOwnProperty.call(params, 'pushIds') === false || Object.prototype.hasOwnProperty.call(params, 'operation') === false) {
            returnData = {
                code: 'E0001',
                message: 'Params Error'
            };
        } else {
            try {
                const responseData = await appModel.handleAppMessage(params);
                if (responseData.code !== 10000) {
                    returnData = {
                        code: 'E0003',
                        message: responseData.message
                    }
                } else if (responseData.returnData.subCode !== 10000) {
                    returnData = {
                        code: 'E0003',
                        message: responseData.returnData.subMessage
                    }
                } else {
                    returnData.data = responseData.returnData.data;
                }
            } catch(e) {
                console.log(e);
                returnData = {
                    code: 'E0002',
                    message: '系统繁忙'
                }
            }
        }
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/app/feedback 用户发起意见反馈
     * @apiName submit feedback
     * @apiGroup APP
     * @apiVersion 1.4.1
     * @apiDescription 用户发起意见反馈
     *
     * @apiParam {string} subject 标题
     * @apiParam {string} content 内容
     * @apiParam {array} pictures 图片地址
     *
     * @apiParamExample {json} Request Example
     *   POST /api/app/feedback
     *   {
     *     "subject": "标题",
     *     "content": "内容",
     *     "pictures": ["a.jpg", "b.jpg"]
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async feedback(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        if (!userId) {
            ctx.body = {
                code: 'E0004',
                message: '登录已超时，请重新登录！'
            }
        } else {
            const postData = ctx.request.body;
            await exception({
                returnData,
                validator: {
                    params: postData,
                    properties: ['subject', 'content', 'pictures']
                },
                method: appModel.feedback,
                params: {
                    userId,
                    postDataFromFE: postData
                }
            });
            ctx.body = returnData;
        }
    }
}

module.exports = AppController;