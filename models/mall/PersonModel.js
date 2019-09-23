const requestAPIList = require('../common/requestAPIList');
const NewRequestParams = require('../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../controllers/common/dateTransition');
const qs = require('querystring');

class PersonModel {
    // ....
    // ..获取订单列表
    // ....
    static getOrderList({ userId, status, index }) {
        const api = requestAPIList['35']['3502'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            status,
            startIndex: index
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..获取订单详情
    // ....
    static getOrderInfo({ userId, id }) {
        const api = requestAPIList['35']['3503'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            orderId: id
        });
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..取消订单
    // ....
    static cancelOrder({ userId, id }) {
        const api = requestAPIList['35']['3504'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            orderId: id,
            operation: 1
        });
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..确认收货
    // ....
    static confirmReceipt({ userId, id }) {
        const api = requestAPIList['35']['3504'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            orderId: id,
            operation: 2
        });
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }
    
    // ....
    // ..创建拼团订单
    // ....
    static generateTogetherForm({ userId, postDataFromFE }) {
        const api = requestAPIList['35']['3505'];
        const httpRequestParams = new NewRequestParams(api);
        const { addressId,merchandiseId,groupId,quantity,couponId } = postDataFromFE;       
        
        httpRequestParams.myParams = {
            userId,
            addressId,
            merchandiseId,
            groupId,
            quantity,
            couponId
        };
        return (request(httpRequestParams));
    }
    
    
    // ....
    // ..创建单买订单
    // ....
    static generateSingleForm({ userId, postDataFromFE }) {
        const api = requestAPIList['35']['3506'];
        const httpRequestParams = new NewRequestParams(api);
        const { addressId,merchandiseId,quantity,couponId } = postDataFromFE; 
        httpRequestParams.myParams = {
            userId,
            addressId,
            merchandiseId,
            quantity,
            couponId
        };
        return (request(httpRequestParams));
    }
    
    
    
}

module.exports = PersonModel;