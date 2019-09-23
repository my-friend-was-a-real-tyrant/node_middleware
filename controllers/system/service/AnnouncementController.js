// 表扬投诉模块
const url = require('url');
const baseController = require('../../common/ResDataFormat');
const exception = require('../../common/requestModule');
const { serverHostname } = require('../../common/constant');
const dateTransition = require('../../common/dateTransition');
const systemModel = require('../../../models/SystemModel');

class AnnouncementController {
    /**
     * @api {GET} /api/system/service/announcement/getAnnouncementList 获取公告列表
     * @apiName get announcement list
     * @apiGroup System Service Announcement
     * @apiVersion 1.4.1
     * @apiDescription 获取园区公告列表
     * 
     * @apiParam {int} parkId 园区ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/complaint/getAnnouncementList
     *   {
     *     "parkId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} announcementList 公告列表
     * @apiSuccess (list) {int} id 活动ID
     * @apiSuccess (list) {string} img 活动图片地址
     * @apiSuccess (list) {string} title 题目
     * @apiSuccess (list) {string} date 日期
     * @apiSuccess (list) {string} content 内容（缩略版）
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "announcementList": [{
     *         "id": 1,
     *         "content": "哈哈哈",
     *         "title": "今天我要表扬谁",
     *         "img": "/img/haha/abc.jpg",
     *         "date": "2017-02-02"
     *     }]
     *   }
     * 
     *
     */
    static async getAnnouncementList(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'parkId'
            },
            method: systemModel.serviceModel.announcementModel.getAnnouncementList,
            params: {
                userId,
                parkId: params.parkId
            },
            success(responseData) {
                returnData.announcementList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data[i].id,
                        title: responseData.returnData.data[i].subject,
                        content: responseData.returnData.data[i].content.length > 35
                            ? responseData.returnData.data[i].content.slice(0, 35).concat('...')
                            : responseData.returnData.data[i].content,
                        img: responseData.returnData.data[i].pictures.length > 0 
                            ? (serverHostname + responseData.returnData.data[i].pictures[0])
                            : '',
                        date: dateTransition(responseData.returnData.data[i].createDatetime)
                    };
                    returnData.announcementList.push(temp);
                }
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/system/service/announcement/getAnnouncementInfo 获取公告详情
     * @apiName get announcement info
     * @apiGroup System Service Announcement
     * @apiVersion 1.4.1
     * @apiDescription 获取园区公告详情
     * 
     * @apiParam {int} announcementId 公告ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/system/service/announcement/getAnnouncementInfo
     *   {
     *     "announcementId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} announcementInfo 公告详情
     * @apiSuccess (info) {string} img 活动图片地址
     * @apiSuccess (info) {string} title 题目
     * @apiSuccess (info) {string} createDatetime 发布时间
     * @apiSuccess (info) {string} content 内容
     * @apiSuccess (info) {string} contact 联系人
     * @apiSuccess (info) {string} cellphone 联系方式
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "activityInfo": {
     *         "content": "哈哈哈",
     *         "title": "今天我要表扬谁",
     *         "createDatetime": "2017-12-12", 
     *         "img": "/img/haha/abc.jpg",
     *         "contact": "徐凌",
     *         "cellphone": "13333333333"
     *     }
     *   }
     * 
     *
     */
    static async getAnnouncementInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { userId } = ctx.session.user;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'announcementId'
            },
            method: systemModel.serviceModel.announcementModel.getAnnouncementInfo,
            params: {
                userId,
                announcementId: params.announcementId
            },
            success(responseData) {
                const temp = {
                    title: responseData.returnData.data.subject,
                    createDatetime: dateTransition(responseData.returnData.data.createDatetime),
                    content: responseData.returnData.data.content,
                    img: [],
                    contact: responseData.returnData.data.contactPerson,
                    cellphone: responseData.returnData.data.contactCellphone
                };
                for (let i = 0; i < responseData.returnData.data.pictures.length; i ++) {
                    temp.img.push(serverHostname + responseData.returnData.data.pictures[i]);
                }
                returnData.announcementInfo = temp;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = AnnouncementController;