const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class FrequentlyPhoneModel {
    // ....
    // ..获取报修列表
    // ....
    static getFrequentlyPhoneList({ accountId, parkId, keywords }) {
        const api = requestAPIList['68']['6802'];
        const params = {
            accountId, 
            parkId,
            keywords
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..添加组
    // ....
    static addFrequentlyPhoneGroup({ accountId, parkId, name }) {
        const api = requestAPIList['68']['6805'];
        const params = {
            accountId, 
            parkId,
            groupName: name
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;      

        return request(httpRequestParams);
    }

    // ....
    // ..删除组
    // ....
    static deleteFrequentlyPhoneGroup({ accountId, parkId, id }) {
        const api = requestAPIList['68']['6807'];
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
    // ..新增组中联系方式
    // ....
    static addFrequentlyPhoneContact({ accountId, parkId, id, contactList }) {
        const api = requestAPIList['68']['6808'];
        const params = {
            accountId, 
            parkId,
            contactGroupId: id,
            simpleContactList: JSON.stringify(contactList)
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;      

        return request(httpRequestParams);
    }

    // ....
    // ..编辑组名
    // ....
    static editFrequentlyPhoneGroup({ accountId, parkId, id, name }) {
        const api = requestAPIList['68']['6806'];
        const params = {
            accountId, 
            parkId,
            groupName: name
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = params;      

        return request(httpRequestParams);
    }

    // ....
    // ..批量编辑组中联系方式
    // ....
    static editFrequentlyPhoneContact({ accountId, parkId, id, contactList }) {
        const api = requestAPIList['68']['6809'];
        const params = {
            accountId, 
            parkId,
            contactGroupId: id,
            simpleContactList: JSON.stringify(contactList)
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;      

        return request(httpRequestParams);
    }

    // ....
    // ..批量删除组中联系方式
    // ....
    static deleteFrequentlyPhoneContact({ accountId, parkId, contactList }) {
        const api = requestAPIList['68']['6810'];
        const params = {
            accountId, 
            parkId,
            contactIdList: contactList
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;      

        return request(httpRequestParams);
    }

    // ....
    // ..获取报修分组详情
    // ....
    static getFrequentlyPhoneListInfo({ accountId, parkId, id }) {
        const api = requestAPIList['68']['6811'];
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
}

module.exports = FrequentlyPhoneModel;