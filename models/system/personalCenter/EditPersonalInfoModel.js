const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class EditPersonalInfoModel {
    // ....
    // ..编辑个人信息
    // ....
    static editPersonalInfo({ userId, parkId, postDataFromFE }) {
        const api = requestAPIList['15']['1506'];
        const postData = {
            userId,
            parkId,
            sex: postDataFromFE.sex,
            birthday: postDataFromFE.birthday,
            avatar: postDataFromFE.avatar
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData

        return request(httpRequestParams);
    }

    // ....
    // ..改变手机号
    // ....
    static changeCellphone({ userId, parkId, postDataFromFE }) {
        const api = requestAPIList['15']['1506'];
        const postData = {
            userId,
            parkId,
            cellphone: postDataFromFE.cellphone,
            authcode: postDataFromFE.smsCode
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData

        return request(httpRequestParams);
    }
}

module.exports = EditPersonalInfoModel;