const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class DepartmentModel {
    // ....
    // ..获取日志列表
    // ....
    static getDepartmentList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['92']['9203'];
        const params = {
            accountId,
            parkId,
            keywords: postDataFromFE.keywords,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..添加部门
    // ....
    static addDepartment({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['92']['9201'];
        const params = {
            accountId,
            parkId,
            name: postDataFromFE.departmentName,
            description: postDataFromFE.description,
            permissions: postDataFromFE.permissions
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取权限列表
    // ....
    static getPermissionsList() {
        const api = requestAPIList['94']['9401'];
        const httpRequestParams = new NewRequestParams(api);

        return request(httpRequestParams);
    }

    // ....
    // ..删除部门
    // ....
    static deleteDepartment({ accountId, parkId, id }) {
        const api = requestAPIList['92']['9205'];
        const params = {
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取部门详情
    // ....
    static getDepartmentInfo({ accountId, parkId, id }) {
        const api = requestAPIList['92']['9204'];
        const params = {
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..编辑部门
    // ....
    static editDepartment({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['92']['9206'];
        const params = {
            accountId,
            parkId,
            name: postDataFromFE.departmentName,
            description: postDataFromFE.description,
            permissions: postDataFromFE.permissions
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }
}

module.exports = DepartmentModel;