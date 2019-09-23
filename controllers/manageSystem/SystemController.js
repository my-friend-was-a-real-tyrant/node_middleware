// 后台管理
const url = require('url');
const baseController = require('../common/ResDataFormat');
const exception = require('../common/requestModule');
const manageSystemModel = require('../../models/ManageSystemModel');

const propertyController = require('./system/PropertyController');
const mallController = require('./system/MallController');
const managerController = require('./system/ManagerController');
const systemController = require('./system/SystemController');
const userController = require('./system/UserController');
const feedbackController = require('./system/FeedbackController');

class SystemController {
    /**
     * @api {GET} /api/manageSystem/system/checkSession 检测session，获取用户基本信息
     * @apiName check session
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 检测session，获取用户基本信息
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {string} userName 管理员姓名
     * @apiSuccess (Reponse 200) {bool} isSuper 是否超级管理员
     * @apiSuccess (Reponse 200) {array} permissions 权限
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "userName": "徐凌"
     *     "isSuper": true,
     *     "permissions": []
     *   }
     * 
     *
     */
    static async checkSession(ctx) {
        let returnData = baseController.getSuccess();
        returnData.userName = ctx.session.manager.realName;
        returnData.userCellphone = ctx.session.manager.cellphone;
        returnData.isSuper = ctx.session.manager.superAdmin;
        returnData.isParkManager = ctx.session.manager.parkManager;
        returnData.permissions = ctx.session.manager.permissions;

        returnData.defaultParkName = ctx.session.manager.defaultParkName;
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/checkParkSession 检测园区session
     * @apiName check park session
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 检测园区session
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {bool} exist 是否存在园区session
     * @apiSuccess (Reponse 200) {string} parkName 园区姓名
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "exist": true,
     *     "parkName": "中大银泰城"
     *   }
     * 
     *
     */
    static async checkParkSession(ctx) {
        let returnData = baseController.getSuccess();
        if (Object.prototype.hasOwnProperty.call(ctx.session.manager, 'defaultParkId') === true && Object.prototype.hasOwnProperty.call(ctx.session.manager, 'defaultParkName') === true) {
            returnData.exist = true;
            returnData.parkName = ctx.session.manager.defaultParkName;
        } else {
            returnData.exist = false;
        }
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/getParkList 获取园区列表
     * @apiName get park list
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 获取园区列表
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} data 园区列表
     * @apiSuccess (data) {int} value 市ID
     * @apiSuccess (data) {string} name 市名
     * @apiSuccess (data) {array} children 园区列表
     * @apiSuccess (children) {int} value 园区ID
     * @apiSuccess (children) {string} name 园区名
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "data": [{
     *         "value": 1,
     *         "name": "杭州",
     *         "children": [{
     *             "value": 2,
     *             "name": "中大银泰城"
     *         }]
     *     }]
     *   }
     * 
     *
     */
    static async getParkList(ctx) {
        let returnData = baseController.getSuccess();
        await exception({
            returnData,
            method: manageSystemModel.systemModel.getParkList,
            success(responseData) {
                const data = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const tempCity = {
                        value: '',
                        label: '',
                        children: []
                    };
                    tempCity.value = responseData.returnData.data[i].cityId;
                    tempCity.label = responseData.returnData.data[i].cityName;
                    for (let j = 0; j < responseData.returnData.data[i].parkList.length; j ++) {
                        const tempPark = {
                            value: '',
                            label: ''
                        }
                        tempPark.value = responseData.returnData.data[i].parkList[j].id;
                        tempPark.label = responseData.returnData.data[i].parkList[j].name;
                        tempCity.children.push(tempPark);
                    }
                    data.push(tempCity);
                }
                returnData.data = data;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/manageSystem/system/choosePark 选择园区
     * @apiName choose park
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 选择园区
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {string} parkName 园区名
     *
     * @apiParamExample {json} Request Example
     *   POST /api/manageSystem/system/choosePark
     *   {
     *     "parkId": 1,
     *     "parkName": "中大银泰"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async choosePark(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'parkName']
            },
            method: manageSystemModel.systemModel.choosePark,
            params: {
                accountId,
                parkId: postData.parkId
            },
            success(responseDataP) {
                ctx.session.manager.parkManager = responseDataP.returnData.data.parkManager;
                ctx.session.manager.permissions = responseDataP.returnData.data.permissions;
                ctx.session.manager.defaultParkId = postData.parkId;
                ctx.session.manager.defaultParkName = postData.parkName;
                // 权限赋予
                returnData.permissions = responseDataP.returnData.data.permissions;
                returnData.parkName = postData.parkName;
                returnData.parkManager = responseDataP.returnData.data.parkManager;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/changePassword 修改密码
     * @apiName change password
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 修改密码
     * 
     * @apiParam {string} oldPassword 老密码
     * @apiParam {string} newPassword 新密码
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/changePassword
     *   {
     *     "oldPassword": "13333333333",
     *     "newPassword": "13333333334"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async changePassword(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['oldPassword', 'newPassword']
            },
            method: manageSystemModel.systemModel.changePassword,
            params: {
                accountId,
                oldPassword: postData.oldPassword,
                newPassword: postData.newPassword
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/changeCellphone 修改手机号
     * @apiName change cellphone
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 修改手机号
     * 
     * @apiParam {string} cellphone 新手机号
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/changeCellphone
     *   {
     *     "cellphone": "13333333333"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async changeCellphone(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['oldCellphone', 'cellphone', 'smsCode']
            },
            method: manageSystemModel.systemModel.changeCellphone,
            params: {
                accountId,
                oldCellphone: postData.oldCellphone,
                cellphone: postData.cellphone,
                smsCode: postData.smsCode
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/manageSystem/system/getSmsCode 获取验证码
     * @apiName get sms code
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 获取验证码
     * 
     * @apiParam {string} cellphone 新手机号
     *
     * @apiParamExample {json} Request Example
     *   POST /api/manageSystem/system/getSmsCode
     *   {
     *     "cellphone": "13333333333"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async getSmsCode(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'cellphone'
            },
            method: manageSystemModel.systemModel.getSmsCode,
            params: {
                accountId,
                cellphone: postData.cellphone
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/getIndexInfo 获取首页信息
     * @apiName get index info
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 获取首页信息
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async getIndexInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: 
                manageSystemModel.systemModel.getIndexInfo,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                returnData.identity = responseData.returnData.data.identity;
                returnData.department = responseData.returnData.data.department;
                returnData.job = responseData.returnData.data.job;
                returnData.userName = ctx.session.manager.realName;
                returnData.userCellphone = ctx.session.manager.cellphone;
            }
        });
        ctx.body = returnData;
    }

    /**
     * 
     *  获取首页报修数
     *
     */
    static async getMyRepairmentCount(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.getIndexRepairsCount,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.count;
            }
        });
        ctx.body = returnData;
    }

    /**
     * 
     *  获取首页报修数
     *
     */
    static async getMyReportCount(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.getIndexReportsCount,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.count;
            }
        });
        ctx.body = returnData;
    }

    /**
     * 
     *  获取首页投诉数
     *
     */
    static async getMyComplaintCount(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.getIndexComplaintCount,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.count;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/getRepairmentCsr 获取报修满意度信息
     * @apiName get repairment csr
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 获取报修满意度信息
     *
     */
    static async getRepairmentCsr(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'year'
            },
            method: manageSystemModel.systemModel.getRepairmentCsr,
            params: {
                accountId,
                parkId: defaultParkId,
                year: params.year
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/getFunctionProportion 获取功能使用量信息
     * @apiName get function proportion
     * @apiGroup ManageSystem System
     * @apiVersion 1.0.0
     * @apiDescription 获取功能使用量信息
     *
     */
    static async getFunctionProportion(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'type'
            },
            method: manageSystemModel.systemModel.getFunctionProportion,
            params: {
                accountId,
                parkId: defaultParkId,
                type: params.type
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = {
    checkSession: SystemController.checkSession,
    checkParkSession: SystemController.checkParkSession,
    getParkList: SystemController.getParkList,
    choosePark: SystemController.choosePark,
    changePassword: SystemController.changePassword,
    changeCellphone: SystemController.changeCellphone,
    getSmsCode: SystemController.getSmsCode,
    getIndexInfo: SystemController.getIndexInfo,
    getMyRepairmentCount: SystemController.getMyRepairmentCount,
    getMyReportCount: SystemController.getMyReportCount,
    getMyComplaintCount: SystemController.getMyComplaintCount,
    getRepairmentCsr: SystemController.getRepairmentCsr,
    getFunctionProportion: SystemController.getFunctionProportion,
    propertyController,
    mallController,
    managerController,
    systemController,
    userController,
    feedbackController
};