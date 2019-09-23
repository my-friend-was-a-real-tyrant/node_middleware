// 用户登录模块
const url = require('url');
const loginModel = require('../models/LoginModel');
const baseController = require('./common/ResDataFormat');
const exception = require('./common/requestModule');

class LoginController {
    /**
     * @api {POST} /api/login/getSmscode 获取验证码
     * @apiName get smscode
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription 登录获取验证码
     *
     * @apiParam {string} cellphone 手机号
     *
     * @apiParamExample {json} Request Example
     *   POST /api/login/getSmscode
     *   {
     *     "cellphone": "13500002222"
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async getSmscode(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'cellphone'
            },
            method: loginModel.getSmscode,
            params: {
                cellphone: postData.cellphone
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/login/bindCellphone 微信绑定手机号
     * @apiName wechat bind cellphone
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription 微信绑定手机号
     *
     * @apiParam {string} cellphone 手机号
     * @apiParam {string} smscode 验证码
     *
     * @apiParamExample {json} Request Example
     *   POST /api/login/bindCellphone
     *   {
     *     "cellphone": "13500002222",
     *     "smscode": "666666"
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {number} type 用户类型(1-新用户;2-老用户)
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "type": 1
     *   }
     *
     */
    static async bindCellphone(ctx) {
        let returnData = baseController.getSuccess();
        const { openid, headimgurl } = ctx.session.wechat;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['cellphone', 'smscode']
            },
            method: loginModel.bindCellphone,
            params: {
                openid,
                headimgurl,
                cellphone: postData.cellphone,
                smscode: postData.smscode
            },
            success(responseData) {
                ctx.session.user = {
                    userId: responseData.returnData.data.userId,
                    cellphone: postData.cellphone,
                    client: 'wechat'
                };
                returnData.type = responseData.returnData.data.type;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/login/appBindCellphone app绑定手机号
     * @apiName app bind cellphone
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription app绑定手机号
     *
     * @apiParam {string} cellphone 手机号
     * @apiParam {string} smscode 验证码
     *
     * @apiParamExample {json} Request Example
     *   POST /api/login/appBindCellphone
     *   {
     *     "cellphone": "13500002222",
     *     "smscode": "666666"
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {number} type 用户类型(1-新用户;2-老用户)
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "type": 1
     *   }
     *
     */
    static async appBindCellphone(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['cellphone', 'smscode']
            },
            method: loginModel.appBindCellphone,
            params: {
                cellphone: postData.cellphone,
                smscode: postData.smscode
            },
            success(responseData) {
                ctx.session.user = {
                    userId: responseData.returnData.data.userId,
                    cellphone: postData.cellphone,
                    client: 'app'
                };
                returnData.type = responseData.returnData.data.type;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/login/getParkList 获取园区列表
     * @apiName get park list
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription 获取园区列表
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} cityList 城市列表
     * @apiSuccess (cityList) {string} cityId 城市ID
     * @apiSuccess (cityList) {string} cityName 城市名称
     * @apiSuccess (cityList) {array} parkList 城市下属园区
     * @apiSuccess (parkList) {number} id 园区ID
     * @apiSuccess (parkList) {string} name 园区名称
     * @apiSuccess (parkList) {string} address 园区地址
     * @apiSuccess (parkList) {number} districtId 区县id
     * @apiSuccess (parkList) {number} cityId 城市id
     * @apiSuccess (parkList) {string} cityName 城市名称
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "cityList": [{
     *         "cityId": 1,
     *         "cityName": "杭州",
     *         "parkList": [{
     *             "id": 11,
     *             "name": "中大银泰城",
     *             "address": "杭州市滨江区xx路xx号",
     *             "districtId": 1,
     *             "cityId": 1,
     *             "cityName": "杭州"
     *         }]
     *     }]
     *   }
     *
     */
    static async getParkList(ctx) {
        let returnData = baseController.getSuccess();
        await exception({
            returnData,
            method: loginModel.getParkList,
            success(responseData) {
                returnData.cityList = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/login/getBuildingList 获取楼栋列表
     * @apiName get build list
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription 获取楼栋列表
     * 
     * @apiParam {number} parkId 园区ID
     * @apiParamExample {json} Request Example
     *   GET /api/login/getBuildingList
     *   {
     *     "parkId": 1
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} buildList 楼栋列表
     * @apiSuccess (buildList) {number} id 楼栋ID
     * @apiSuccess (buildList) {string} buildingCode 楼栋编号
     * @apiSuccess (buildList) {string} buildName 楼栋名称
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "buildList": [{
     *         "id": 1,
     *         "buildingCode": "1",
     *         "buildName": "1幢"
     *     }]
     *   }
     *
     */
    static async getBuildingList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'parkId'
            },
            method: loginModel.getBuildingList,
            params: {
                parkId: params.parkId
            },
            success(responseData) {
                returnData.buildList = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/login/getRoomList 获取房间列表
     * @apiName get room list
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription 获取房间列表
     * 
     * @apiParam {number} buildId 楼栋ID
     * @apiParamExample {json} Request Example
     *   GET /api/login/getRoomList
     *   {
     *     "buildId": 1
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} unitList 单元列表
     * @apiSuccess (unitList) {number} unitId 单元ID
     * @apiSuccess (unitList) {string} unitName 单元名称
     * @apiSuccess (unitList) {array} roomList 单元下属房屋
     * @apiSuccess (roomList) {number} roomId 房间ID
     * @apiSuccess (roomList) {string} roomCode 房间编号
     * @apiSuccess (roomList) {string} roomName 房间名称
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "unitList": [{
     *         "unitId": 1,
     *         "unitName": "杭州",
     *         "roomList": [{
     *             "roomId": 11,
     *             "roomCode": "11",
     *             "roomName": "中大银泰城"
     *         }]
     *     }]
     *   }
     *
     */
    static async getRoomList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'buildId'
            },
            method: loginModel.getRoomList,
            params: {
                buildId: params.buildId
            },
            success(responseData) {
                returnData.unitList = [{
                    unitId: 1,
                    unitName: '没有单元',
                    roomList: []
                }];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const roomItem = {
                        roomId: responseData.returnData.data[i].id,
                        roomCode: responseData.returnData.data[i].code,
                        roomName: responseData.returnData.data[i].simpleName
                    }
                    returnData.unitList[0].roomList.push(roomItem);
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/login/apply 登录申请房屋认证
     * @apiName apply into a room
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription 登录申请房屋认证
     *
     * @apiParam {number} identity 身份
     * @apiParam {string} myName 用户姓名
     * @apiParam {string} hostName 户主姓名
     * @apiParam {string} hostCellphone 户主手机号
     * @apiParam {number} roomId 房间ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/login/apply
     *   {
     *     "identity": 1,
     *     "myName": "徐凌",
     *     "hostName": "陈垚",
     *     "hostCellphone": "13500002222",
     *     "roomId": 1
     *   }
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} data 用户信息(当申请为户主并且通过时)
     * @apiSuccess (data) {number} userId 用户Id
     * @apiSuccess (data) {string} realName 用户姓名
     * @apiSuccess (data) {string} cellphone 用户手机号
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "data": {
     *         "userId": 1,
     *         "realName": "徐凌",
     *         "cellphone": "13333333333"
     *     }
     *   }
     *
     */
    static async apply(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['identity', 'myName', 'hostName', 'hostCellphone', 'roomId']
            },
            method: loginModel.apply,
            params: {
                userId,
                postDataFromFE: postData
            },
            success(responseData) {
                if (Object.prototype.hasOwnProperty.call(responseData.returnData, 'data') === true) {
                    returnData.data = responseData.returnData.data;
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/login/invite 我有邀请码
     * @apiName apply by inviteCode
     * @apiGroup Login
     * @apiVersion 1.4.1
     * @apiDescription 我有邀请码
     *
     * @apiParam {int} parkId 园区id
     * @apiParam {int} roomId 房间id
     * @apiParam {string} authCode 邀请码
     * 
     * @apiParamExample {json} Request Example
     *   POST /api/login/invite
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "authCode": "133333"
     *   }
     * 
     * @apiUse CODE_200
     *
     */
    static async invite(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'roomId', 'authCode']
            },
            method: loginModel.invite,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
}

module.exports = LoginController;