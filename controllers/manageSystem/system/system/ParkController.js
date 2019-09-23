const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class ParkController {
    // ....
    // ..获取园区列表
    // ....
    static async getParkList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords']
            },
            method: manageSystemModel.systemModel.systemModel.parkModel.getParkList,
            params: {
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const parkList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        cityName: responseData.returnData.data.list[i].cityName,
                        name: responseData.returnData.data.list[i].name,
                        address: responseData.returnData.data.list[i].address
                    };
                    parkList.push(temp);
                }
                returnData.parkList = parkList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..添加园区
    // ....
    static async addPark(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['name', 'address', 'districtId']
            },
            method: manageSystemModel.systemModel.systemModel.parkModel.addPark,
            params: {
                accountId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ParkController;