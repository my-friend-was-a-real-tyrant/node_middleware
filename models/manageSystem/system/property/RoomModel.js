const requestAPIList = require('../../../common/requestAPIList');
const NewRequestParams = require('../../../common/NewRequestParams');
const request = require('request-promise');
const dateTransition = require('../../../../controllers/common/dateTransition');
const qs = require('querystring');

class RoomModel {
    // ....
    // ..导入房屋
    // ....
    static importRoomList({ accountId, parkId, filePath }) {
        const api = requestAPIList['22']['2211'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.myParams = {
            accountId,
            filePath,
            parkId
        };

        return request(httpRequestParams);
    }

    // ....
    // ..获取房屋列表
    // ....
    static getRoomList({ parkId, postDataFromFE }) {
        const api = requestAPIList['22']['2212'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            parkId
        });
        console.log(httpRequestParams.uri)
        httpRequestParams.myParams = {
            keywords: postDataFromFE.keywords,
            pageNumber: postDataFromFE.pageNo,
            pageSize: postDataFromFE.pageSize
        }
        console.log(httpRequestParams)
        return request(httpRequestParams);
    }

    // ....
    // ..编辑户主信息
    // ....
    static editHostInfo({ accountId, parkId, roomId, cellphone, name }) {
        const api = requestAPIList['22']['2214'];
        const httpRequestParams = new NewRequestParams(api);
        httpRequestParams.uri = String.prototype.format.call(httpRequestParams.uri, {
            roomId
        });
        httpRequestParams.myParams = {
            accountId,
            parkId,
            cellphone,
            proprietorName: name
        };

        return request(httpRequestParams);
    }
}

module.exports = RoomModel;