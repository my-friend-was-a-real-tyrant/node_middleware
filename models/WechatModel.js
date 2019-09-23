const NewRequestParams = require('./common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class WechatModel {
    static getAccessToken(appid, appSecret) {
        const httpRequestParams = new NewRequestParams({
            baseUrl: 'https://api.weixin.qq.com',
            port: '',
            path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appSecret,
            method: 'get'
        });
        return (request(httpRequestParams));
    }

    static getJsapiTicket(accessToken) {
        const httpRequestParams = new NewRequestParams({
            baseUrl: 'https://api.weixin.qq.com',
            port: '',
            path: '/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi',
            method: 'get'
        });
        return (request(httpRequestParams));
    }
}

module.exports = WechatModel;