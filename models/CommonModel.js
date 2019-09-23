const requestAPIList = require('./common/requestAPIList');
const NewRequestParams = require('./common/NewRequestParams');
const qs = require('querystring');
const request = require('request-promise');
const axios = require('axios');

class CommonModel {
    static uploadFile2() {
        const api = requestAPIList['18']['1801'];
        const httpRequestParams = new NewRequestParams(api);
        return (request(httpRequestParams));
    }

    static uploadFile({ files, uploadType, uploadFileType }) {
        console.log(111);
        const api = requestAPIList['19']['1901'];
        const httpRequestParams = new NewRequestParams(api);
        const postData = {
            file: files,
            uploadType: uploadType,
            fileSuffixType: uploadFileType
        };
        httpRequestParams.formData = postData;
        httpRequestParams.headers = {
            'Content-Type': 'multipart/form-data'
        };
        delete httpRequestParams.body;
        delete httpRequestParams.json;
        // console.log(httpRequestParams);
        // return (request(httpRequestParams));
        const axiosHttpRequestParams = {
            url: httpRequestParams.uri,
            baseURL: httpRequestParams.baseUrl,
            headers: httpRequestParams.headers,
            data: httpRequestParams.formData,
            method: 'post'
        };
        console.log(axiosHttpRequestParams);
        return axios(axiosHttpRequestParams);

        // const api = requestAPIList['19']['1901'];
        // const httpRequestParams = new NewRequestParams(api);
        // httpRequestParams.body = {
        //     // file: files,
        //     // uploadType: uploadType,
        //     fileSuffixType: uploadFileType
        // };
        // httpRequestParams.headers = {
        //     'Content-Type': 'multipart/form-data'
        // };
        // console.log(httpRequestParams);
        // try {
        //     const p = request(httpRequestParams);
        //     console.log(123);
        //     return p;
        // } catch(e) {
        //     console.log(e);
        // } finally {
        //     console.log('commonModel finally');
        // }

        // return request(httpRequestParams);
        // return new Promise((resolve) => { resolve({ code: 10000, returnData: { subCode: 10000}})})
    }

    static requestOpenid({ code, appid, appSecret }) {
        const httpRequestParams = new NewRequestParams({
            baseUrl: 'https://api.weixin.qq.com',
            port: '',
            path: '/sns/oauth2/access_token?appid=' + appid + '&secret=' + appSecret + '&code=' + code + '&grant_type=authorization_code'
        });

        return (request(httpRequestParams));
    }

    static requestUserInfo({ access_token, openid }) {
        const httpRequestParams = new NewRequestParams({
            baseUrl: 'https://api.weixin.qq.com',
            port: '80',
            path: '/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN'
        });

        return (request(httpRequestParams));
    }

    static openidCheck(openId) {
        const api = requestAPIList['15']['1501'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            openId
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..获取收货地址列表
    // ....
    static getMyDeliveryAddress({ userId }) {
        const api = requestAPIList['31']['3102'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..设置常用地址
    // ....
    static setFrequentlyAddress({ userId, addressId }) {
        const api = requestAPIList['31']['3106'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: addressId
        });
        httpRequestParams.myParams = {
            userId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取省列表
    // ....
    static getProvinceList() {
        const api = requestAPIList['11']['1101'];
        const httpRequestParams = new NewRequestParams(api);

        return (request(httpRequestParams));
    }

    // ....
    // ..获取市列表
    // ....
    static getCityList({ provinceId }) {
        const api = requestAPIList['11']['1102'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: provinceId
        });

        return (request(httpRequestParams));
    }

    // ....
    // ..获取区列表
    // ....
    static getDistrictList({ cityId }) {
        const api = requestAPIList['11']['1103'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: cityId
        });

        return (request(httpRequestParams));
    }

    // ....
    // ..添加收货地址
    // ....
    static addDeliveryAddress({ userId, postDataFromFE }) {
        const api = requestAPIList['31']['3101'];
        const { name, cellphone, districtId, address, isFrequent } = postDataFromFE;
        const postData = {
            userId,
            name,
            cellphone,
            districtId,
            address,
            isDefault: isFrequent
        };

        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..获取收货地址详情
    // ....
    static getDeliveryAddressInfo({ userId, addressId }) {
        const api = requestAPIList['31']['3103'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: addressId
        });
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..编辑收货地址
    // ....
    static editDeliveryAddress({ userId, postDataFromFE }) {
        const api = requestAPIList['31']['3104'];
        const { addressId, name, cellphone, districtId, address } = postDataFromFE;
        const postData = {
            userId,
            name,
            cellphone,
            districtId,
            address
        };

        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: addressId
        });
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    // ....
    // ..删除收货地址
    // ....
    static delDeliveryAddress({ userId, addressId }) {
        const api = requestAPIList['31']['3105'];

        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            id: addressId
        });
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }

    // ....
    // ..用户登录记录日志
    // ....
    static userLoginLog(userId) {
        const api = requestAPIList['16']['1614'];

        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            userId
        };

        return (request(httpRequestParams));
    }
}

module.exports = CommonModel;