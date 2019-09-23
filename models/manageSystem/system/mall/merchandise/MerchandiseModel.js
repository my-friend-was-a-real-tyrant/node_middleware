const requestAPIList = require('../../../../common/requestAPIList');
const NewRequestParams = require('../../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../../controllers/common/dateTransition');
const qs = require('querystring');

class MerchandiseModel {
    // ....
    // ..获取商品列表
    // ....
    static getMerchandiseList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3402'];
        const params = {
            accountId,
            parkId,
            keywords: postDataFromFE.keywords,
            status: postDataFromFE.status,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return request(httpRequestParams);
    }

    // ....
    // ..获取商品详情
    // ....
    static getMerchandiseInfo({ accountId, parkId, id }) {
        const api = requestAPIList['34']['3403'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id
        });
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..编辑商品
    // ....
    static editMerchandise({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3404'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: postDataFromFE.id
        });

        const postData = {
            accountId,
            parkId,
            name: postDataFromFE.name,
            details: postDataFromFE.detailImg,
            description: postDataFromFE.description,
            price: postDataFromFE.price,
            content: postDataFromFE.content,
            pictures: postDataFromFE.imgList,
            specialPrice:postDataFromFE.specialPrice,
            maxQuantity:postDataFromFE.maxQuantity
        };

        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..添加商品
    // ....
    static addMerchandise({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['34']['3401'];
        const httpRequestParams = new NewRequestParams(api);

        const postData = {
            accountId,
            parkId,
            name: postDataFromFE.name,
            details: postDataFromFE.detailImg,
            description: postDataFromFE.description,
            price: postDataFromFE.price,
            content: postDataFromFE.content,
            pictures: postDataFromFE.imgList,
            specialPrice:postDataFromFE.specialPrice,
            maxQuantity:postDataFromFE.maxQuantity
        };

        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..获取类别列表
    // ....
    static getTypeList({ accountId }) {
        const api = requestAPIList['34']['3411'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            accountId
        });

        return request(httpRequestParams);
    }
}

module.exports = MerchandiseModel;