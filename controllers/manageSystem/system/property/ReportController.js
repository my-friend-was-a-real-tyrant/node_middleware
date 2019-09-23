const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');
const qs = require('querystring');

const url = require('url');

class ReportController {
    /**
     * @api {GET} /api/manageSystem/system/property/report/getReportList 获取报事列表
     * @apiName get report list
     * @apiGroup ManageSystem System Property Report
     * @apiVersion 1.0.0
     * @apiDescription 获取报事列表
     * 
     * @apiParam {int} pageNo 页码
     * @apiParam {int} pageSize 每页尺寸
     * @apiParam {string} keywords 关键字
     * @apiParam {number} startDate 开始日期(13位时间戳)
     * @apiParam {number} endDate 截止日期（13位时间戳）
     * @apiParam {bool} belongToMe 是否只看指派给自己的
     * @apiParam {number} status 状态
     * @apiParam {number} type 报事类型
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/report/getReportList
     *   {
     *     "pageNo": 1,
     *     "pageSize": 10,
     *     "keywords": "",
     *     "startDate": 1500000000000,
     *     "endDate": 1500000000000,
     *     "belongtoMe": true,
     *     "status": 1,
     *     "type": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} reportList 全部报修列表
     * @apiSuccess (list) {int} id 报事ID
     * @apiSuccess (list) {int} type 报事类型1服务2安保3绿化4设备
     * @apiSuccess (list) {string} title 标题
     * @apiSuccess (list) {string} contactPersonName 联系人姓名
     * @apiSuccess (list) {string} contactPersonCellphone 联系人电话
     * @apiSuccess (list) {string} datetime 报修时间(yyyy-mm-dd hh:mm:ss)
     * @apiSuccess (list) {string} status 报修状态
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairmentList": [{
     *         "id": 1,
     *         "type": 1,
     *         "title": "楼下游泳池",
     *         "contactPersonName": "徐凌",
     *         "contactPersonCellphone": "13333333333",
     *         "datetime": "2017-02-02 09:09:09",
     *         "status": "已转送"
     *     }]
     *   }
     * 
     *
     */
    static async getReportList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate', 'belongToMe', 'status', 'type']
            },
            method: manageSystemModel.systemModel.propertyModel.reportModel.getReportList,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: params
            },
            success(responseData) {
                returnData.count = responseData.returnData.data.total;
                const reportList = [];
                for (let i = 0; i < responseData.returnData.data.list.length; i ++) {
                    const temp = {
                        id: responseData.returnData.data.list[i].id,
                        type: responseData.returnData.data.list[i].type,
                        typeForApp: responseData.returnData.data.list[i].type,
                        title: responseData.returnData.data.list[i].subject,
                        contactPersonName: responseData.returnData.data.list[i].contactPerson,
                        contactPersonCellphone: responseData.returnData.data.list[i].contactCellphone,
                        datetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime'),
                        status: responseData.returnData.data.list[i].status,
                    };
                    reportList.push(temp);
                }
                for (let i = 0; i < reportList.length; i ++) {
                    reportList[i].status = (reportList[i].status === 1 ? '处理中' : '处理完成');
                    switch(reportList[i].type) {
                        case 1:
                            reportList[i].type = '服务报事';
                            break;
                        case 2:
                            reportList[i].type = '安保报事';
                            break;
                        case 3:
                            reportList[i].type = '绿化报事';
                            break;
                        case 4:
                            reportList[i].type = '设备报事';
                            break;
                    }
                }
                returnData.reportList = reportList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/report/getReportInfo 获取报事详情
     * @apiName get report info
     * @apiGroup ManageSystem System Property Report
     * @apiVersion 1.0.0
     * @apiDescription 获取报事详情
     * 
     * @apiParam {int} id 报事ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/report/getReportInfo
     *   {
     *     "id": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} reportInfo 报事详情
     * @apiSuccess (info) {int} type 报事类型
     * @apiSuccess (info) {string} title 报事标题
     * @apiSuccess (info) {string} contactPerson 联系人姓名
     * @apiSuccess (info) {string} contactPersonCellphone 联系人手机
     * @apiSuccess (info) {string} content 内容
     * @apiSuccess (info) {string} datetime 报修时间
     * @apiSuccess (info) {string} status 报修状态
     * @apiSuccess (info) {string} imgList 图片列表
     * @apiSuccess (info) {string} operationRecordsList 操作记录
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "reportInfo": {
     *         "type": 1,
     *         "title": "楼下游泳池",
     *         "contactPerson": "徐凌",
     *         "contactPersonCellphone": "13333333333",
     *         "content": "哈哈哈",
     *         "datetime": "2017-02-02 09:09:09",
     *         "status": "已转送",
     *         "imgList": [],
     *         "operationRecordsList": []
     *     }
     *   }
     * 
     *
     */
    static async getReportInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'id'
            },
            method: manageSystemModel.systemModel.propertyModel.reportModel.getReportInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                id: params.id
            },
            success(responseData) {
                console.log(responseData.returnData.data);
                const temp = {
                    number: responseData.returnData.data.serial,
                    type: responseData.returnData.data.type === 1 
                        ? '服务报事' : 
                    (responseData.returnData.data.type === 2 
                        ? '安保报事' : 
                    (responseData.returnData.data.type === 3
                        ? '绿化报事' : '设备报事')),
                    title: responseData.returnData.data.subject,
                    contactPerson: responseData.returnData.data.contactPerson,
                    contactPersonCellphone: responseData.returnData.data.contactCellphone,
                    content: responseData.returnData.data.content,
                    datetime: dateTransition(responseData.returnData.data.createDatetime, 'minute'),
                    status: responseData.returnData.data.status,
                    statusCode: responseData.returnData.data.status,
                    imgList: responseData.returnData.data.pictures ? responseData.returnData.data.pictures : [],
                    operationRecordsList: responseData.returnData.data.reportRecordsList
                };
                switch(temp.status) {
                    case 1:
                        temp.status = '处理中';
                        break;
                    case 2:
                        temp.status = '处理完成';
                        break;
                }
                for (let i = 0; i < temp.imgList.length; i ++) {
                    temp.imgList[i] = serverHostname + temp.imgList[i];
                }

                for (let i = 0; i < temp.operationRecordsList.length; i ++) {
                    temp.operationRecordsList[i] = {
                        event: temp.operationRecordsList[i].operation === 1
                            ? '发起'
                            : (temp.operationRecordsList[i].operation === 2 
                                ? '完成' : '转派'),
                        operation: temp.operationRecordsList[i].content,
                        remark: temp.operationRecordsList[i].remark,
                        operator: temp.operationRecordsList[i].operationAccountRealName ? temp.operationRecordsList[i].operationAccountRealName + '(' + temp.operationRecordsList[i].operationAccountCellphone + ')' : '无',
                        operateDatetime: dateTransition(temp.operationRecordsList[i].createDatetime, 'minute')
                    };
                }
                returnData.reportInfo = temp;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/report/finishReport 完成报事
     * @apiName finish report
     * @apiGroup ManageSystem System Property Report
     * @apiVersion 1.0.0
     * @apiDescription 完成报事
     * 
     * @apiParam {int} id 报事ID
     * @apiParam {string} remark 备注
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/report/finishReport
     *   {
     *     "id": 1,
     *     "remark": "备注"
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async finishReport(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['id', 'remark']
            },
            method: manageSystemModel.systemModel.propertyModel.reportModel.finishReport,
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
     * @api {GET} /api/manageSystem/system/property/report/getAppointTaskManagerList 获取报事指派人员名单
     * @apiName get appoint task manager list
     * @apiGroup ManageSystem System Property Report
     * @apiVersion 1.0.0
     * @apiDescription 获取报事指派人员名单
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
            method: manageSystemModel.systemModel.propertyModel.reportModel.getAppointTaskManagerList,
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
     * @api {PATCH} /api/manageSystem/system/property/report/appointTask 转派报事任务
     * @apiName appoint task
     * @apiGroup ManageSystem System Property Report
     * @apiVersion 1.0.0
     * @apiDescription 转派报事任务
     * 
     * @apiParam {int} id 报事id
     * @apiParam {string} remark 备注
     * @apiParam {int} manager 转派人id
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/report/appointTask
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
            method: manageSystemModel.systemModel.propertyModel.reportModel.appointTask,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }
}

module.exports = ReportController;