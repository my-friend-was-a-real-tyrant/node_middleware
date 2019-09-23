const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class SmsController {
    // ....
    // ..获取短信列表
    // ....
    static async getSmsList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate']
            },
            method: manageSystemModel.systemModel.systemModel.smsModel.getSmsList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const smsList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        serialNumber: responseData.returnData.data.list[i].serialNumber,
                        cellphone: responseData.returnData.data.list[i].cellphone,
                        content: responseData.returnData.data.list[i].content,
                        status: responseData.returnData.data.list[i].status === 1 
                            ? '待发送' :
                        (responseData.returnData.data.list[i].status === 2 
                            ? '已请求' : 
                        (responseData.returnData.data.list[i].status === 3
                            ? '请求失败' :
                        (responseData.returnData.data.list[i].status === 5
                            ? '已送达' :
                        (responseData.returnData.data.list[i].status === 6
                            ? '未送达' : '未知')))),
                        createDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime'),
                        sendDatetime: dateTransition(responseData.returnData.data.list[i].sendDatetime, 'datetime'),
                        receiveDatetime: dateTransition(responseData.returnData.data.list[i].receiveDatetime, 'datetime'),
                        retryTimes: responseData.returnData.data.list[i].retryTimes
                    };
                    smsList.push(temp);
                }
                returnData.smsList = smsList;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = SmsController;