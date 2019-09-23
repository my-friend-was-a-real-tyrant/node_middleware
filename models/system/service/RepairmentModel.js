const requestAPIList = require('../../common/requestAPIList');
const NewRequestParams = require('../../common/NewRequestParams');
const request = require('request-promise');
const qs = require('querystring');

class RepairmentModel {
    // ....
    // ..居家报修
    // ....
    static personalRepair({ userId, postDataFromFE }) {
        const api = requestAPIList['25']['2501'];
        const { parkId, roomId, repairmentContent, repairmentImgUrl, bestTime, name, cellphone } = postDataFromFE;
        const postData = {
            userId,
            repairType: 1,
            parkId,
            roomId,
            region: postDataFromFE.repairmentArea,
            description: repairmentContent,
            pictures: repairmentImgUrl,
            contactPerson: name,
            contactCellphone: cellphone,
            bestTimeDescribe: bestTime
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }

    // ....
    // ..公共报修
    // ....
    static commonRepair({ userId, postDataFromFE }) {
        const api = requestAPIList['25']['2501'];
        const { parkId, roomId, repairmentArea, repairmentContent, repairmentImgUrl, name, cellphone } = postDataFromFE;
        const postData = {
            userId,
            repairType: 2,
            parkId,
            roomId,
            region: repairmentArea,
            description: repairmentContent,
            pictures: repairmentImgUrl,
            contactPerson: name,
            contactCellphone: cellphone
        };
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = postData;

        return request(httpRequestParams);
    }
}

module.exports = RepairmentModel;