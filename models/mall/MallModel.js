const requestAPIList = require('../common/requestAPIList');
const NewRequestParams = require('../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../controllers/common/dateTransition');
const qs = require('querystring');

class MallModel {
    // ....
    // ..获取商品列表
    // ....
    static getMerchandiseList() {
        const api = requestAPIList['33']['3301'];
        const httpRequestParams = new NewRequestParams(api);
        return (request(httpRequestParams));
    }
    
    // ....
    // ..获取商品详情
    // ....
//    static getGoodsList({ id }) {
//        const api = requestAPIList['33']['3302'];  
//        const httpRequestParams = new NewRequestParams(api);        
//        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
//            merchandiseId:id
//        });        
//        console.log( httpRequestParams );
////        httpRequestParams.myParams = {
////            merchandiseId: id
////        }
//        return (request(httpRequestParams));
//
//
//    }

    static getGoodsList({ id }) {
        
        const api = requestAPIList['33']['3302'];  
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id:id
        });       

        return request(httpRequestParams);
        
    }
    
    




    // ....
    // ..团购商品详情
    // ....
    static getMerchandiseInfo({ id, groupId }) {
        const api = requestAPIList['33']['3303'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            groupId
        });
        httpRequestParams.myParams = {
            merchandiseId: id
        }

        return (request(httpRequestParams));
    }
    
    
    // ....
    // ..拼团商品详情
    // ....
    static getTogetherDetails({ id }) {
        const api = requestAPIList['33']['3304'];
        const httpRequestParams = new NewRequestParams(api);
        /*httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });*/
        httpRequestParams.myParams = {
            merchandiseId: id
        }
        return (request(httpRequestParams));
    }
    
    
    
    
    // ....
    // ..拼团列表
    // ....
    static getTogetherTable({ id }) {
        const api = requestAPIList['33']['3305'];
        const httpRequestParams = new NewRequestParams(api);
//        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
//            groupId
//        });
        httpRequestParams.myParams = {
            merchandiseId: id
        }
        return (request(httpRequestParams));
    }
    
    
    
    
    // ....
    // ..获取推荐商品详情
    // ....
    static getRecommendInfo() {
        const api = requestAPIList['33']['3306'];
        const httpRequestParams = new NewRequestParams(api);
//        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
//            groupId
//        });
        return (request(httpRequestParams));
    }
    
    
    

    // ....
    // ..获取可用优惠券列表
    // ....
    static getCouponList({ userId, price }) {
        const api = requestAPIList['37']['3704'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            amount: price
        }

        return request(httpRequestParams);
    }

    // ....
    // ..创建订单
    // ....
    static createOrder({ userId, postDataFromFE }) {
        const api = requestAPIList['35']['3501'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId,
            addressId: postDataFromFE.addressId,
            merchandiseId: postDataFromFE.merchandiseId,
            quantity: postDataFromFE.quantity,
            couponId: postDataFromFE.couponId
        };

        return request(httpRequestParams);
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

        return request(httpRequestParams);
    }

    // ....
    // ..支付订单
    // ....
    static payOrder({ userId, id, type }) {
        const api = requestAPIList['35']['3511'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            userId,
            type
        };

        return request(httpRequestParams);
    }

    // ....
    // ..一网通支付订单
    // ....
    static payOrderByCmb({ cellphone, id }) {
        const api = requestAPIList['35']['3512'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            userTag: cellphone,
        };
        return request(httpRequestParams);
    }

    // ....
    // ..创建缴费订单
    // ....
    static createBillOrder({ ids, id }) {
        const api = requestAPIList['24']['2422'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            roomId: id
        });
        httpRequestParams.myParams = {
            ids
        };
        return request(httpRequestParams);
    }

    // ....
    // ..支付缴费订单
    // ....
    static payBillOrder({ userId, id, type }) {
        const api = requestAPIList['24']['2423'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            userId,
            type
        };
        return request(httpRequestParams);
    }



}

module.exports = MallModel;