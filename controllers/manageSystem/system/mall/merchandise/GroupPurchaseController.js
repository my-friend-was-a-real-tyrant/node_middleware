const baseController = require('../../../../common/ResDataFormat');
const exception = require('../../../../common/requestModule');
const dateTransition = require('../../../../common/dateTransition');
const manageSystemModel = require('../../../../../models/ManageSystemModel');
const { serverHostname } = require('../../../../common/constant');

const url = require('url');

class GroupPurchaseController {
    // ....
    // ..创建团购
    // ....
    static async createGroupPurchase(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'startDatetime', 'endDatetime', 'maxCount', 'price']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.createGroupPurchase,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..编辑团购
    // ....
    static async editGroupPurchase(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['groupPurchaseId', 'startDatetime', 'endDatetime', 'maxCount', 'price']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.editGroupPurchase,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
    
    
    // ....
    // ..设置拼团
    // ....
    static async setTogetherInfo(ctx) {
        let returnData = baseController.getSuccess();        
        const postData = ctx.request.body;
        console.log(postData);
        const { accountId, defaultParkId } = ctx.session.manager;
        
        await exception({  
            returnData,
            validator: {
                params: postData,
                properties: ['merchandiseId', 'lumpCount', 'validTime', 'spellPrice']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.setTogetherInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData                
            },
            success(responseData){
                console.log(responseData);
                returnData.data = responseData.returnData.data; 
            }
            
        });
        ctx.body = returnData;       
        
    }
    
    
    
    
    // ....
    // ..取消拼团
    // ....
    static async cancelGroup(ctx) {
        let returnData = baseController.getSuccess();        
        const postData = ctx.request.body;
        console.log(postData);
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({  
            returnData,
            validator: {
                params: postData,
                properties: 'merchandiseId'
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.cancelGroup,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData                
            },
            success(responseData){
                console.log(responseData);
                returnData.data = responseData.returnData.data; 
            }
        });
        
        
        
        ctx.body = returnData;
        
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ....
    // ..单买分页列表
    // ....
    static async getAloneInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: params,
                properties: ['merchandiseId', 'status', 'pageNo', 'pageSize']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.getAloneInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData){
                console.log(responseData);
                returnData.data = responseData.returnData.data; 
            }
        });
        ctx.body = returnData;
    }
    
    // ....
    // ..拼团分页列表
    // ....
    static async getTogetherInfo(ctx) {
        let returnData = baseController.getSuccess();
        //const postData = ctx.request.body;
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['merchandiseId', 'status', 'pageNo', 'pageSize']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.getTogetherInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData){
                console.log(responseData);
                returnData.data = responseData.returnData.data; 
            }
        });
        ctx.body = returnData;
    }
    
    
    
    // ....
    // ..拼团详情
    // ....
    static async getTogetherDetails(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['groupId']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.getTogetherDetails,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            },
            success(responseData){
                console.log(responseData);
                returnData.data = responseData.returnData.data; 
            }
        });
        ctx.body = returnData;
    }
    
    // ....
    // ..强制成团
    // ....
    static async forceGroup(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;        
        const { accountId, defaultParkId } = ctx.session.manager;
        console.log( accountId );
        console.log( defaultParkId );
        console.log( ctx.response );
        console.log( ctx.request );
        await exception({
            returnData,
            validator: {
                params:postData,
                properties: 'groupId'
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.forceGroup,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            },
            success(responseData){
                console.log(responseData);
                returnData.data = responseData.returnData.data; 
                console.log( 'force' );
            }
        });
        ctx.body = returnData;
    }
    
    
    // ....
    // ..上下架商品
    // ....
    static async goodsUpDown(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['merchandiseId','operationType']
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.goodsUpDown,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            },
            success(responseData){
                console.log(responseData);
                returnData.data = responseData.returnData; 
            }
        });
        ctx.body = returnData;
    }
    
    
    
    // ....
    // ..获取统计
    // ....
    static async getUserCount(ctx) {
        let returnData = baseController.getSuccess();
        // console.log(returnData)
        //const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;        
        // console.log( accountId );
        await exception({
            returnData,           
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.getUserCount,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData){
                returnData.data = responseData.returnData.data;
            }
        });      
        // console.log(returnData)  
        ctx.body = returnData;
    }
    

    // ....
    // ..获取导出订单excel地址
    // ....
    static async exportOrder(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.exportOrder,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                returnData.path = serverHostname + responseData.returnData.data.filePath;
            }
        });
        ctx.body = returnData;
    }


    // ....
    // ..获取导出单买订单excel地址
    // ....
    static async exportSingleOrder(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.mallModel.merchandiseModel.groupPurchaseModel.exportSingleOrder,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                returnData.path = serverHostname + responseData.returnData.data.filePath;
            }
        });
        ctx.body = returnData;
    }

}

module.exports = GroupPurchaseController;