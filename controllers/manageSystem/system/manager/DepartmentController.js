const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class DepartmentController {
    // ....
    // ..获取部门列表
    // ....
    static async getDepartmentList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId, defaultParkName } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo' ,'pageSize', 'keywords']
            },
            method: manageSystemModel.systemModel.managerModel.departmentModel.getDepartmentList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const departmentList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        park: defaultParkName,
                        department: responseData.returnData.data.list[i].name,
                        description: responseData.returnData.data.list[i].description,
                        permissions: responseData.returnData.data.list[i].permissionList.map((permission) => {
                            return permission.name
                        }),
                        permissionsGroup: responseData.returnData.data.list[i].permissionHasChildList
                    };
                    departmentList.push(temp);
                }
                returnData.departmentList = departmentList;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..添加部门
    // ....
    static async addDepartment(ctx) {
        let returnData = baseController.getSuccess();
        const params = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['departmentName', 'description', 'permissions']
            },
            method: manageSystemModel.systemModel.managerModel.departmentModel.addDepartment,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取部门可选权限列表
    // ....
    static async getPermissionsList(ctx) {
        let returnData = baseController.getSuccess();
        await exception({
            returnData,
            method: manageSystemModel.systemModel.managerModel.departmentModel.getPermissionsList,
            success(responseData) {
                returnData.permissions = responseData.returnData.data;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..删除部门
    // ....
    static async deleteDepartment(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.managerModel.departmentModel.deleteDepartment,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..获取部门详情
    // ....
    static async getDepartmentInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId, defaultParkName } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.managerModel.departmentModel.getDepartmentInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                const departmentInfo = {
                    id: responseData.returnData.data.id,
                    park: defaultParkName,
                    departmentName: responseData.returnData.data.name,
                    description: responseData.returnData.data.description,
                    permissions: responseData.returnData.data.permissionList.map((permission) => {
                        return permission.id
                    })
                };
                returnData.info = departmentInfo;
            }
        });
        ctx.body = returnData;
    }

    // ....
    // ..编辑部门
    // ....
    static async editDepartment(ctx) {
        let returnData = baseController.getSuccess();
        const params = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['id', 'departmentName', 'description', 'permissions']
            },
            method: manageSystemModel.systemModel.managerModel.departmentModel.editDepartment,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            }
        });
        ctx.body = returnData;
    }
}

module.exports = DepartmentController;