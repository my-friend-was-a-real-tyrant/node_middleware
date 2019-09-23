const wechatModel = require('../models/WechatModel');
const baseController = require('./common/ResDataFormat');

const { appid, appSecret } = require('../config');

const crypto = require('crypto');

class WechatController {
    /**
     * @api {GET} /api/wechat/getJsConfigOptions 微信获取jsconfig配置项
     * @apiName get js config options
     * @apiGroup WECHAT
     * @apiVersion 1.4.1
     * @apiDescription 微信获取jsconfig配置项
     * 
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {string} appid 公众号appid
     * @apiSuccess (Reponse 200) {string} timestamp 当前时间戳
     * @apiSuccess (Reponse 200) {string} noncestr 随机字符串
     * @apiSuccess (Reponse 200) {string} signature 生成的签名
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "appid": "xxxxx",
     *     "timestamp": 1500000000,
     *     "noncestr": "xxxx",
     *     "signature": "xxxx"
     *   }
     *
     */
    static async getJsConfigOptions(ctx) {
        const url = ctx.request.header.referer;
        let returnData = baseController.getSuccess();

        try {
            const { access_token: accessToken } = await wechatModel.getAccessToken(appid, appSecret);
            const { ticket: jsapi_ticket } = await wechatModel.getJsapiTicket(accessToken);
            // 生成随机字符串与时间戳
            const noncestr = 'Wm3WZYTPz0wzccnW';
            const d = new Date();
            const timestamp = (Math.round(d.getTime() / 1000));
            // 将jsapiTicket, 随机字符串, 时间戳, url按照顺序使用（key1=value1&key2=value2）方式进行排序
            // 将生成的字符串以sha1方式加密获取签名
            const sha1 = crypto.createHash('sha1');
            const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
            sha1.update(str);
            const signature = sha1.digest('hex');
            returnData.appid = appid;
            returnData.timestamp = timestamp;
            returnData.noncestr = noncestr;
            returnData.signature = signature;
        } catch(error) {
            returnData = baseController.getFail('E0002', 'error');
        }
        ctx.body = returnData;
    }
}

module.exports = WechatController;