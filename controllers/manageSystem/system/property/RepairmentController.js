const baseController = require('../../../common/ResDataFormat');
const dateTransition = require('../../../common/dateTransition');
const exception = require('../../../common/requestModule');
const { serverHostname } = require('../../../common/constant');
const manageSystemModel = require('../../../../models/ManageSystemModel');
const qs = require('querystring');

const url = require('url');

class RepairmentController {
    /**
     * @api {GET} /api/manageSystem/system/property/repairment/getRepairmentList 获取报修列表
     * @apiName get repairment list
     * @apiGroup ManageSystem System Property Repairment
     * @apiVersion 1.0.0
     * @apiDescription 获取报修列表
     * 
     * @apiParam {int} pageNo 页码
     * @apiParam {int} pageSize 每页尺寸
     * @apiParam {string} keywords 关键字
     * @apiParam {number} startDate 开始日期(13位时间戳)
     * @apiParam {number} endDate 截止日期（13位时间戳）
     * @apiParam {bool} belongToMe 是否只看指派给自己的
     * @apiParam {number} repairmentStatus 状态
     * @apiParam {number} repairmentType 报修类型
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/repairment/getRepairmentList
     *   {
     *     "pageNo": 1,
     *     "pageSize": 10,
     *     "keywords": "",
     *     "startDate": 1500000000000,
     *     "endDate": 1500000000000,
     *     "belongToMe": false,
     *     "repairmentStatus": 1,
     *     "repairmentType": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {array} repairmentList 全部报修列表
     * @apiSuccess (list) {int} repairmentId 报修ID
     * @apiSuccess (list) {int} repairmentType 报修类型1家庭2公共
     * @apiSuccess (list) {string} repairmentArea 报修区域
     * @apiSuccess (list) {string} repairmentDescription 报修描述
     * @apiSuccess (list) {string} contactPersonName 联系人姓名
     * @apiSuccess (list) {string} contactPersonCellphone 联系人电话
     * @apiSuccess (list) {string} repairmentDatetime 报修时间(yyyy-mm-dd hh:mm:ss)
     * @apiSuccess (list) {string} repairmentStatus 报修状态
     * @apiSuccess (list) {string} assess 评价
     * @apiSuccess (list) {string} repairMan 维修人姓名
     * @apiSuccess (list) {string} repairManCellphone 维修人电话
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairmentList": [{
     *         "repairmentId": 1,
     *         "repairmentType": 1,
     *         "repairmentArea": "楼下游泳池",
     *         "repairmentDescription": "哈哈哈",
     *         "contactPersonName": "徐凌",
     *         "contactPersonCellphone": "13333333333",
     *         "repairmentDatetime": "2017-02-02 09:09:09",
     *         "repairmentStatus": "已转送",
     *         "repairMan": "徐凌",
     *         "repairManCellphone": "13333333333"
     *     }]
     *   }
     * 
     *
     */
    static async getRepairmentList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params,
                properties: ['pageNo', 'pageSize', 'keywords', 'startDate', 'endDate', 'belongToMe', 'repairmentStatus', 'repairmentType']
            },
            method: manageSystemModel.systemModel.propertyModel.repairmentModel.getRepairmentList,
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
                        repairmentId: responseData.returnData.data.list[i].id,
                        repairmentType: responseData.returnData.data.list[i].type,
                        repairmentArea: responseData.returnData.data.list[i].region,
                        repairmentDescription: responseData.returnData.data.list[i].description,
                        contactPersonName: responseData.returnData.data.list[i].contactPerson,
                        contactPersonCellphone: responseData.returnData.data.list[i].contactCellphone,
                        repairmentDatetime: dateTransition(responseData.returnData.data.list[i].createDatetime, 'datetime'),
                        repairmentStatus: responseData.returnData.data.list[i].status,
                        repairmentStatusForApp: responseData.returnData.data.list[i].status,
                        assess: responseData.returnData.data.list[i].evaluate ? (responseData.returnData.data.list[i].evaluate === 5 ? '非常满意' : (responseData.returnData.data.list[i].evaluate === 3 ? '基本满意' : '不满意')) : '',
                        repairMan: responseData.returnData.data.list[i].serviceman ? responseData.returnData.data.list[i].serviceman : '',
                        repairManCellphone: responseData.returnData.data.list[i].servicemanCellphone ? responseData.returnData.data.list[i].servicemanCellphone : ''
                    };
                    repairmentList.push(temp);
                }
                for (let i = 0; i < repairmentList.length; i ++) {
                    repairmentList[i].repairmentType = (repairmentList[i].repairmentType === 1 ? '居家报修' : '公共报修');
                    switch(repairmentList[i].repairmentStatus) {
                        case 1:
                            repairmentList[i].repairmentStatus = '审核中';
                            break;
                        case 2:
                            repairmentList[i].repairmentStatus = '维修中';
                            break;
                        case 3:
                            repairmentList[i].repairmentStatus = '已拒绝';
                            break;
                        case 4:
                            repairmentList[i].repairmentStatus = '已转送';
                            break;
                        case 5:
                            repairmentList[i].repairmentStatus = '维修完成';
                            break;
                        case 6:
                            repairmentList[i].repairmentStatus = '已评价';
                            repairmentList[i].repairmentStatus += '(' + repairmentList[i].assess + ')';
                            break;
                    }
                }
                returnData.repairmentList = repairmentList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {GET} /api/manageSystem/system/property/repairment/getRepairmentInfo 获取报修详情
     * @apiName get repairment info
     * @apiGroup ManageSystem System Property Repairment
     * @apiVersion 1.0.0
     * @apiDescription 获取报修详情
     * 
     * @apiParam {int} repairmentId 报修ID
     *
     * @apiParamExample {json} Request Example
     *   GET /api/manageSystem/system/property/repairment/getRepairmentInfo
     *   {
     *     "repairmentId": 1
     *   }
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} repairmentInfo 报修详情
     * @apiSuccess (info) {int} repairmentType 报修类型
     * @apiSuccess (info) {string} repairmentArea 报修区域
     * @apiSuccess (info) {string} userName 报修用户姓名
     * @apiSuccess (info) {string} userCellphone 报修用户手机
     * @apiSuccess (info) {string} contactPerson 联系人姓名
     * @apiSuccess (info) {string} contactPersonCellphone 联系人手机
     * @apiSuccess (info) {string} description 描述
     * @apiSuccess (info) {string} repairmentDatetime 报修时间
     * @apiSuccess (info) {string} assess 评价
     * @apiSuccess (info) {string} repairmentStatus 报修状态
     * @apiSuccess (info) {string} repairMan 维修人
     * @apiSuccess (info) {string} repairManCellphone 维修人电话
     * @apiSuccess (info) {string} repairmentImgList 用户上传报修图片列表
     * @apiSuccess (info) {string} manageImgList 转送图片列表
     * @apiSuccess (info) {string} operationRecordsList 操作记录
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairmentInfo": {
     *         "repairmentType": 1,
     *         "repairmentArea": "楼下游泳池",
     *         "userName": "徐凌",
     *         "userCellphone": "13333333333",
     *         "contactPerson": "徐凌",
     *         "contactPersonCellphone": "13333333333",
     *         "description": "哈哈哈",
     *         "repairmentDatetime": "2017-02-02 09:09:09",
     *         "assess": "非常满意",
     *         "repairmentStatus": "已转送",
     *         "repairMan": "徐凌",
     *         "repairManCellphone": "13333333333",
     *         "repairmentImgList": [],
     *         "manageImgList": [],
     *         "operationRecordsList": []
     *     }
     *   }
     * 
     *
     */
    static async getRepairmentInfo(ctx) {
        let returnData = baseController.getSuccess();
        const { accountId, defaultParkId } = ctx.session.manager;
        const params = url.parse(ctx.request.url, true).query;
        await exception({
            returnData,
            validator: {
                params,
                properties: 'repairmentId'
            },
            method: manageSystemModel.systemModel.propertyModel.repairmentModel.getRepairmentInfo,
            params: {
                accountId,
                parkId: defaultParkId,
                repairmentId: params.repairmentId
            },
            success(responseData) {
                const temp = {
                    number: responseData.returnData.data.serial,
                    repairmentType: responseData.returnData.data.type === 1 ? '居家报修' : '公共报修',
                    repairmentTypeForApp: responseData.returnData.data.type,
                    repairmentArea: responseData.returnData.data.region,
                    userName: responseData.returnData.data.userRealName,
                    userCellphone: responseData.returnData.data.userCellphone,
                    contactPerson: responseData.returnData.data.contactPerson,
                    contactPersonCellphone: responseData.returnData.data.contactCellphone,
                    description: responseData.returnData.data.description,
                    bestTime: responseData.returnData.data.bestTimeDescribe,
                    repairmentDatetime: dateTransition(responseData.returnData.data.createDatetime, 'datetime'),
                    assess: responseData.returnData.data.evaluate ? (responseData.returnData.data.evaluate === 5 ? '非常满意' : (responseData.returnData.data.evaluate === 3 ? '基本满意' : '不满意')) : '',
                    repairmentStatus: responseData.returnData.data.status,
                    repairmentStatusForApp: responseData.returnData.data.status,
                    repairMan: responseData.returnData.data.serviceman ? responseData.returnData.data.serviceman : '',
                    repairManCellphone: responseData.returnData.data.servicemanCellphone ? responseData.returnData.data.servicemanCellphone : '',
                    repairmentImgList: responseData.returnData.data.pictureList ? responseData.returnData.data.pictureList : [],
                    manageImgList: responseData.returnData.data.managePictureList ? responseData.returnData.data.managePictureList : [],
                    operationRecordsList: responseData.returnData.data.recordsList
                };
                switch(temp.repairmentStatus) {
                    case 1:
                        temp.repairmentStatus = '审核中';
                        break;
                    case 2:
                        temp.repairmentStatus = '维修中';
                        break;
                    case 3:
                        temp.repairmentStatus = '已拒绝';
                        break;
                    case 4:
                        temp.repairmentStatus = '已转送';
                        break;
                    case 5:
                        temp.repairmentStatus = '维修完成';
                        break;
                    case 6:
                        temp.repairmentStatus = '已评价';
                        break;
                }
                for (let i = 0; i < temp.repairmentImgList.length; i ++) {
                    temp.repairmentImgList[i] = serverHostname + temp.repairmentImgList[i];
                }
                for (let i = 0; i < temp.manageImgList.length; i ++) {
                    temp.manageImgList[i] = serverHostname + temp.manageImgList[i];
                }
                for (let i = 0; i < temp.operationRecordsList.length; i ++) {
                    temp.operationRecordsList[i] = {
                        event: temp.operationRecordsList[i].operation === 1
                            ? '提交报修申请'
                            : (temp.operationRecordsList[i].operation === 2
                            ? '下发报修任务'
                            : (temp.operationRecordsList[i].operation === 3
                            ? '已拒绝'
                            : (temp.operationRecordsList[i].operation === 4
                            ? '转送第三方维修'
                            : (temp.operationRecordsList[i].operation === 5
                            ? '维修完成'
                            : (temp.operationRecordsList[i].operation === 6
                            ? '评价完成'
                            : (temp.operationRecordsList[i].operation === 7
                            ? '转派他人'
                            : '默认评价')))))),
                        operation: temp.operationRecordsList[i].description,
                        remark: temp.operationRecordsList[i].remark,
                        operator: temp.operationRecordsList[i].operatorRealName ? temp.operationRecordsList[i].operatorRealName + '(' + temp.operationRecordsList[i].operatorCellphone + ')' : '无',
                        operateDatetime: dateTransition(temp.operationRecordsList[i].createDatetime, 'minute')
                    };
                }
                returnData.repairmentInfo = temp;
            }
        });
        ctx.body = returnData;
    }


    /**
     * @api {GET} /api/manageSystem/system/property/repairment/getRepairManList 获取维修员名单
     * @apiName get repairman list
     * @apiGroup ManageSystem System Property Repairment
     * @apiVersion 1.0.0
     * @apiDescription 获取维修员名单
     *
     * @apiSuccess (Reponse 200) {string} code 00000
     * @apiSuccess (Reponse 200) {string} message success
     * @apiSuccess (Reponse 200) {object} repairManList 维修员列表
     * @apiSuccess (list) {int} value 维修员id
     * @apiSuccess (list) {string} label 维修员名字与手机号
     * 
     * @apiSuccessExample {json} Response 200 Example
     *   HTTP/1.1 200 OK
     *   {
     *     "code": "00000",
     *     "message": "success",
     *     "repairManList": {
     *         "value": 1,
     *         "label": "徐凌(13333333333)"
     *     }
     *   }
     * 
     *
     */
    static async getRepairManList(ctx) {
        let returnData = baseController.getSuccess();
        const params = url.parse(ctx.request.url, true).query;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            method: [manageSystemModel.systemModel.propertyModel.repairmentModel.getRepairManList,
                manageSystemModel.systemModel.propertyModel.repairmentModel.getRepairmentManagerList],
            params: [{
                accountId,
                parkId: defaultParkId
            }, {
                accountId,
                parkId: defaultParkId
            }],
            success(responseDataArr) {
                const repairManList = [];
                for (let i = 0; i < responseDataArr[1].returnData.data.length; i ++) {
                    const temp = {
                        value: responseDataArr[1].returnData.data[i].id,
                        label: responseDataArr[1].returnData.data[i].realName + '/' + responseDataArr[1].returnData.data[i].cellphone
                    };
                    repairManList.push(temp);
                }
                for (let i = 0; i < responseDataArr[0].returnData.data.length; i ++) {
                    const temp = {
                        value: responseDataArr[0].returnData.data[i].id,
                        label: responseDataArr[0].returnData.data[i].realName + '/' + responseDataArr[0].returnData.data[i].cellphone
                    };
                    repairManList.push(temp);
                }
                returnData.repairManList = repairManList;
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/repairment/approveRepairment 审批及转送
     * @apiName approve repairment
     * @apiGroup ManageSystem System Property Repairment
     * @apiVersion 1.0.0
     * @apiDescription 审批及转送
     * 
     * @apiParam {int} repairmentId 报修ID
     * @apiParam {int} approveType 审批类型1拒绝2通过3转送
     * @apiParam {string} repairMan 维修人姓名
     * @apiParam {string} repairManCellphone 维修人电话
     * @apiParam {array} reportImgList 转送图地址
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/repairment/approveRepairment
     *   {
     *     "repairmentId": 1,
     *     "remark": "beizhu",
     *     "approveType": 1,
     *     "repairMan": "徐凌",
     *     "repairManCellphone": "13333333333",
     *     "reportImgList": []
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async approveRepairment(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['repairmentId', 'remark', 'approveType', 'repairMan', 'reportImgList']
            },
            method: manageSystemModel.systemModel.propertyModel.repairmentModel.approveRepairment,
            params: {
                accountId,
                parkId: defaultParkId,
                postDataFromFE: postData
            }
        });
        ctx.body = returnData;
    }

    /**
     * @api {PATCH} /api/manageSystem/system/property/repairment/finishRepairment 完成维修
     * @apiName finish repairment
     * @apiGroup ManageSystem System Property Repairment
     * @apiVersion 1.0.0
     * @apiDescription 完成维修
     * 
     * @apiParam {int} repairmentId 报修ID
     *
     * @apiParamExample {json} Request Example
     *   PATCH /api/manageSystem/system/property/repairment/finishRepairment
     *   {
     *     "repairmentId": 1
     *   }
     *
     * @apiUse CODE_200
     * 
     *
     */
    static async finishRepairment(ctx) {
        let returnData = baseController.getSuccess();
        const postData = ctx.request.body;
        const { accountId, defaultParkId } = ctx.session.manager;
        await exception({
            returnData,
            validator: {
                params: postData,
                properties: ['repairmentId', 'remark', 'finishImgList']
            },
            method: manageSystemModel.systemModel.propertyModel.repairmentModel.finishRepairment,
            params: {
                accountId,
                parkId: defaultParkId,
                repairmentId: postData.repairmentId,
                remark: postData.remark,
                finishImgList: postData.finishImgList
            }
        });
        ctx.body = returnData;
    }
}

module.exports = RepairmentController;