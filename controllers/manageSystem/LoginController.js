// 后台管理登录
const baseController = require('../common/ResDataFormat');
const exception = require('../common/requestModule');
const manageSystemModel = require('../../models/ManageSystemModel');

class LoginController {
    /**
     * @api {DELETE} /api/manageSystem/login/clearSession 清除session
     * @apiName clear session
     * @apiGroup ManageSystem Login
     * @apiVersion 1.0.0
     * @apiDescription 清除session
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async clearSession(ctx) {
        let returnData = baseController.getSuccess();
        try {
            ctx.session = null;
        } catch(error) {
            returnData = baseController.getFail('E0002', '系统繁忙');
        }
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/login/getBackgroundImg 获取背景图片
     * @apiName get background img
     * @apiGroup ManageSystem Login
     * @apiVersion 1.0.0
     * @apiDescription 获取背景图片
     * 
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {string} backgroundUrl 背景图片
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "backgroundUrl": "http://www.baidu.com/"
     *   }
     * 
     *
     */
    static async getBackgroundImg(ctx) {
        let returnData = baseController.getSuccess();
        const responseData = await manageSystemModel.loginModel.getBackgroundImg();
        returnData.backgroundUrl = 'http://cn.bing.com' + responseData.images[0].url;
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/getParkList 获取园区列表
     * @apiName get park list
     * @apiGroup ManageSystem Login
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
            method: manageSystemModel.loginModel.getParkList,
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
     * @api {POST} /api/manageSystem/login/login 登录
     * @apiName login
     * @apiGroup ManageSystem Login
     * @apiVersion 1.0.0
     * @apiDescription 登录
     * 
     * @apiParam {string} userName 用户名
     * @apiParam {string} password 密码(md5)
     *
     * @apiParamExample {json} Request Example
     *   POST /api/manageSystem/login/login
     *   {
     *     "userName": "13333333333",
     *     "passwordd": "123456"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async login(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['userName', 'password']
            },
            method: manageSystemModel.loginModel.login,
            params: {
                userName: postData.userName,
                password: postData.password
            },
            success(responseData) {
                const managerInfo = responseData.returnData.data;
                managerInfo.client = 'app';
                managerInfo.accountId = managerInfo.id;
                ctx.session.manager = managerInfo;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/manageSystem/login/loginPc pc端登录
     * @apiName pc login
     * @apiGroup ManageSystem Login
     * @apiVersion 1.0.0
     * @apiDescription pc端登录
     * 
     * @apiParam {string} userName 用户名
     * @apiParam {string} password 密码(md5)
     * @apiParam {int} parkId 园区Id
     * @apiParam {string} parkName 园区名
     *
     * @apiParamExample {json} Request Example
     *   POST /api/manageSystem/login/loginPc
     *   {
     *     "userName": "13333333333",
     *     "password": "123456",
     *     "park": 1,
     *     "parkName": "杭州/中大银泰城"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async loginPc(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        let managerInfo = {};
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['userName', 'password']
            },
            method: manageSystemModel.loginModel.login,
            params: {
                userName: postData.userName,
                password: postData.password
            },
            success(responseData) {
                managerInfo = responseData.returnData.data;
                managerInfo.accountId = managerInfo.id;
            }
        });
        if (returnData.code === '00000') {
            await exception({
                returnData,
                validator: {
                    params: postData,
                    properties: ['parkId', 'parkName']
                },
                method: manageSystemModel.loginModel.choosePark,
                params: {
                    accountId: managerInfo.accountId,
                    parkId: postData.parkId
                },
                success(responseDataP) {
                    managerInfo.defaultParkId = postData.parkId;
                    managerInfo.defaultParkName = postData.parkName;
                    managerInfo.parkManager = responseDataP.returnData.data.parkManager;
                    managerInfo.permissions = responseDataP.returnData.data.permissions;
                    managerInfo.client = 'web';
                    ctx.session.manager = managerInfo;
                    // 权限赋予
                    returnData.permissions = managerInfo.permissions;
                }
            });
        }
        ctx.body = returnData;
    }

    static async putTest(ctx) {
        let returnData = baseController.getSuccess();
        manageSystemModel.loginModel.putTest
        try {
            const responseData = await manageSystemModel.loginModel.putTest(1, 2);
        } catch(error) {
            returnData = baseController.getFail('E0002', error.message);
        }
        // await exception({
        //     returnData,
        //     method: [manageSystemModel.loginModel.putTest, manageSystemModel.loginModel.putTest]
        // });
        ctx.body = returnData;
    }
}

module.exports = LoginController;