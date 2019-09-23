const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const send = require('koa-send');
const url = require('url');

class paymentController {
    // ....
    // ..物业费缴费记录
    // ....
    static async getPropertyList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.getPropertyList,
            params: {
                parkId: defaultParkId,
                accountId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
                // returnData.count = responseData.returnData.data.total;
                // const propertyList = [];
                // for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                //     const temp = {
                //         roomId: responseData.returnData.data.list[i].id,
                //         management: responseData.returnData.data.list[i].managementDivision,
                //         buildingName: responseData.returnData.data.list[i].buildingName,
                //         unitName: responseData.returnData.data.list[i].unitName,
                //         roomCode: responseData.returnData.data.list[i].roomCode,
                //         proprietorName: responseData.returnData.data.list[i].proprietorName,
                //         cellphone: responseData.returnData.data.list[i].cellphone,
                //         memberList: responseData.returnData.data.list[i].personInfoList ? responseData.returnData.data.list[i].personInfoList : []
                //     };
                //     propertyList.push(temp);
                // }
                // returnData.propertyList = propertyList;
            }
        });
        // await send(ctx, 'asd', { root: __dirname + '/home/testuser/zhongda/static/resource/upload/room/2017/11/20/b81e6b58f965a86435830d0906df1372.xls' });
        ctx.body = returnData;
    }

    // ....
    // ..水费缴费记录
    // ....
    static async getWaterList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.getWaterList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
                for(let i = 0; i<returnData.data.returnData.list.length; i++) {
                    returnData.data.returnData.list[i].notPay = `${returnData.data.returnData.list[i].notPay}`.indexOf('.') > 0 ? `${returnData.data.returnData.list[i].notPay}` : `${returnData.data.returnData.list[i].notPay}` + '.00'
                }
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..物业费明细
    // ....
    static async propertyDetail(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['roomId', 'pageNumber', 'pageSize', 'start', 'end']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.propertyDetail,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
                for(let i = 0; i < returnData.data.returnData.list.length; i++) {
                    returnData.data.returnData.list[i].costType = returnData.data.returnData.list[i].costType === 1 ? '未缴费' : '已缴';
                    returnData.data.returnData.list[i].cost = `${returnData.data.returnData.list[i].cost}`.indexOf('.') > 0 ? `${returnData.data.returnData.list[i].cost}` : `${returnData.data.returnData.list[i].cost}` + '.00'
                }
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..水费明细
    // ....
    static async waterDetail(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['roomId', 'pageNumber', 'pageSize', 'start', 'end']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.waterDetail,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
                let list = returnData.data.returnData.list;
                for(let i = 0; i < list.length; i++) {
                    list[i].costType = list[i].costType === 1 ? '未缴费' : '已缴';
                    list[i].waterCost = `${list[i].waterCost}`.indexOf('.') > 0 ? `${list[i].waterCost}` : `${list[i].waterCost}` + '.00';
                    list[i].electricityCost = `${list[i].electricityCost}`.indexOf('.') > 0 ? `${list[i].electricityCost}` : `${list[i].electricityCost}` + '.00';
                    list[i].airCost = `${list[i].airCost}`.indexOf('.') > 0 ? `${list[i].airCost}` : `${list[i].airCost}` + '.00';
                }
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..物业费明细编辑
    // ....
    static async propertyDetailEdit(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['costType', 'id', 'cost']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.propertyDetailEdit,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..水费明细编辑
    // ....
    static async waterDetailEdit(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['waterCost', 'id', 'electricityCost', 'airCost']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.waterDetailEdit,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..水费明细预存金额编辑
    // ....
    static async waterMoneyEdit(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.waterMoneyEdit,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // 导入物业费列表
    static async importPropertyList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'filePath'
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.importPropertyList,
            params: {
                accountId,
                parkId: defaultParkId,
                filePath: postData.filePath
            }
        });
        ctx.body = returnData;
    }

    // 导入水电费列表
    static async importWaterList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'filePath'
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.importWaterList,
            params: {
                accountId,
                parkId: defaultParkId,
                filePath: postData.filePath
            }
        });
        ctx.body = returnData;
    }
    
    // ....
    // ..支付规则初始化
    // ....
    static async payRuleinit(ctx) {
        let returnData = baseController.getSuccess();
        // const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.propertyModel.paymentModel.payRuleinit,
            params: {
                accountId,
                parkId: defaultParkId,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..支付规则保存
    // ....
    static async payRulesave(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['payType', 'id']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.payRulesave,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..下载模板
    // ....
    static async downTemplate(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['templateId']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.downTemplate,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = serverHostname + responseData.returnData.data;
                // returnData.data.returnData = 'http://system-test.zhongdapuhui.com' + '/resource/' + responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..物业费导出全部
    // ....
    static async downPropertyAll(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['year']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.downPropertyAll,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = serverHostname + responseData.returnData.data;
                // returnData.data.returnData = 'http://system-test.zhongdapuhui.com' + responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..水费导出全部
    // ....
    static async downWaterAll(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['year']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.downWaterAll,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = serverHostname + responseData.returnData.data;
                // returnData.data.returnData = 'http://system-test.zhongdapuhui.com' + '/resource/' + responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..物业费导出单条
    // ....
    static async downPropertySin(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['year', 'roomId']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.downPropertySin,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = serverHostname + responseData.returnData.data;
                // returnData.data.returnData = 'http://system-test.zhongdapuhui.com' + '/resource/' + responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..水费导出单条
    // ....
    static async downWaterSin(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['year', 'roomId']
            },
            method: manageSystemModel.systemModel.propertyModel.paymentModel.downWaterSin,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = serverHostname + responseData.returnData.data;
                // returnData.data.returnData = 'http://system-test.zhongdapuhui.com' + responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ..水费预存金额
    // ....
    static async waterLeft(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.propertyModel.paymentModel.waterLeft,
            validator: {
                params,
                properties: ['roomId']
            },
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
                returnData.data.returnData.preStorage = `${ returnData.data.returnData.preStorage}`.indexOf('.') > 0 ? `${ returnData.data.returnData.preStorage}` : `${ returnData.data.returnData.preStorage}` + '.00'
            }
        });
        ctx.body = returnData;
    }

    // ..水费预存金额编辑
    // ....
    static async waterLeftEdit(ctx) {
        let returnData = baseController.getSuccess();
        // const params = url.parse(ctx.request.url, true).query;
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        console.log(postData)
        await exception({
            returnData,
            method: manageSystemModel.systemModel.propertyModel.paymentModel.waterLeftEdit,
            validator: {
                params: postData,
                properties: ['roomId', 'preStorage', 'id']
            },
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData,
            },
            success(responseData) {
                returnData.data = responseData;
                returnData.data.returnData = responseData.returnData.data;
                returnData.data.returnData.preStorage = `${ returnData.data.returnData.preStorage}`.indexOf('.') > 0 ? `${ returnData.data.returnData.preStorage}` : `${ returnData.data.returnData.preStorage}` + '.00'
            }
        });
        ctx.body = returnData;

        
    }












    // ....
    // ..用户水电费列表获取
    // ....
    static async userWaterListGet(ctx) {
        let returnData = baseController.getSuccess();



        // const postData = ctx.request.body;
        // const { accountId, defaultParkId } = ctx.session.manager;
        // await exception({
        //     returnData,
        //     validator: {
        //         params: postData,
        //         properties: ['year', 'roomId']
        //     },
        //     method: manageSystemModel.systemModel.propertyModel.paymentModel.downWaterSin,
        //     params: {
        //         accountId,
        //         parkId: defaultParkId,
        //         postDataFromFE: postData,
        //     },
        //     success(responseData) {
        //         returnData.data = responseData;
        //         // returnData.data.returnData = serverHostname + '/resource/' + responseData.returnData.data;
        //         returnData.data.returnData = 'http://system-test.zhongdapuhui.com' + '/resource/' + responseData.returnData.data;
        //     }
        // });
        // ctx.body = returnData;
    }


    

    
}

module.exports = paymentController;