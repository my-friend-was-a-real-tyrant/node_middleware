// 我的家庭模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const systemModel = require('../../../models/SystemModel');
const { serverHostname } = require('../../common/constant');

class MyFamilyController {
    /**
     * @api {GET} /api/system/personalCenter/getMyFamilyInfo 获取我的家庭所需信息
     * @apiName get my family info
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 获取我的家庭所需信息
     * 
     * @apiParam {number} roomId 房间id
     * @apiParamExample {json} Request Example
     *   GET /api/system/personalCenter/getMyFamilyInfo
     *   {
     *     "roomId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} data 用户信息，在isVisitor为false时存在
     * @apiSuccess (data) {number} identity 用户身份
     * @apiSuccess (data) {bool} theResponsible 是否是代理人
     * @apiSuccess (data) {number} memberCount 房屋内的成员数量
     * @apiSuccess (data) {array} responsibleList 代理人列表
     * @apiSuccess (data) {array} auditedList 已审核和已拒绝成员列表
     * @apiSuccess (data) {array} waitedList 待审核成员列表
     * @apiSuccess (data) {array} memberList 房屋成员列表
     * @apiSuccess (list) {number} id 申请记录ID
     * @apiSuccess (list) {number} userId 用户ID
     * @apiSuccess (list) {number} roomId 房间ID
     * @apiSuccess (list) {string} avatar 用户头像
     * @apiSuccess (list) {bool} theResponsible 是否是代理人
     * @apiSuccess (list) {int} identity 用户身份
     * @apiSuccess (list) {string} realName 用户姓名
     * @apiSuccess (list) {string} cellphone 用户手机号
     * @apiSuccess (list) {int} status 用户状态(1-待审核;2-审核通过;3-已拒绝)
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "isVisitor": false,
     *     "data": {
     *         "identity": 1,
     *         "theResponsible": true,
     *         "memberCount": 2,
     *         "responsibleList": [{
     *             "id": 1,
     *             "userId": 1,
     *             "roomId": 1,
     *             "avatar": "http://www.baidu.com/a.jpg",
     *             "theResponsible": true,
     *             "identity": 2,
     *             "realName": "徐凌",
     *             "cellphone": "13333333333",
     *             "status": 1
     *         }],
     *         "auditedList": [],
     *         "waitedList": [],
     *         "memberList": []
     *     }
     *   }
     * 
     *
     */
    static async getMyFamilyInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'roomId'
            },
            method: systemModel.personalCenterModel.myFamilyModel.getMyFamilyInfo,
            params: {
                userId,
                roomId: params.roomId
            },
            success(responseData) {
                returnData.data = responseData.returnData.data;
                if (Object.prototype.hasOwnProperty.call(returnData.data, 'auditedList') === true) {
                    for (let i = 0; i < returnData.data.auditedList.length; i ++) {
                        returnData.data.auditedList[i].avatar = returnData.data.auditedList[i].avatar ? (returnData.data.auditedList[i].avatar.indexOf('http') === 0 
                            ? returnData.data.auditedList[i].avatar 
                            : serverHostname + returnData.data.auditedList[i].avatar) : '';
                        if (returnData.data.auditedList[i].identity === 1) {
                            returnData.data.auditedList.splice(i, 1);
                            i --;
                        }
                    }
                }
                if (Object.prototype.hasOwnProperty.call(returnData.data, 'waitedList') === true) {
                    for (let i = 0; i < returnData.data.waitedList.length; i ++) {
                        returnData.data.waitedList[i].avatar = returnData.data.waitedList[i].avatar ? (returnData.data.waitedList[i].avatar.indexOf('http') === 0 
                            ? returnData.data.waitedList[i].avatar 
                            : serverHostname + returnData.data.waitedList[i].avatar) : '';
                    }
                }
                if (Object.prototype.hasOwnProperty.call(returnData.data, 'memberList') === true) {
                    for (let i = 0; i < returnData.data.memberList.length; i ++) {
                        returnData.data.memberList[i].avatar = returnData.data.memberList[i].avatar ? (returnData.data.memberList[i].avatar.indexOf('http') === 0 
                            ? returnData.data.memberList[i].avatar 
                            : serverHostname + returnData.data.memberList[i].avatar) : '';
                    }
                }
                if (Object.prototype.hasOwnProperty.call(returnData.data, 'responsibleList') === true) {
                    for (let i = 0; i < returnData.data.responsibleList.length; i ++) {
                        returnData.data.responsibleList[i].avatar = returnData.data.responsibleList[i].avatar ? (returnData.data.responsibleList[i].avatar.indexOf('http') === 0 
                            ? returnData.data.responsibleList[i].avatar 
                            : serverHostname + returnData.data.responsibleList[i].avatar) : '';
                    }
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/personalCenter/getMemberInfo 获取成员信息详情
     * @apiName get member info
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 获取成员信息详情
     * 
     * @apiParam {number} id 记录ID
     * @apiParam {number} auditStatus[可选] 状态(1或不填-已审核;2-待审核)
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/personalCenter/getMemberInfo
     *   {
     *     "id": 1,
     *     "auditStatus": 2
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} info 用户信息
     * @apiSuccess (info) {number} id 记录id
     * @apiSuccess (info) {number} userId 用户id
     * @apiSuccess (info) {number} roomId 房间id
     * @apiSuccess (info) {string} avatar 头像地址
     * @apiSuccess (info) {bool} theResponsible 是否代理人
     * @apiSuccess (info) {bool} theDefault 是否默认房屋
     * @apiSuccess (info) {string} realName 真实姓名
     * @apiSuccess (info) {number} identity 身份
     * @apiSuccess (info) {string} cellphone 手机号
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "info": {
     *         "id": 1,
     *         "userId": 1,
     *         "roomId": 1,
     *         "avatar": "http://www.baidu.com",
     *         "theResponsible": true,
     *         "theDefault": true,
     *         "realName": "徐凌",
     *         "identity": 1,
     *         "cellphone": "13333333333"
     *     }
     *   }
     * 
     *
     */
    static async getMemberInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: systemModel.personalCenterModel.myFamilyModel.getMemberInfo,
            params: {
                userId, 
                id: params.id,
                auditStatus: params.auditStatus
            },
            success(responseData) {
                returnData.info = responseData.returnData.data;
                returnData.info.avatar = returnData.info.avatar ? (returnData.info.avatar.indexOf('http') === 0 
                    ? returnData.info.avatar
                    : serverHostname + returnData.info.avatar) : '';
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/personalCenter/setAgent 设为代理人
     * @apiName set member as agent
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 设为代理人
     * 
     * @apiParam {number} id 记录ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/personalCenter/setAgent
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async setAgent(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: systemModel.personalCenterModel.myFamilyModel.setAgent,
            params: {
                userId,
                id: postData.id
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/personalCenter/cancelAgent 取消代理人
     * @apiName cancel member as agent
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 取消代理人
     * 
     * @apiParam {number} id 记录ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/personalCenter/cancelAgent
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async cancelAgent(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: systemModel.personalCenterModel.myFamilyModel.cancelAgent,
            params: {
                userId,
                id: postData.id
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/personalCenter/auditMember 审批或拒绝成员
     * @apiName audit member
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 审批或拒绝成员
     * 
     * @apiParam {number} id 记录ID
     * @apiParam {string} type 类型（agree为通过, disagree为拒绝）
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/personalCenter/auditMember
     *   {
     *     "id": 1,
     *     "type": "agree"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async auditMember(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'type']
            },
            method: systemModel.personalCenterModel.myFamilyModel.auditMember,
            params: {
                type: postData.type,
                userId,
                id: postData.id
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/personalCenter/getMyRoomList 获取用户房屋列表
     * @apiName get my room list
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 获取用户房屋列表
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} roomList 房屋列表
     * @apiSuccess (roomList) {int} roomId 房屋ID
     * @apiSuccess (roomList) {string} roomName 房屋名
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "roomList": {
     *         "roomId": 1,
     *         "roomName": "中大银泰城1-1101"
     *     }
     *   }
     * 
     *
     */
    static async getMyRoomList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        await exception({
            returnData,
            method: systemModel.personalCenterModel.myFamilyModel.getMyRoomList,
            params: {
                userId
            },
            success(responseData) {
                const roomList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const roomItem = {
                        roomId: responseData.returnData.data[i].roomId,
                        roomName: responseData.returnData.data[i].simpleName
                    }
                    roomList.push(roomItem);
                }
                returnData.roomList = roomList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/personalCenter/setDefaultRoom 用户切换园区（设置默认园区）
     * @apiName set default room
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 用户切换园区（设置默认园区）
     * 
     * @apiParam {number} roomId 房屋ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/personalCenter/setDefaultRoom
     *   {
     *     "roomId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} info 用户信息
     * @apiSuccess (info) {number} identity 身份
     * @apiSuccess (info) {bool} theResponsible 是否为代理人
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "info": {
     *         "identity": 1,
     *         "theResponsible": true
     *     }
     *   }
     * 
     *
     */
    static async setDefaultRoom(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'roomId'
            },
            method: systemModel.personalCenterModel.myFamilyModel.setDefaultRoom,
            params: {
                userId,
                roomId: postData.roomId
            },
            success(responseData) {
                returnData.info = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/personalCenter/delMember 删除成员
     * @apiName delete member
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 删除成员
     * 
     * @apiParam {number} id 记录ID
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/personalCenter/delMember
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async delMember(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: systemModel.personalCenterModel.myFamilyModel.delMember,
            params: {
                userId,
                id: postData.id
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/system/personalCenter/inviteMember 邀请家庭成员
     * @apiName invite member
     * @apiGroup System PersonalCenter MyFamily
     * @apiVersion 1.4.1
     * @apiDescription 邀请家庭成员
     * 
     * @apiParam {number} parkId 园区ID
     * @apiParam {number} roomId 房间ID
     * @apiParam {string} name 姓名
     * @apiParam {string} cellphone 手机号
     * @apiParam {number} identity 身份(2-家属;3-租客)
     *
     * @apiParamExample {json} Request Example
     *   POST /api/system/personalCenter/inviteMember
     *   {
     *     "parkId": 1,
     *     "roomId": 1,
     *     "name": "徐凌",
     *     "cellphone": "13333333333",
     *     "identity": 2
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async inviteMember(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['parkId', 'roomId', 'name', 'cellphone', 'identity']
            },
            method: systemModel.personalCenterModel.myFamilyModel.inviteMember,
            params: {
                userId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
}

module.exports = MyFamilyController;