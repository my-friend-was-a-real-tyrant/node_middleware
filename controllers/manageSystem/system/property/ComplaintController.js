const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');

const url = require('url');

class ComplaintController {
    /**
     * @api {GET} /api/manageSystem/system/property/complaint/getComplaintList 获取表扬投诉列表
     * @apiName get complaint list
     * @apiGroup ManageSystem System Property Complaint
     * @apiVersion 1.0.0
     * @apiDescription 获取表扬投诉列表
     * 
     * @apiParam {int} pageNo 页码
     * @apiParam {int} pageSize 每页尺寸
     * @apiParam {string} keywords 关键字
     * @apiParam {number} startDate 开始日期(13位时间戳)
     * @apiParam {number} endDate 截止日期（13位时间戳）
     * @apiParam {bool} belongToMe 是否只看指派给自己的
     * @apiParam {number} type 类型1投诉2表扬
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/complaint/getComplaintList
     *   {
     *     "pageNo": 1,
     *     "pageSize": 10,
     *     "keywords": "",
     *     "startDate": 1500000000000,
     *     "endDate": 1500000000000,
     *     "belongToMe": true,
     *     "type": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} repairmentList 全部表扬投诉列表
     * @apiSuccess (list) {int} id 表扬投诉ID
     * @apiSuccess (list) {string} title 表扬投诉标题
     * @apiSuccess (list) {string} description 详情
     * @apiSuccess (list) {int} type 类型
     * @apiSuccess (list) {string} userName 用户姓名
     * @apiSuccess (list) {string} userCellphone 用户电话
     * @apiSuccess (list) {string} date 表扬投诉时间(yyyy-mm-dd hh:mm:ss)
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairmentList": [{
     *         "id": 1,
     *         "title": "我要表扬谁",
     *         "description": "哈哈哈",
     *         "type": 1,
     *         "userName": "徐凌",
     *         "userCellphone": "13333333333",
     *         "date": "2017-02-02 09:09:09"
     *     }]
     *   }
     * 
     *
     */
    static async getComplaintList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate', 'belongToMe', 'type']
            },
            method: manageSystemModel.systemModel.propertyModel.complaintModel.getComplaintList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const repairmentList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        title: responseData.returnData.data.list[i].subject,
                        description: responseData.returnData.data.list[i].content,
                        type: responseData.returnData.data.list[i].type === 1 
                            ? '投诉'
                            : '表扬',
                        typeForApp: responseData.returnData.data.list[i].type,
                        userName: responseData.returnData.data.list[i].userRealName,
                        userCellphone: responseData.returnData.data.list[i].userCellphone,
                        status: responseData.returnData.data.list[i].type === 1 ? (responseData.returnData.data.list[i].status === 1
                            ? '处理中'
                            : '处理完成') : '',
                        date: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime')
                    };
                    repairmentList.push(temp);
                }
                returnData.repairmentList = repairmentList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/complaint/getComplaintInfo 获取表扬投诉详情
     * @apiName get complaint info
     * @apiGroup ManageSystem System Property Complaint
     * @apiVersion 1.0.0
     * @apiDescription 获取表扬投诉详情
     * 
     * @apiParam {int} id 表扬投诉ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/complaint/getComplaintInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} repairmentInfo 报修详情
     * @apiSuccess (info) {int} type 类型
     * @apiSuccess (info) {string} title 标题
     * @apiSuccess (info) {string} date 时间
     * @apiSuccess (info) {string} description 描述
     * @apiSuccess (info) {string} img 图片
     * @apiSuccess (info) {string} userName 用户姓名
     * @apiSuccess (info) {string} userCellphone 联系方式
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairmentInfo": {
     *         "type": 1,
     *         "title": "我要表扬谁",
     *         "date": "2017-09-09 09:09:09",
     *         "description": "哈哈哈",
     *         "img": "http://www.baidu.com",
     *         "userName": "徐凌",
     *         "userCellphone": "13333333333"
     *     }
     *   }
     * 
     *
     */
    static async getComplaintInfo(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.complaintModel.getComplaintInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                const temp = {
                    number: responseData.returnData.data.serial,
                    type: responseData.returnData.data.type === 1 ? '投诉' : '表扬',
                    status: responseData.returnData.data.status === 1 ? '处理中' : '处理完成',
                    statusCode: responseData.returnData.data.status,
                    typeForApp: responseData.returnData.data.type,
                    title: responseData.returnData.data.subject,
                    date: dateTransition(responseData.returnData.data.createDatetime, 'datetime'),
                    description: responseData.returnData.data.content,
                    img: responseData.returnData.data.pictures.length > 0
                        ? serverHostname + responseData.returnData.data.pictures[0]
                        : '',
                    userName: responseData.returnData.data.userRealName,
                    userCellphone: responseData.returnData.data.userCellphone,
                    address: responseData.returnData.data.address,
                    operationRecordsList: responseData.returnData.data.operationRecords
                };
                for (let i = 0; i < temp.operationRecordsList.length; i ++) {
                    temp.operationRecordsList[i] = {
                        event: temp.operationRecordsList[i].operation === 1
                            ? '用户发起'
                            : (temp.operationRecordsList[i].operation === 2
                            ? '处理完成'
                            : (temp.operationRecordsList[i].operation === 3
                            ? '转派'
                            : (temp.operationRecordsList[i].operation === 4
                            ? '转为报事' : ''))),
                        operation: temp.operationRecordsList[i].description,
                        remark: temp.operationRecordsList[i].remark,
                        operator: temp.operationRecordsList[i].operationAccountRealName ? temp.operationRecordsList[i].operationAccountRealName + '(' + temp.operationRecordsList[i].operationAccountCellphone + ')' : '无',
                        operateDatetime: dateTransition(temp.operationRecordsList[i].createDatetime, 'minute')
                    };
                }
                returnData.repairmentInfo = temp;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {DELETE} /api/manageSystem/system/property/complaint/deleteComplaint 删除表扬投诉
     * @apiName delete complaint
     * @apiGroup ManageSystem System Property Complaint
     * @apiVersion 1.0.0
     * @apiDescription 删除表扬投诉
     * 
     * @apiParam {int} id 表扬投诉ID
     *
     * @apiParamExample {json} Request Example
     *   DELETE /api/manageSystem/system/property/complaint/deleteComplaint
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async deleteComplaint(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.complaintModel.deleteComplaint,
            params: {
                accountId,
                id: params.id
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/complaint/finishComplaint 处理完成表扬投诉
     * @apiName finish complaint
     * @apiGroup ManageSystem System Property Complaint
     * @apiVersion 1.0.0
     * @apiDescription 处理完成表扬投诉
     * 
     * @apiParam {int} id 表扬投诉ID
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/complaint/finishComplaint
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async finishComplaint(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'remark']
            },
            method: manageSystemModel.systemModel.propertyModel.complaintModel.finishComplaint,
            params: {
                accountId,
                parkId: defaultParkId,
                id: postData.id,
                remark: postData.remark
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/complaint/changeComplaintType 投诉转报事
     * @apiName change complaint type
     * @apiGroup ManageSystem System Property Complaint
     * @apiVersion 1.0.0
     * @apiDescription 投诉转报事
     * 
     * @apiParam {int} id 表扬投诉ID
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/complaint/changeComplaintType
     *   {
     *     "id": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async changeComplaintType(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['remark', 'report', 'id']
            },
            method: manageSystemModel.systemModel.propertyModel.complaintModel.changeComplaintType,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/complaint/getAppointTaskManagerList 获取表扬投诉指派人员名单
     * @apiName get appoint task manager list
     * @apiGroup ManageSystem System Property Complaint
     * @apiVersion 1.0.0
     * @apiDescription 获取表扬投诉指派人员名单
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {list} managerList 报修详情
     * @apiSuccess (list) {int} value value
     * @apiSuccess (list) {string} label label
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "managerList": [
     *         {
     *             "value": 1,
     *             "label": "徐凌(13333333333)"
     *         }
     *     ]
     *   }
     * 
     *
     */
    static async getAppointTaskManagerList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: manageSystemModel.systemModel.propertyModel.complaintModel.getAppointTaskManagerList,
            params: {
                accountId,
                parkId: defaultParkId
            },
            success(responseData) {
                const managerList = [];
                for (let i = 0; i < responseData.returnData.data.length; i ++) {
                    const temp = {
                        value: responseData.returnData.data[i].id,
                        label: responseData.returnData.data[i].realName + '/' + responseData.returnData.data[i].cellphone
                    };
                    managerList.push(temp);
                }
                returnData.managerList = managerList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/complaint/appointTask 转派投诉任务
     * @apiName appoint task
     * @apiGroup ManageSystem System Property Complaint
     * @apiVersion 1.0.0
     * @apiDescription 转派投诉任务
     * 
     * @apiParam {int} id 表扬投诉ID
     * @apiParam {string} remark 备注
     * @apiParam {int} manager 转派人id
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/complaint/appointTask
     *   {
     *     "id": 1,
     *     "remark": "哈哈",
     *     "manager": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async appointTask(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const postData = ctx.request.body;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['remark', 'manager', 'id']
            },
            method: manageSystemModel.systemModel.propertyModel.complaintModel.appointTask,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ComplaintController;