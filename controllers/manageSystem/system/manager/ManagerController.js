const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class ManagerController {
    // ....
    // ..获取管理员列表
    // ....
    static async getManagerList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['managerName', 'managerCellphone', 'job', 'department', 'pageNo', 'pageSize']
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.getManagerList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const repairmentList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        departmentName: responseData.returnData.data.list[i].eipList.length === 0 ? '无' : (responseData.returnData.data.list[i].eipList[0].manager ? '无' : responseData.returnData.data.list[i].eipList[0].departmentName),
                        job: responseData.returnData.data.list[i].eipList.length === 0 ? '无' : (responseData.returnData.data.list[i].eipList[0].manager ? '园区经理' : (responseData.returnData.data.list[i].eipList[0].job === 1 ? '经理' : '员工')),
                        managerId: responseData.returnData.data.list[i].id,
                        managerName: responseData.returnData.data.list[i].realName,
                        managerCellphone: responseData.returnData.data.list[i].cellphone,
                        isParkManager: responseData.returnData.data.list[i].eipList.length === 0 ? false : (responseData.returnData.data.list[i].eipList[0].manager ? true : false),
                        isLocked: responseData.returnData.data.list[i].locked ? '已冻结' : '未冻结'
                    };
                    repairmentList.push(temp);
                }
                returnData.repairmentList = repairmentList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取简单管理员列表
    // ....
    static async getSimpleManagerList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.managerModel.managerModel.getSimpleManagerList,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                const managerList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        value: responseData.returnData.data[i].id,
                        label: responseData.returnData.data[i].realName + '/' + responseData.returnData.data[i].cellphone
                    };
                    managerList.push(temp);
                }
                returnData.managerList = managerList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..添加管理员
    // ....
    static async addManager(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['managerName', 'managerCellphone']
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.addManager,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            },
            success(responseData) {
                returnData.managerId = responseData.returnData.data.id;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取管理员信息
    // ....
    static async getManagerInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'managerId'
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.getManagerInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                managerId: params.managerId
            },
            success(responseData) {
                returnData.managerName = responseData.returnData.data.realName;
                returnData.managerCellphone = responseData.returnData.data.cellphone;
                returnData.isLocked = responseData.returnData.data.locked;
                returnData.isLockedWord = responseData.returnData.data.locked ? '已冻结' : '未冻结';
                returnData.eipList = responseData.returnData.data.eipList;
                const departmentListTemp = [];
                for (let i = 0; i < responseData.returnData.data.eipList.length; i ++) {
                    const departmentTemp = {
                        id: responseData.returnData.data.eipList[i].manager ? -1 : responseData.returnData.data.eipList[i].id,
                        name: responseData.returnData.data.eipList[i].manager ? '园区经理' : (responseData.returnData.data.eipList[i].departmentName + '--' + (responseData.returnData.data.eipList[i].job === 1 ? '经理' : '员工'))
                    };
                    departmentListTemp.push(departmentTemp);
                }
                returnData.departmentList = departmentListTemp;
                const permissionsTemp = [];
                // for (let i = 0; i < responseData.returnData.data.permissions.length; i ++) {
                //     permissionsTemp.push(responseData.returnData.data.permissions[i].permissionName);
                // }
                returnData.permissions = responseData.returnData.data.permissionHasChildList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取部门简单列表
    // ....
    static async getSimpleDepartmentList(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.managerModel.managerModel.getSimpleDepartmentList,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                const departmentList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const department = {
                        value: responseData.returnData.data[i].id,
                        label: responseData.returnData.data[i].name,
                        children: [{
                            value: 1,
                            label: '经理'
                        }, {
                            value: 2,
                            label: '员工'
                        }]
                    }
                    departmentList.push(department);
                }
                returnData.departmentList = departmentList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..分配部门
    // ....
    static async addManagerDepartment(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['managerId', 'departmentId', 'jobId']
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.addManagerDepartment,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            },
            success(responseData) {
                returnData.id = responseData.returnData.data.id;
                returnData.name = responseData.returnData.data.departmentName + '--' + (postData.jobId === 1 ? '经理' : '员工');
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..设为园区经理
    // ....
    static async setAsParkManager(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['managerId']
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.setAsParkManager,
            params: {
                accountId,
                parkId: defaultParkId,
                managerId: postData.managerId
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..移出部门
    // ....
    static async removeManagerDepartment(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.removeManagerDepartment,
            params: {
                accountId,
                parkId: defaultParkId,
                id: postData.id
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..编辑管理员
    // ....
    static async editManager(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['managerId', 'managerName', 'managerCellphone']
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.editManager,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..重置密码
    // ....
    static async resetPassword(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'managerId'
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.resetPassword,
            params: {
                accountId,
                parkId: defaultParkId,
                managerId: postData.managerId
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..冻结管理员
    // ....
    static async lockManager(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'managerId'
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.lockManager,
            params: {
                accountId,
                parkId: defaultParkId,
                managerId: postData.managerId
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..管理员解冻
    // ....
    static async unlockManager(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: 'managerId'
            },
            method: manageSystemModel.systemModel.managerModel.managerModel.unlockManager,
            params: {
                accountId,
                parkId: defaultParkId,
                managerId: postData.managerId
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ManagerController;