const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class RoomController {
    // 导入房间列表
    static async importRoomList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'filePath'
            },
            method: manageSystemModel.systemModel.propertyModel.roomModel.importRoomList,
            params: {
                accountId,
                parkId: defaultParkId,
                filePath: postData.filePath
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取房屋列表
    // ....
    static async getRoomList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords']
            },
            method: manageSystemModel.systemModel.propertyModel.roomModel.getRoomList,
            params: {
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const roomList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        roomId: responseData.returnData.data.list[i].id,
                        management: responseData.returnData.data.list[i].managementDivision,
                        buildingName: responseData.returnData.data.list[i].buildingName,
                        unitName: responseData.returnData.data.list[i].unitName,
                        roomCode: responseData.returnData.data.list[i].roomCode,
                        proprietorName: responseData.returnData.data.list[i].proprietorName,
                        cellphone: responseData.returnData.data.list[i].cellphone,
                        memberList: responseData.returnData.data.list[i].personInfoList ? responseData.returnData.data.list[i].personInfoList : [],
                        roomProperty: responseData.returnData.data.list[i].personInfoList ? responseData.returnData.data.list[i].roomProperty : [],
                    };
                    roomList.push(temp);
                }
                returnData.roomList = roomList;
            }
        });
        ctx.body = returnData;
    }

    // 编辑户主信息
    static async editHostInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['roomId', 'cellphone', 'name']
            },
            method: manageSystemModel.systemModel.propertyModel.roomModel.editHostInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                roomId: postData.roomId,
                cellphone: postData.cellphone,
                name: postData.name
            }
        });
        ctx.body = returnData;
    }
}

module.exports = RoomController;