const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');
const qs = require('querystring');

const url = require('url');

class FrequentlyPhoneController {
    // ....
    // ..获取常用电话列表
    // ....
    static async getFrequentlyPhoneList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'keywords'
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.getFrequentlyPhoneList,
            params: {
                accountId,
                parkId: defaultParkId,
                keywords: params.keywords
            },
            success(responseData) {
                const frequentlyPhoneList = [];
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
                            contactCellphone: responseData.returnData.data[i].contactQueryList[j].cellphone,
                        };
                        temp.contactList.push(contactTemp);
                    }
                    frequentlyPhoneList.push(temp);
                }
                returnData.frequentlyPhoneList = frequentlyPhoneList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..添加组
    // ....
    static async addFrequentlyPhoneGroup(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'name'
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.addFrequentlyPhoneGroup,
            params: {
                accountId,
                parkId: defaultParkId,
                name: postData.name
            },
            success(responseData) {
                returnData.id = responseData.returnData.data.id;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..删除组
    // ....
    static async deleteFrequentlyPhoneGroup(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.deleteFrequentlyPhoneGroup,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..批量新增组中联系人
    // ....
    static async addFrequentlyPhoneContact(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'contactList']
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.addFrequentlyPhoneContact,
            params: {
                accountId,
                parkId: defaultParkId,
                id: postData.id,
                contactList: postData.contactList
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..编辑组名
    // ....
    static async editFrequentlyPhoneGroup(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'name']
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.editFrequentlyPhoneGroup,
            params: {
                accountId,
                parkId: defaultParkId,
                id: postData.id,
                name: postData.name
            }
        });
        ctx.body = returnData;
    }
    
    // ....
    // ..批量编辑组中联系人
    // ....
    static async editFrequentlyPhoneContact(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'contactList']
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.editFrequentlyPhoneContact,
            params: {
                accountId,
                parkId: defaultParkId,
                id: postData.id,
                contactList: postData.contactList
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..批量删除组中联系人
    // ....
    static async deleteFrequentlyPhoneContact(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        params.contactList = params.contactList.slice(1, -1);
        await exception({
            returnData,
            validator: {
                params,
                properties: 'contactList'
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.deleteFrequentlyPhoneContact,
            params: {
                accountId,
                parkId: defaultParkId,
                contactList: params.contactList
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取常用电话列表
    // ....
    static async getFrequentlyPhoneListInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.frequentlyPhoneModel.getFrequentlyPhoneListInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                const groupInfo = {
                    name: responseData.returnData.data.groupName,
                    contactList: []
                };
                for (let i = 0; i < responseData.returnData.data.contactQueryList.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.contactQueryList[i].id,
                        name: responseData.returnData.data.contactQueryList[i].realName,
                        cellphone: responseData.returnData.data.contactQueryList[i].cellphone
                    };
                    groupInfo.contactList.push(temp);
                }
                returnData.groupInfo = groupInfo;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = FrequentlyPhoneController;