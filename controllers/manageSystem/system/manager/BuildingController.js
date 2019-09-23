const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class BuildingController {
    // ....
    // ..获取大楼列表
    // ....
    static async getBuildingList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['keywords', 'pageNo' ,'pageSize']
            },
            method: manageSystemModel.systemModel.managerModel.buildingModel.getBuildingList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const buildingList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        buildingName: responseData.returnData.data.list[i].buildingName,
                        buildingManager: responseData.returnData.data.list[i].managerRealName,
                        cellphone: responseData.returnData.data.list[i].managerCellphone,
                        permissions: responseData.returnData.data.list[i].permissions
                    };
                    buildingList.push(temp);
                }
                returnData.buildingList = buildingList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..分配管家
    // ....
    static async distributeBuildingManager(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['buildingId' ,'managerId']
            },
            method: manageSystemModel.systemModel.managerModel.buildingModel.distributeBuildingManager,
            params: {
                accountId,
                parkId: defaultParkId,
                buildingId: postData.buildingId,
                managerId: postData.managerId
            }
        });
        ctx.body = returnData;
    }
}

module.exports = BuildingController;