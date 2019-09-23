// 系统模块
const baseController = require('./common/ResDataFormat');
const exception = require('./common/requestModule');
const systemModel = require('../models/SystemModel');

const personalCenterController = require('./system/PersonalCenterController');
const serviceController = require('./system/ServiceController');
const lifeController = require('./system/LifeController');

const { serverHostname } = require('./common/constant');

class SystemController {
    /**
     * @api {GET} /api/system/getInitInfo 获取用户初始信息
     * @apiName get init info
     * @apiGroup System
     * @apiVersion 1.4.1
     * @apiDescription 获取用户初始信息
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {bool} isVisitor 是否为游客
     * @apiSuccess (Reponse 200) {object} info 用户信息，在isVisitor为false时存在
     * @apiSuccess (info) {number} identity 用户身份
     * @apiSuccess (info) {string} defaultAddressName 默认房屋详情
     * @apiSuccess (info) {number} defaultAddressId 默认房屋ID
     * @apiSuccess (info) {number} defaultParkId 默认园区ID（不记得干什么用的了）
     * @apiSuccess (info) {string} userName 用户姓名
     * @apiSuccess (info) {string} cellphone 用户手机号
     * @apiSuccess (info) {bool} isAgent 是否为代理人
     * @apiSuccess (info) {string} avatar 头像（具体地址, 带hostname）
     * @apiSuccess (info) {string} realAvatar 头像（数据库中存储地址，不带hostname）
     * @apiSuccess (info) {number} sex 性别(1-男;2-女;3-保密)
     * @apiSuccess (info) {string} birthday 生日
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "isVisitor": false,
     *     "info": {
     *         "identity": 1,
     *         "defaultAddressName": "杭州新东方国际科技中心1101",
     *         "defaultAddressId": 1,
     *         "defaultParkId": 1,
     *         "userName": "徐凌",
     *         "cellphone": "13333333333",
     *         "isAgent": false,
     *         "avatar": "http://www.baidu.com/a.jpg",
     *         "realAvatar": "/a.jpg",
     *         "sex": 1,
     *         "birthday": "1999-09-09",
     *     }
     *   }
     * 
     *
     */
    static async getInitInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            method: systemModel.getInitInfo,
            params: {
                userId
            },
            success(responseData) {
                if (Object.prototype.hasOwnProperty.call(responseData.returnData, 'data') === true) {
                    returnData.isVisitor = false;
                    returnData.info = {
                        identity: responseData.returnData.data.identity,
                        defaultAddressName: responseData.returnData.data.simpleName,
                        defaultAddressId: responseData.returnData.data.roomId,
                        defaultParkId: responseData.returnData.data.parkId,
                        userName: responseData.returnData.data.realName,
                        cellphone: responseData.returnData.data.cellphone,
                        isAgent: responseData.returnData.data.theResponsible,
                        avatar: responseData.returnData.data.avatar ? (responseData.returnData.data.avatar.indexOf('http') === 0 ? responseData.returnData.data.avatar : serverHostname + responseData.returnData.data.avatar) : '',
                        realAvatar: responseData.returnData.data.avatar,
                        sex: responseData.returnData.data.sex,
                        birthday: responseData.returnData.data.birthday
                    };
                } else {
                    returnData.isVisitor = true;
                }
            }
        });
        ctx.body = returnData;
    }
}

module.exports = {
    getInitInfo: SystemController.getInitInfo,
    personalCenterController,
    serviceController,
    lifeController
};