// 我的家庭模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const { serverHostname } = require('../../common/constant');
const exception = require('../../common/requestModule');
const systemModel = require('../../../models/SystemModel');

class EditPersonalInfoController {
    /**
     * @api {PATCH} /api/system/personalCenter/editPersonalInfo 设置个人信息
     * @apiName edit personal info
     * @apiGroup System PersonalCenter EditPersonalInfo
     * @apiVersion 1.4.1
     * @apiDescription 设置个人信息
     * 
     * @apiParam {int} parkId 园区ID
     * @apiParam {int} sex 性别
     * @apiParam {string} birthday 生日
     * @apiParam {string} avatar 头像
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/system/personalCenter/editPersonalInfo
     *   {
     *     "parkId": 1,
     *     "sex": 1,
     *     "birthday": "2019-09-09",
     *     "avatar": "http://baidu.com"
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "avatar": "http://www.baidu.com/a.jpg"
     *   }
     * 
     *
     */
    static async editPersonalInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'sex', 'birthday', 'avatar']
            },
            method: systemModel.personalCenterModel.editPersonalInfoModel.editPersonalInfo,
            params: {
                userId,
                parkId: postData.parkId,
                postDataFromFE: postData
            },
            success() {
                returnData.avatar = serverHostname + postData.avatar
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/system/personalCenter/changeCellphone 修改手机号
     * @apiName change cellphone
     * @apiGroup System PersonalCenter EditPersonalInfo
     * @apiVersion 1.4.1
     * @apiDescription 修改手机号
     * 
     * @apiParam {number} parkId 园区ID
     * @apiParam {string} cellphone 手机号
     * @apiParam {string} smsCode 验证码
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/system/personalCenter/editPersonalInfo
     *   {
     *     "parkId": 1,
     *     "cellphone": "13333333333",
     *     "smsCode": "123456"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async changeCellphone(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'cellphone', 'smsCode']
            },
            method: systemModel.personalCenterModel.editPersonalInfoModel.changeCellphone,
            params: {
                userId,
                parkId: postData.parkId,
                postDataFromFE: postData
            },
            success() {
                ctx.session.user.clear = true;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = EditPersonalInfoController;