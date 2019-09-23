const baseController = require('../../../common/ResDataFormat');
const exception = require('../../../common/requestModule');
const dateTransition = require('../../../common/dateTransition');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class OrderController {
    // ....
    // ..获取订单列表
    // ....
    static async getOrderList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'orderSerialNumber', 'receiverName', 'receiverCellphone', 'purchaserName', 'purchaserCellphone', 'earliestPurchaseDatetime', 'latestPurchaseDatetime', 'sortRule', 'status']
            },
            method: manageSystemModel.systemModel.mallModel.orderModel.getOrderList,
            params: {
                accountId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const orderList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        serialNumber: responseData.returnData.data.list[i].serialNumber,
                        amount: responseData.returnData.data.list[i].amount,
                        status: responseData.returnData.data.list[i].status === 1
                            ? '待支付' :
                        (responseData.returnData.data.list[i].status === 2
                            ? '已支付' :
                        (responseData.returnData.data.list[i].status === 3
                            ? '已发货' :
                        (responseData.returnData.data.list[i].status === 4
                            ? '已完成' :
                        (responseData.returnData.data.list[i].status === 6
                            ? '已成团' : 
                        (responseData.returnData.data.list[i].status === 8
                            ? '已取消' :
                        (responseData.returnData.data.list[i].status === 9
                            ? '已关闭' : '')))))),
                        statusCode: responseData.returnData.data.list[i].status,
                        createDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime'),
                        receiverName: responseData.returnData.data.list[i].personName,
                        receiverCellphone: responseData.returnData.data.list[i].cellphone,
                        receiverAddress: responseData.returnData.data.list[i].address,
                        expressNumber: responseData.returnData.data.list[i].expressNumber,
                        expressCompany: responseData.returnData.data.list[i].expressCompany
                    };
                    orderList.push(temp);
                }
                returnData.orderList = orderList;
            }
        });
        ctx.body = returnData;
    }

    // 导入订单
    static async importOrder(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'filePath'
            },
            method: manageSystemModel.systemModel.mallModel.orderModel.importOrder,
            params: {
                accountId,
                filePath: postData.filePath
            }
        });
        ctx.body = returnData;
    }
    
    
    


    
    
    
    
}

module.exports = OrderController;