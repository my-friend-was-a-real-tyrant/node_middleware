const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class ReportModel {
    // ....
    // ..园区报事
    // ....
    static submitReport({ userId, postDataFromFE }) {
        const api = requestAPIList['65']['6501'];
        const { parkId, roomId, type, title, content, imgList, name, cellphone } = postDataFromFE;
        const postData = {
            userId,
            type,
            parkId,
            roomId,
            subject: title,
            content,
            pictures: imgList,
            contactPerson: name,
            contactCellphone: cellphone
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }
}

module.exports = ReportModel;