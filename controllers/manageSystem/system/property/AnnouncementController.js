const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class AnnouncementController {
    /**
     * @api {GET} /api/manageSystem/system/property/announcement/getAnnouncementList 获取公告列表
     * @apiName get announcement list
     * @apiGroup ManageSystem System Property Announcement
     * @apiVersion 1.0.0
     * @apiDescription 获取公告列表
     * 
     * @apiParam {int} pageNo 页码
     * @apiParam {int} pageSize 每页尺寸
     * @apiParam {string} keywords 关键字
     * @apiParam {number} startDate 开始日期(13位时间戳)
     * @apiParam {number} endDate 截止日期（13位时间戳）
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/activity/getActivityList
     *   {
     *     "pageNo": 1,
     *     "pageSize": 10,
     *     "keywords": "",
     *     "startDate": 1500000000000,
     *     "endDate": 1500000000000
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} activityList 活动列表
     * @apiSuccess (list) {int} id ID
     * @apiSuccess (list) {string} title 标题
     * @apiSuccess (list) {string} contact 发布人
     * @apiSuccess (list) {string} cellphone 联系方式
     * @apiSuccess (list) {string} releaseDatetime 发布时间
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "activityList": [{
     *         "id": 1,
     *         "title": "我要表扬谁",
     *         "contact": "徐凌",
     *         "cellphone": "13333333333",
     *         "releaseDatetime": "2017-02-02 12:12"
     *     }]
     *   }
     * 
     *
     */
    static async getAnnouncementList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate']
            },
            method: manageSystemModel.systemModel.propertyModel.announcementModel.getAnnouncementList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const announcementList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        title: responseData.returnData.data.list[i].subject,
                        contact: responseData.returnData.data.list[i].contactPerson,
                        cellphone: responseData.returnData.data.list[i].contactCellphone,
                        releaseDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'minute')
                    };
                    announcementList.push(temp);
                }
                returnData.announcementList = announcementList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/announcement/getAnnouncementInfo 获取公告详情
     * @apiName get announcement info
     * @apiGroup ManageSystem System Property Announcement
     * @apiVersion 1.0.0
     * @apiDescription 获取公告详情
     * 
     * @apiParam {int} id 公告ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/announcement/getAnnouncementInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} announcementInfo 报修详情
     * @apiSuccess (info) {string} issuer 发布人
     * @apiSuccess (info) {string} announcementNumber 编号
     * @apiSuccess (info) {string} contact 联系人
     * @apiSuccess (info) {string} cellphone 联系方式
     * @apiSuccess (info) {list} imgList 活动图片
     * @apiSuccess (info) {list} imgListNoHostname 活动图片(无主机地址)
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "announcementInfo": {
     *         "issuer": "徐凌",
     *         "announcementNumber": "123192307491321340",
     *         "contact": "徐凌",
     *         "cellphone": "13333333333",
     *         "imgList": []
     *     }
     *   }
     * 
     *
     */
    static async getAnnouncementInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.announcementModel.getAnnouncementInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                const temp = {
                    issuer: responseData.returnData.data.postedPerson,
                    announcementNumber: responseData.returnData.data.serial,
                    releaseDate: dateTransition(responseData.returnData.data.createDatetime),
                    contact: responseData.returnData.data.contactPerson,
                    cellphone: responseData.returnData.data.contactCellphone,
                    title: responseData.returnData.data.subject,
                    content: responseData.returnData.data.content,
                    imgListNoHostname: responseData.returnData.data.pictures,
                    // imgListNoHostname: [],
                    imgList: []
                };
                for (let i = 0; i < responseData.returnData.data.pictures.length; i ++) {
                    temp.imgList.push(serverHostname + responseData.returnData.data.pictures[i]);
                }
                returnData.announcementInfo = temp;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/manageSystem/system/property/announcement/addAnnouncement 添加公告
     * @apiName add announcement
     * @apiGroup ManageSystem System Property Announcement
     * @apiVersion 1.0.0
     * @apiDescription 添加公告
     * 
     * @apiParam {string} contact 联系人
     * @apiParam {string} cellphone 联系方式
     * @apiParam {string} title 活动标题
     * @apiParam {string} content 活动内容
     * @apiParam {array} imgList 活动图片
     *
     * @apiParamExample {json} Request Example
     *   POST /api/manageSystem/system/property/announcement/addAnnouncement
     *   {
     *     "contact": "徐凌",
     *     "cellphone": "13333333333",
     *     "title": "这是一个标题",
     *     "content": "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
     *     "imgList": ["/1/1/1.jpg", "/2/2/2.jpg"] 
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async addAnnouncement(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['contact', 'cellphone', 'title', 'content', 'imgList']
            },
            method: manageSystemModel.systemModel.propertyModel.announcementModel.addAnnouncement,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/announcement/editAnnouncement 编辑公告
     * @apiName edit announcement
     * @apiGroup ManageSystem System Property Announcement
     * @apiVersion 1.0.0
     * @apiDescription 编辑公告
     * 
     * @apiParam {int} id 公告ID
     * @apiParam {string} contact 联系人
     * @apiParam {string} cellphone 联系方式
     * @apiParam {string} title 活动标题
     * @apiParam {string} content 活动内容
     * @apiParam {array} imgList 活动图片
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/announcement/editAnnouncement
     *   {
     *     "id": 1,
     *     "contact": "徐凌",
     *     "cellphone": "13333333333",
     *     "title": "这是一个标题",
     *     "content": "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
     *     "imgList": ["/1/1/1.jpg", "/2/2/2.jpg"] 
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async editAnnouncement(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'contact', 'cellphone', 'title', 'content', 'imgList']
            },
            method: manageSystemModel.systemModel.propertyModel.announcementModel.editAnnouncement,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {DELETE} /api/manageSystem/system/property/announcement/deleteAnnouncement 删除公告
     * @apiName delete announcement
     * @apiGroup ManageSystem System Property Announcement
     * @apiVersion 1.0.0
     * @apiDescription 删除公告
     * 
     * @apiParam {int} id 公告ID
     *
     * @apiParamExample {json} Request Example
     *   DELETE /api/manageSystem/system/property/announcement/deleteAnnouncement
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async deleteAnnouncement(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.announcementModel.deleteAnnouncement,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            }
        });
        ctx.body = returnData;
    }
}

module.exports = AnnouncementController;