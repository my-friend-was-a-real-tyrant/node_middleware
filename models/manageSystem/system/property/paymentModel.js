const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class paymentModel {
    // 物业费缴费记录
    static getPropertyList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2401'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize,
            keyword: postDataFromFE.keywords,
        }
        return request(httpRequestParams);
    }

    // 水费缴费记录
    static getWaterList({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2402'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            pageNumber: postDataFromFE.pageNumber,
            id: postDataFromFE.id,
            pageSize: postDataFromFE.pageSize,
            keyword: postDataFromFE.keywords,
            pageSize: postDataFromFE.pageSize
        }
        return request(httpRequestParams);
    }

    // 物业费明细
    static propertyDetail({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2405'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            roomId: postDataFromFE.roomId,
            pageNumber: postDataFromFE.pageNumber,
            pageSize: postDataFromFE.pageSize,
            start: postDataFromFE.start,
            end: postDataFromFE.end,
        }
        console.log(httpRequestParams)
        return request(httpRequestParams);
    }

    // 水费明细
    static waterDetail({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2406'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            roomId: postDataFromFE.roomId,
            pageNumber: postDataFromFE.pageNumber,
            pageSize: postDataFromFE.pageSize,
            start: postDataFromFE.start,
            end: postDataFromFE.end,
        }
        return request(httpRequestParams);
    }

    // 物业费编辑
    static propertyDetailEdit({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2407'];
        const httpRequestParams = new NewRequestParams(api);
        console.log(1)
        httpRequestParams.myParams = {
            accountId,
            parkId,
            costType: postDataFromFE.costType,
            cost: postDataFromFE.cost,
            id: postDataFromFE.id,
        }
        console.log(httpRequestParams)
        return request(httpRequestParams);
    }

    // 水费编辑
    static waterDetailEdit({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2408'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            id: postDataFromFE.id,
            waterCost: postDataFromFE.waterCost,
            electricityCost: postDataFromFE.electricityCost,
            airCost: postDataFromFE.airCost,
        }
        return request(httpRequestParams);
    }

    // 水费预存金额编辑
    static waterMoneyEdit({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2409'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            id: postDataFromFE.id,
        }
        return request(httpRequestParams);
    }

    // ..导入物业费列表
    static importPropertyList({ accountId, parkId, filePath }) {
        const api = requestAPIList['24']['2411'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            filePath,
            parkId
        };

        return request(httpRequestParams);
    }

    // ..导入物业费列表
    static importWaterList({ accountId, parkId, filePath }) {
        const api = requestAPIList['24']['2412'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            filePath,
            parkId
        };

        return request(httpRequestParams);
    }
    
    // 支付规则初始化
    static payRuleinit({ accountId, parkId }) {
        const api = requestAPIList['24']['2403'];
        console.log(api)
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
        }
        return request(httpRequestParams);
    }

    // 支付规则保存
    static payRulesave({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2404'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            id: postDataFromFE.id,
            payType: postDataFromFE.payType,
        }
        return request(httpRequestParams);
    }

    // 下载模板
    static downTemplate({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2413'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            templateId: postDataFromFE.templateId
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
        }
        return request(httpRequestParams);
    }

    // 物业费导出全部
    static downPropertyAll({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2414'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            year: postDataFromFE.year
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
        }
        return request(httpRequestParams);
    }

    // 水费导出全部
    static downWaterAll({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2415'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            year: postDataFromFE.year
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
        }
        return request(httpRequestParams);
    }

    // 物业费导出单条
    static downPropertySin({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2416'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            year: postDataFromFE.year
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            roomId: postDataFromFE.roomId
        }
        console.log('httpRequestParams: ', httpRequestParams)
        return request(httpRequestParams);
    }

    // 水费导出单条
    static downWaterSin({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2417'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            year: postDataFromFE.year
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            roomId: postDataFromFE.roomId
        }
        return request(httpRequestParams);
    }

    // 水费预存金额
    static waterLeft({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2418'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            roomId: postDataFromFE.roomId,
        }
        return request(httpRequestParams);
    }
    
    // 水费预存金额编辑
    static waterLeftEdit({ accountId, parkId, postDataFromFE }) {
        const api = requestAPIList['24']['2419'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId,
            roomId: postDataFromFE.roomId,
            id: postDataFromFE.id,
            preStorage: postDataFromFE.preStorage,
        }
        console.log(httpRequestParams)
        return request(httpRequestParams);
    }
    
}

module.exports = paymentModel;