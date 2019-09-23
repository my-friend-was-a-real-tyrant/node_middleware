const requestAPIList = require('../common/requestAPIList');
const NewRequestParams = require('../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class LoginModel {
    // ....
    // ..获取背景图片
    // ....
    static getBackgroundImg() {
        const api = {
            baseUrl: 'http://www.bing.com',
            port: '80',
            path: '/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN'
        };
        const httpRequestParams = new NewRequestParams(api);

        return request(httpRequestParams);
    }

    // ....
    // ..获取园区列表
    // ....
    static getParkList() {
        const api = requestAPIList['21']['2101'];
        const httpRequestParams = new NewRequestParams(api);

        return (request(httpRequestParams));
    }

    static login({ userName, password }) {
        const api = requestAPIList['13']['1301'];
        const postData = {
            cellphone: userName,
            password
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return (request(httpRequestParams));
    }

    static choosePark({ accountId, parkId }) {
        const api = requestAPIList['13']['1321'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            parkId
        };

        return (request(httpRequestParams));
    }
    

    static putTest(userName, password) {
        // const option = new NewRequestParams();
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve({
        //             code: 10000,
        //             message: 'success',
        //             returnData: {
        //                 subCode: 10000,
        //                 subMessage: 'success'
        //             }
        //         });
        //     }, 1000);
        // });
        // const ip = 1;
        // const openid = 2;
        // const httpRequestParams = new RequestParams();
        // const postData = qs.stringify({
        //     ip,
        //     openId: openid
        // });
        // httpRequestParams.hostname = '192.168.1.9';
        // httpRequestParams.port = '8080';
        // httpRequestParams.path = '/api/publicWeChatPay';
        // httpRequestParams.method = 'POST';
        // httpRequestParams.headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Content-Length': Buffer.byteLength(postData)
        // }

        // const p = requestMethod.request(httpRequestParams, postData);
        // return p;
    }
}

module.exports = LoginModel;