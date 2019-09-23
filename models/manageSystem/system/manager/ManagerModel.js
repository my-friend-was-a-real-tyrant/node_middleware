const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class ManagerModel {
    // ....
    // ..获取管理员列表
    // ....
    static getManagerList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['14']['1402'];
        const params = {
            realName: postDataFromFE.managerName,
            cellphone: postDataFromFE.managerCellphone,
            job: postDataFromFE.job,
            departmentId: postDataFromFE.department,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize,
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取简单管理员列表
    // ....
    static getSimpleManagerList({ accountId, parkId }) {
        const api = requestAPIList['14']['1408'];
        const params = {
            accountId,
            parkId,
            type: 1
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..添加管理员
    // ....
    static addManager({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['14']['1401'];
        const postData = {
            realName: postDataFromFE.managerName,
            cellphone: postDataFromFE.managerCellphone,
            parkId,
            accountId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData

        return request(httpRequestParams);
    }

    // ....
    // ..获取管理员信息
    // ....
    static getManagerInfo({ accountId, parkId, managerId }) {
        const api = requestAPIList['14']['1403'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: managerId
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取简单部门列表
    // ....
    static getSimpleDepartmentList({ accountId, parkId }) {
        const api = requestAPIList['92']['9202'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..分配部门
    // ....
    static addManagerDepartment({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['14']['1405'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            managerId: postDataFromFE.managerId
        });

        const postData = {
            accountId,
            parkId,
            departmentId: postDataFromFE.departmentId,
            job: postDataFromFE.jobId
        };

        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..设为园区经理
    // ....
    static setAsParkManager({ accountId, parkId, managerId }) {
        const api = requestAPIList['14']['1406'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            managerId
        });

        const postData = {
            accountId,
            parkId
        };

        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..移出部门
    // ....
    static removeManagerDepartment({ accountId, parkId, id }) {
        const api = requestAPIList['14']['1407'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });

        const postData = {
            accountId,
            parkId
        };

        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..编辑管理员
    // ....
    static editManager({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['14']['1404'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.managerId,
            operation: 1
        });

        const postData = {
            accountId,
            parkId,
            realName: postDataFromFE.managerName,
            cellphone: postDataFromFE.managerCellphone
        };

        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..重置密码
    // ....
    static resetPassword({ accountId, parkId, managerId }) {
        const api = requestAPIList['14']['1404'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: managerId,
            operation: 4
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..冻结管理员
    // ....
    static lockManager({ accountId, parkId, managerId }) {
        const api = requestAPIList['14']['1404'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: managerId,
            operation: 2
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..管理员解冻
    // ....
    static unlockManager({ accountId, parkId, managerId }) {
        const api = requestAPIList['14']['1404'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: managerId,
            operation: 3
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }
}

module.exports = ManagerModel;