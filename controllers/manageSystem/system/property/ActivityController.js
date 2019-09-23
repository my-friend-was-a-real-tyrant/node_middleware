const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class ActivityController {
    /**
     * @api {GET} /api/manageSystem/system/property/activity/getActivityList 获取活动列表
     * @apiName get activity list
     * @apiGroup ManageSystem System Property Activity
     * @apiVersion 1.0.0
     * @apiDescription 获取活动列表
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
     * @apiSuccess (list) {string} enrollDate 报名起止日期
     * @apiSuccess (list) {string} activeDatetime 活动起止时间
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
     *         "enrollDate": "2017-02-02——2017-02-02",
     *         "activeDatetime": "2017-02-02 09:09——2017-02-02 09:09"
     *     }]
     *   }
     * 
     *
     */
    static async getActivityList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate']
            },
            method: manageSystemModel.systemModel.propertyModel.activityModel.getActivityList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const activityList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const enrollStartDate = dateTransition(responseData.returnData.data.list[i].createDatetime, 'minute');
                    const enrollEndDate = dateTransition(responseData.returnData.data.list[i].applyEndDatetime, 'minute');
                    const enrollDate = `${enrollStartDate}——${enrollEndDate}`;
                    const activeStartDatetime = dateTransition(responseData.returnData.data.list[i].beginDatetime, 'minute');
                    const activeEndDatetime = dateTransition(responseData.returnData.data.list[i].endDatetime, 'minute');
                    const activeDatetime = `${activeStartDatetime}——${activeEndDatetime}`;
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        title: responseData.returnData.data.list[i].title,
                        contact: responseData.returnData.data.list[i].linkMan,
                        cellphone: responseData.returnData.data.list[i].linkPhone,
                        enrollDate,
                        activeDatetime
                    };
                    activityList.push(temp);
                }
                returnData.activityList = activityList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/activity/getActivityInfo 获取活动详情
     * @apiName get activity info
     * @apiGroup ManageSystem System Property Activity
     * @apiVersion 1.0.0
     * @apiDescription 获取活动详情
     * 
     * @apiParam {int} id 活动ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/activity/getActivityInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} activityInfo 报修详情
     * @apiSuccess (info) {string} issuer 发布人
     * @apiSuccess (info) {string} activityNumber 编号
     * @apiSuccess (info) {string} contact 联系人
     * @apiSuccess (info) {string} cellphone 联系方式
     * @apiSuccess (info) {string} status 状态
     * @apiSuccess (info) {string} enrollDate 报名起止日期
     * @apiSuccess (info) {string} activeDatetime 活动起止时间
     * @apiSuccess (info) {string} address 活动地址
     * @apiSuccess (info) {string} target 活动对象
     * @apiSuccess (info) {string} maxCount 活动人数
     * @apiSuccess (info) {int} maxCountNum 活动人数（数字）
     * @apiSuccess (info) {list} imgList 活动图片
     * @apiSuccess (info) {list} imgListNoHostname 活动图片(无主机地址)
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "activityInfo": {
     *         "issuer": "徐凌",
     *         "activityNumber": "123192307491321340",
     *         "contact": "徐凌",
     *         "cellphone": "13333333333",
     *         "status": "报名中",
     *         "enrollDate": "2017-02-02——2017-09-09",
     *         "activeDatetime": "2017-02-02 09:09——2017-09-09 09:09",
     *         "address": "中大银泰城楼下草坪",
     *         "target": "12岁以下儿童",
     *         "maxCount": "60人",
     *         "maxCountNum": 60,
     *         "imgList": []
     *     }
     *   }
     * 
     *
     */
    static async getActivityInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.activityModel.getActivityInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                const temp = {
                    issuer: responseData.returnData.data.accountRealName,
                    activityNumber: responseData.returnData.data.activityNumber,
                    contact: responseData.returnData.data.linkMan,
                    cellphone: responseData.returnData.data.linkPhone,
                    status: responseData.returnData.data.remark === 'IN_DATE'
                        ? '报名中'
                        : (responseData.returnData.data.remark === 'OUT_OF_DATE'
                        ? '报名结束'
                        : '未知'),
                    statusCode: responseData.returnData.data.remark,
                    enrollDate: dateTransition(responseData.returnData.data.createDatetime, 'minute') + '—' + dateTransition(responseData.returnData.data.applyEndDatetime, 'minute'),
                    enrollStartDate: dateTransition(responseData.returnData.data.createDatetime, 'datetime'),
                    enrollEndDate: dateTransition(responseData.returnData.data.applyEndDatetime, 'datetime'),
                    activityDatetime: dateTransition(responseData.returnData.data.beginDatetime, 'minute') + '—' + dateTransition(responseData.returnData.data.endDatetime, 'minute'),
                    activityStartDatetime: dateTransition(responseData.returnData.data.beginDatetime, 'datetime'),
                    activityEndDatetime: dateTransition(responseData.returnData.data.endDatetime, 'datetime'),
                    address: responseData.returnData.data.address,
                    target: responseData.returnData.data.objectDescription,
                    maxCount: responseData.returnData.data.totalCount === 0 
                        ? '不限' 
                        : responseData.returnData.data.totalCount + '人',
                    maxCountNum: responseData.returnData.data.totalCount,
                    title: responseData.returnData.data.title,
                    content: responseData.returnData.data.content,
                    // imgListNoHostname: responseData.returnData.data.imageList,
                    imgListNoHostname: [],
                    imgList: []
                };
                for (let i = 0; i < responseData.returnData.data.pictures.length; i ++) {
                    temp.imgList.push(serverHostname + responseData.returnData.data.pictures[i]);
                }
                for (let i = 0; i < responseData.returnData.data.pictures.length; i ++) {
                    temp.imgListNoHostname.push(responseData.returnData.data.pictures[i]);
                }
                returnData.activityInfo = temp;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/activity/getActivityEnrollList 获取活动的报名列表
     * @apiName get activity enroll list
     * @apiGroup ManageSystem System Property Activity
     * @apiVersion 1.0.0
     * @apiDescription 获取活动的报名列表
     * 
     * @apiParam {int} pageNo 页码
     * @apiParam {int} pageSize 每页尺寸
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/activity/getActivityEnrollList
     *   {
     *     "pageNo": 1,
     *     "pageSize": 10
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} enrollList 活动列表
     * @apiSuccess (list) {string} name 姓名
     * @apiSuccess (list) {string} cellphone 手机号
     * @apiSuccess (list) {string} address 住址
     * @apiSuccess (list) {int} count 人数
     * @apiSuccess (list) {string} enrollDatetime 报名时间
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "enrollList": [{
     *         "name": "徐凌",
     *         "cellphone": "13333333333",
     *         "address": "中大银泰城1-1-1",
     *         "count": 3,
     *         "enrollDatetime": "2017-02-02 09:09:09"
     *     }]
     *   }
     * 
     *
     */
    static async getActivityEnrollList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['id', 'pageNo', 'pageSize']
            },
            method: manageSystemModel.systemModel.propertyModel.activityModel.getActivityEnrollList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const enrollList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        name: responseData.returnData.data.list[i].userName,
                        cellphone: responseData.returnData.data.list[i].userCellphone,
                        address: responseData.returnData.data.list[i].address,
                        count: responseData.returnData.data.list[i].userCount,
                        enrollDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime')
                    };
                    enrollList.push(temp);
                }
                returnData.enrollList = enrollList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {POST} /api/manageSystem/system/property/activity/addActivity 添加活动
     * @apiName add activity
     * @apiGroup ManageSystem System Property Activity
     * @apiVersion 1.0.0
     * @apiDescription 添加活动
     * 
     * @apiParam {string} contact 联系人
     * @apiParam {string} cellphone 联系方式
     * @apiParam {number} enrollEndDate 报名截止日期(13位时间戳)
     * @apiParam {number} activityStartDatetime 活动开始时间(13位时间戳)
     * @apiParam {number} activityEndDatetime 活动结束时间（13位时间戳）
     * @apiParam {string} address 活动地址
     * @apiParam {string} target 活动对象
     * @apiParam {string} maxCount 活动人数
     * @apiParam {string} title 活动标题
     * @apiParam {string} content 活动内容
     * @apiParam {array} imgList 活动图片
     *
     * @apiParamExample {json} Request Example
     *   POST /api/manageSystem/system/property/activity/addActivity
     *   {
     *     "contact": "徐凌",
     *     "cellphone": "13333333333",
     *     "enrollEndDate": 1500000000000,
     *     "activityStartDatetime": 1500000000000,
     *     "activityEndDatetime": 1500000000000,
     *     "address": "中大银泰城1-1-1",
     *     "target": "13岁以下小女孩",
     *     "maxCount": "13",
     *     "title": "这是一个标题",
     *     "content": "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
     *     "imgList": ["/1/1/1.jpg", "/2/2/2.jpg"] 
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async addActivity(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['contact', 'cellphone', 'enrollEndDate', 'activityStartDatetime', 'activityEndDatetime', 'address', 'target', 'maxCount', 'title', 'content', 'imgList']
            },
            method: manageSystemModel.systemModel.propertyModel.activityModel.addActivity,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/activity/editActivity 编辑活动
     * @apiName edit activity
     * @apiGroup ManageSystem System Property Activity
     * @apiVersion 1.0.0
     * @apiDescription 编辑活动
     * 
     * @apiParam {int} id 活动ID
     * @apiParam {string} contact 联系人
     * @apiParam {string} cellphone 联系方式
     * @apiParam {number} enrollEndDate 报名截止日期(13位时间戳)
     * @apiParam {number} activityStartDatetime 活动开始时间(13位时间戳)
     * @apiParam {number} activityEndDatetime 活动结束时间（13位时间戳）
     * @apiParam {string} address 活动地址
     * @apiParam {string} target 活动对象
     * @apiParam {string} maxCount 活动人数
     * @apiParam {string} title 活动标题
     * @apiParam {string} content 活动内容
     * @apiParam {array} imgList 活动图片
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/activity/editActivity
     *   {
     *     "id": 1,
     *     "contact": "徐凌",
     *     "cellphone": "13333333333",
     *     "enrollEndDate": 1500000000000,
     *     "activityStartDatetime": 1500000000000,
     *     "activityEndDatetime": 1500000000000,
     *     "address": "中大银泰城1-1-1",
     *     "target": "13岁以下小女孩",
     *     "maxCount": "13",
     *     "title": "这是一个标题",
     *     "content": "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
     *     "imgList": ["/1/1/1.jpg", "/2/2/2.jpg"] 
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async editActivity(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'contact', 'cellphone', 'enrollEndDate', 'activityStartDatetime', 'activityEndDatetime', 'address', 'target', 'maxCount', 'title', 'content', 'imgList']
            },
            method: manageSystemModel.systemModel.propertyModel.activityModel.editActivity,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/activity/exportEnrollList 导出活动报名列表
     * @apiName export enroll list
     * @apiGroup ManageSystem System Property Activity
     * @apiVersion 1.0.0
     * @apiDescription 导出活动报名列表
     * 
     * @apiParam {int} id 活动id
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/activity/exportEnrollList
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {string} path 列表地址
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "activityList": "http://www.baidu.com/"
     *   }
     * 
     *
     */
    static async exportEnrollList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.activityModel.exportEnrollList,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                returnData.path = serverHostname + responseData.returnData.data.filePath;
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ActivityController;