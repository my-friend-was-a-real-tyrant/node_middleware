const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class OrderModel {
    // ....
    // ..获取优惠券列表
    // ....
    static getOrderList({ accountId, postDataFromFE }) {
        const api = requestAPIList['36']['3601'];
        const params = {
            accountId,
            serialNumber: postDataFromFE.orderSerialNumber,
            receiverName: postDataFromFE.receiverName,
            receiverCellphone: postDataFromFE.receiverCellphone,
            purchaserName: postDataFromFE.purchaserName,
            purchaserCellphone: postDataFromFE.purchaserCellphone,
            earliestCreateDatetime: postDataFromFE.earliestPurchaseDatetime,
            latestCreateDatetime: postDataFromFE.latestPurchaseDatetime,
            orderRule: postDataFromFE.sortRule,
            status: postDataFromFE.status,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = params;

        return (request(httpRequestParams));
    }

    // ....
    // ..导入订单
    // ....
    static importOrder({ accountId, filePath }) {
        const api = requestAPIList['36']['3612'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            path: filePath
        };

        return request(httpRequestParams);
    }

   


}

module.exports = OrderModel;