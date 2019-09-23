const requestAPIList = require('../../../../common/requestAPIList');
const NewRequestParams = require('../../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../../controllers/common/dateTransition');
const qs = require('querystring');

class GroupPurchaseModel {
    // ....
    // ..创建团购
    // ....
    static createGroupPurchase({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3421'];
        const postData = {
            accountId,
            parkId,
            startDatetime: dateTransition(postDataFromFE.startDatetime, 'datetime'),
            endDatetime: dateTransition(postDataFromFE.endDatetime, 'datetime'),
            maxCount: postDataFromFE.maxCount,
            groupPrice: postDataFromFE.price
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            merchandiseId: postDataFromFE.id
        });
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..编辑团购
    // ....
    static editGroupPurchase({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3424'];
        const postData = {
            accountId,
            parkId,
            startDatetime: dateTransition(postDataFromFE.startDatetime, 'datetime'),
            endDatetime: dateTransition(postDataFromFE.endDatetime, 'datetime'),
            maxCount: postDataFromFE.maxCount,
            groupPrice: postDataFromFE.price
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            groupId: postDataFromFE.groupPurchaseId
        });
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }
    
    
    // ....
    // ..获取统计
    // ....
    static getUserCount({ accountId, parkId }) {
        const api = requestAPIList['34']['3431'];
        const postData = {
            accountId,
            parkId
        };
        const httpRequestParams = new NewRequestParams(api);        
        httpRequestParams.myParams = postData;
        return (request(httpRequestParams));
    }
    
    
    // ....
    // ..设置拼团
    // ....
    static setTogetherInfo({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3425'];
        const postData = {
            accountId,
            parkId,
            lumpCount: postDataFromFE.lumpCount,
            validTime: postDataFromFE.validTime,
            spellPrice: postDataFromFE.spellPrice,
            //merchandiseId:postDataFromFE.merchandiseId
        };
        const httpRequestParams = new NewRequestParams(api);
        
         httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
             merchandiseId: postDataFromFE.merchandiseId
         });
        httpRequestParams.myParams = postData;
        console.log( postData );
        return (request(httpRequestParams));
        
        
        
        
        
        
    }
    
    
    // ....
    // ..取消拼团
    // ....
    static cancelGroup({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3432'];
        const postData = {
            accountId,
            parkId
            //operationType: postDataFromFE.merchandiseId
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            merchandiseId: postDataFromFE.merchandiseId
        });
        httpRequestParams.myParams = postData;
        
        return (request(httpRequestParams));
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     // ....
    // ..单买分页列表
    // ....
    static getAloneInfo({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3426'];
        const postData = {
            accountId,
            parkId,
            merchandiseId: postDataFromFE.merchandiseId,
            status: postDataFromFE.status,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
//        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
//            groupId: postDataFromFE.groupPurchaseId
//        });
        httpRequestParams.myParams = postData;
        
        return (request(httpRequestParams));
    }
    
    // ....
    // ..拼团分页列表
    // ....
    static getTogetherInfo({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3427'];
        const postData = {
            accountId,
            parkId,
            merchandiseId: postDataFromFE.merchandiseId,
            status: postDataFromFE.status,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
//        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
//            groupId: postDataFromFE.groupPurchaseId
//        });
        httpRequestParams.myParams = postData;
        
        return (request(httpRequestParams));
    }
    
    
    
    // ....
    // ..拼团详情
    // ....
    static getTogetherDetails({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3428'];
        const postData = {
            accountId,
            parkId,
            groupId: postDataFromFE.groupId
        };
        const httpRequestParams = new NewRequestParams(api);
//        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
//            groupId: postDataFromFE.groupPurchaseId
//        });
        httpRequestParams.myParams = postData;
        
        return (request(httpRequestParams));
    }
    
    // ....
    // ..强制成团
    // ....
    static forceGroup({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3429'];
        const postData = {
            accountId,
            parkId,
            groupId: postDataFromFE.groupId
        };
        const httpRequestParams = new NewRequestParams(api);

        httpRequestParams.myParams = postData;
        
        return (request(httpRequestParams));
    }
    
    // ....
    // ..上下架商品
    // ....
    static goodsUpDown({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3430'];
        const postData = {
            accountId,
            parkId,
            operationType: postDataFromFE.operationType
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            merchandiseId: postDataFromFE.merchandiseId
        });
        httpRequestParams.myParams = postData;
        
        return (request(httpRequestParams));
    }
    
    

    // ....
    // ..获取商品团购列表
    // ....
    static getMerchandiseGroupPurchaseHistory({ accountId, parkId, id }) {
        const api = requestAPIList['34']['3422'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            merchandiseId: id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取导出订单excel地址
    // ....
    static exportOrder({ accountId, parkId, id }) {
        const api = requestAPIList['36']['3611'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            groupId: id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取导出订单excel地址
    // ....
    static exportSingleOrder({ accountId, parkId, id }) {
        const api = requestAPIList['36']['3613'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            singleId: id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }



}

module.exports = GroupPurchaseModel;