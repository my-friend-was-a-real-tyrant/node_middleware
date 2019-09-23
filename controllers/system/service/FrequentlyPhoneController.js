// 表扬投诉模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const { serverHostname } = require('../../common/constant');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class ComplaintController {
    /**
     * @api {GET} /api/system/service/frequentlyPhone/getFrequentlyPhoneList 获取用户常用电话列表
     * @apiName get my frequently phone list
     * @apiGroup System Service Frequently Phone
     * @apiVersion 1.4.1
     * @apiDescription 获取用户常用电话列表
     * 
     * @apiParam {int} parkId 园区ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/complaint/getComplaintList
     *   {
     *     "parkId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} frequentlyPhoneList 全部电话列表
     * @apiSuccess (list) {int} groupId 组ID
     * @apiSuccess (list) {string} groupName 组名
     * @apiSuccess (list) {array} contactList 联系方式列表
     * @apiSuccess (contactList) {int} contactId 联系人id
     * @apiSuccess (contactList) {string} contactName 名字
     * @apiSuccess (contactList) {string} cellphone 电话
     * 
     *
     */
    static async getFrequentlyPhoneList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'parkId'
            },
            method: systemModel.serviceModel.frequentlyPhoneModel.getFrequentlyPhoneList,
            params: {
                userId,
                parkId: params.parkId
            },
            success(responseData) {
                returnData.frequentlyPhoneList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        groupId: responseData.returnData.data[i].id,
                        groupName: responseData.returnData.data[i].groupName,
                        contactList: []
                    };
                    for (let j = 0; j < responseData.returnData.data[i].contactQueryList.length; j ++) {
                        const contactTemp = {
                            contactId: responseData.returnData.data[i].contactQueryList[j].id,
                            contactName: responseData.returnData.data[i].contactQueryList[j].realName,
                            cellphone: responseData.returnData.data[i].contactQueryList[j].cellphone
                        }
                        temp.contactList.push(contactTemp);
                    }
                    returnData.frequentlyPhoneList.push(temp);
                }
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ComplaintController;