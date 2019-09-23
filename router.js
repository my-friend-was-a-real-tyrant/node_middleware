const router = require('koa-router')();
// 解析post参数
const koaBody = require('koa-body')({ 
    multipart: true,
    jsonLimit: '5mb',
    formLimit: '5mb',
    textLimit: '5mb'
});

const loginController = require('./controllers/LoginController');
const commonController = require('./controllers/CommonController');
const systemController = require('./controllers/SystemController');
const manageSystemController = require('./controllers/ManageSystemController');
const mallController = require('./controllers/MallController');
const wechatController = require('./controllers/WechatController');
const appController = require('./controllers/AppController');

const baseController = require('./controllers/common/ResDataFormat');
const exception = require('./controllers/common/requestModule');
const commonModel = require('./models/CommonModel');

router
    // app
    .get('/api/common/autoUpdate', appController.autoUpdate)
    .get('/api/app/getPushList', appController.getPushList)
    .patch('/api/app/handleAppMessage', koaBody, appController.handleAppMessage)
    .post('/api/app/feedback', koaBody, appController.feedback)
    // wechat
    .get('/api/wechat/getJsConfigOptions', wechatController.getJsConfigOptions)
    // common upload file
    .post('/api/common/upload', koaBody, commonController.uploadFile)
    // login part
    .post('/api/login/getSmscode', koaBody, loginController.getSmscode)
    .post('/api/login/bindCellphone', koaBody, loginController.bindCellphone)
    .get('/api/login/getParkList', loginController.getParkList)
    .get('/api/login/getBuildingList', loginController.getBuildingList)
    .get('/api/login/getRoomList', loginController.getRoomList)
    .post('/api/login/apply', koaBody, loginController.apply)
    .post('/api/login/invite', koaBody, loginController.invite)
    .post('/api/login/appBindCellphone', koaBody, loginController.appBindCellphone)
    
    // system & mall common part (delivery address)
    .get('/api/common/getMyDeliveryAddress', commonController.getMyDeliveryAddress)
    .post('/api/common/setFrequentlyAddress', koaBody, commonController.setFrequentlyAddress)
    .get('/api/common/getProvinceList', commonController.getProvinceList)
    .get('/api/common/getCityList', commonController.getCityList)
    .get('/api/common/getDistrictList', commonController.getDistrictList)
    .post('/api/common/addDeliveryAddress', koaBody, commonController.addDeliveryAddress)
    .get('/api/common/getDeliveryAddressInfo', commonController.getDeliveryAddressInfo)
    .post('/api/common/editDeliveryAddress', koaBody, commonController.editDeliveryAddress)
    .post('/api/common/delDeliveryAddress', koaBody, commonController.delDeliveryAddress)
    .del('/api/common/clearSession', commonController.clearSession)
    // system part
    .get('/api/system/getInitInfo', systemController.getInitInfo)
    // system -- personalCenter
    // system -- personalCenter -- myFamily
    .get('/api/system/personalCenter/getMyFamilyInfo', systemController.personalCenterController.myFamilyController.getMyFamilyInfo)
    // 11-25------文档对到这
    .get('/api/system/personalCenter/getMemberInfo', systemController.personalCenterController.myFamilyController.getMemberInfo)
    .post('/api/system/personalCenter/setAgent', koaBody, systemController.personalCenterController.myFamilyController.setAgent)
    .post('/api/system/personalCenter/cancelAgent', koaBody, systemController.personalCenterController.myFamilyController.cancelAgent)
    .post('/api/system/personalCenter/auditMember', koaBody, systemController.personalCenterController.myFamilyController.auditMember)
    .get('/api/system/personalCenter/getMyRoomList', systemController.personalCenterController.myFamilyController.getMyRoomList)
    .post('/api/system/personalCenter/setDefaultRoom', koaBody, systemController.personalCenterController.myFamilyController.setDefaultRoom)
    .post('/api/system/personalCenter/delMember', koaBody, systemController.personalCenterController.myFamilyController.delMember)
    .post('/api/system/personalCenter/inviteMember', koaBody, systemController.personalCenterController.myFamilyController.inviteMember)
    // system -- personalCenter -- myRepairment
    .get('/api/system/personalCenter/getRepairmentList', systemController.personalCenterController.myRepairmentController.getRepairmentList)
    .get('/api/system/personalCenter/getRepairmentInfo', systemController.personalCenterController.myRepairmentController.getRepairmentInfo)
    .post('/api/system/personalCenter/assessRepairment', koaBody, systemController.personalCenterController.myRepairmentController.assessRepairment)
    // system -- personalCenter -- myCoupon
    .get('/api/system/personalCenter/myCoupon/getMyCouponList', systemController.personalCenterController.myCouponController.getMyCouponList)
    // system -- personalCenter -- myReport
    .get('/api/system/personalCenter/getReportList', systemController.personalCenterController.myReportController.getReportList)
    .get('/api/system/personalCenter/getReportInfo', systemController.personalCenterController.myReportController.getReportInfo)
    // system -- personalCenter -- editPersonalInfo
    .patch('/api/system/personalCenter/editPersonalInfo', koaBody, systemController.personalCenterController.editPersonalInfoController.editPersonalInfo)
    .patch('/api/system/personalCenter/changeCellphone', koaBody, systemController.personalCenterController.editPersonalInfoController.changeCellphone)
    // system -- service
    // system -- service -- repairment
    .post('/api/system/service/repairment/personalRepair', koaBody, systemController.serviceController.repairmentController.personalRepair)
    .post('/api/system/service/repairment/commonRepair', koaBody, systemController.serviceController.repairmentController.commonRepair)
    // system -- service -- complaint
    .get('/api/system/service/complaint/getComplaintList', systemController.serviceController.complaintController.getComplaintList)
    .post('/api/system/service/complaint/submitComplaint', koaBody, systemController.serviceController.complaintController.submitComplaint)
    .get('/api/system/service/complaint/getComplaintInfo', systemController.serviceController.complaintController.getComplaintInfo)
    .del('/api/system/service/complaint/deleteComplaint', systemController.serviceController.complaintController.deleteComplaint)
    // system -- service -- activity
    .get('/api/system/service/activity/getActivityList', systemController.serviceController.activityController.getActivityList)
    .get('/api/system/service/activity/getActivityInfo', systemController.serviceController.activityController.getActivityInfo)
    .post('/api/system/service/activity/enrollActivity', koaBody, systemController.serviceController.activityController.enrollActivity)
    .get('/api/system/service/activity/getEnrolledActivityList', systemController.serviceController.activityController.getEnrolledActivityList)
    .patch('/api/system/service/activity/cancelEnrollActivity', koaBody, systemController.serviceController.activityController.cancelEnrollActivity)
    // 11-29 11:09------文档对到这
    // system -- service -- announcement
    .get('/api/system/service/announcement/getAnnouncementList', systemController.serviceController.announcementController.getAnnouncementList)
    .get('/api/system/service/announcement/getAnnouncementInfo', systemController.serviceController.announcementController.getAnnouncementInfo)
    // system -- service -- report
    .post('/api/system/service/report/submitReport', koaBody, systemController.serviceController.reportController.submitReport)
    // system -- service -- suggestion
    .post('/api/system/service/suggestion/submitSuggestion', koaBody, systemController.serviceController.suggestionController.submitSuggestion)
    .get('/api/system/service/suggestion/getSuggestionList', systemController.serviceController.suggestionController.getSuggestionList)
    .get('/api/system/service/suggestion/getSuggestionInfo', systemController.serviceController.suggestionController.getSuggestionInfo)
    // system -- service -- frequently phone
    .get('/api/system/service/frequentlyPhone/getFrequentlyPhoneList', systemController.serviceController.frequentlyPhoneController.getFrequentlyPhoneList)
    // system -- life
    // system -- life -- coupon
    .get('/api/system/life/coupon/getCouponList', systemController.lifeController.getCouponList)
    .patch('/api/system/life/coupon/receiveCoupon', koaBody, systemController.lifeController.receiveCoupon)

    .get('/api/system/life/coupon/userWaterListGet', systemController.lifeController.userWaterListGet)
    //水电列表获取
    .get('/api/system/life/coupon/userPropertyListGet', systemController.lifeController.userPropertyListGet)
    //物业费获取
    // mall part
    // mall -- mall
    .get('/api/mall/mall/getMerchandiseList', mallController.mallController.getMerchandiseList)
    .get('/api/mall/mall/getMerchandiseInfo', mallController.mallController.getMerchandiseInfo)
    .get('/api/mall/mall/getTogetherDetails', mallController.mallController.getTogetherDetails)
    .get('/api/mall/mall/getTogetherTable', mallController.mallController.getTogetherTable)
    .get('/api/mall/mall/getRecommendInfo', mallController.mallController.getRecommendInfo)
    .get('/api/mall/mall/getGoodsList', mallController.mallController.getGoodsList)

    .post('/api/mall/mall/payBillOrder', koaBody, mallController.mallController.payBillOrder)
    //物业费创建账单
    .post('/api/mall/mall/createBillOrder', koaBody, mallController.mallController.createBillOrder)
    //物业费支付账单

    .get('/api/mall/mall/getCouponList', mallController.mallController.getCouponList)
    .post('/api/mall/mall/createOrder', koaBody, mallController.mallController.createOrder)
    .get('/api/mall/mall/getOrderInfo', mallController.mallController.getOrderInfo)
    .post('/api/mall/mall/payOrder', koaBody, mallController.mallController.payOrder)
    .post('/api/mall/mall/payOrderByCmb', koaBody, mallController.mallController.payOrderByCmb)
    // mall -- person
    .get('/api/mall/person/orderListInit', mallController.personController.orderListInit)
    .get('/api/mall/person/getOrderList', mallController.personController.getOrderList)
    .get('/api/mall/person/getOrderInfo', mallController.personController.getOrderInfo)
    .patch('/api/mall/person/cancelOrder', koaBody, mallController.personController.cancelOrder)
    .patch('/api/mall/person/confirmReceipt', koaBody, mallController.personController.confirmReceipt)


    .post('/api/mall/person/generateTogetherForm', koaBody, mallController.personController.generateTogetherForm)

    .post('/api/mall/person/generateSingleForm',koaBody,mallController.personController.generateSingleForm)



    // 11-29 11:58------文档对到这
    
    // manage system part
    // manage system -- login
    .del('/api/manageSystem/login/clearSession', manageSystemController.loginController.clearSession)
    .get('/api/manageSystem/login/getBackgroundImg', manageSystemController.loginController.getBackgroundImg)
    .get('/api/manageSystem/login/getParkList', manageSystemController.loginController.getParkList)
    .post('/api/manageSystem/login/login', koaBody, manageSystemController.loginController.login)
    .post('/api/manageSystem/login/loginPc', koaBody, manageSystemController.loginController.loginPc)
    // manage system -- system
    .get('/api/manageSystem/system/checkSession', manageSystemController.systemController.checkSession)
    .get('/api/manageSystem/system/checkParkSession', manageSystemController.systemController.checkParkSession)
    .get('/api/manageSystem/system/getParkList', manageSystemController.systemController.getParkList)
    .post('/api/manageSystem/system/choosePark', koaBody, manageSystemController.systemController.choosePark)
    .patch('/api/manageSystem/system/changePassword', koaBody, manageSystemController.systemController.changePassword)
    .post('/api/manageSystem/system/getSmsCode', koaBody, manageSystemController.systemController.getSmsCode)
    .patch('/api/manageSystem/system/changeCellphone', koaBody, manageSystemController.systemController.changeCellphone)
    .get('/api/manageSystem/system/getIndexInfo', manageSystemController.systemController.getIndexInfo)
    .get('/api/manageSystem/system/getMyRepairmentCount', manageSystemController.systemController.getMyRepairmentCount)
    .get('/api/manageSystem/system/getMyReportCount', manageSystemController.systemController.getMyReportCount)
    .get('/api/manageSystem/system/getMyComplaintCount', manageSystemController.systemController.getMyComplaintCount)
    .get('/api/manageSystem/system/getRepairmentCsr', manageSystemController.systemController.getRepairmentCsr)
    .get('/api/manageSystem/system/getFunctionProportion', manageSystemController.systemController.getFunctionProportion)
    // manage system -- system -- property
    // manage system -- system -- property -- repairment
    .get('/api/manageSystem/system/property/repairment/getRepairmentList', manageSystemController.systemController.propertyController.repairmentController.getRepairmentList)
    .get('/api/manageSystem/system/property/repairment/getRepairmentInfo', manageSystemController.systemController.propertyController.repairmentController.getRepairmentInfo)
    .get('/api/manageSystem/system/property/repairment/getRepairManList', manageSystemController.systemController.propertyController.repairmentController.getRepairManList)
    .patch('/api/manageSystem/system/property/repairment/approveRepairment', koaBody, manageSystemController.systemController.propertyController.repairmentController.approveRepairment)
    .patch('/api/manageSystem/system/property/repairment/finishRepairment', koaBody, manageSystemController.systemController.propertyController.repairmentController.finishRepairment)
    // manage system -- system -- property -- complaint
    .get('/api/manageSystem/system/property/complaint/getComplaintList', manageSystemController.systemController.propertyController.complaintController.getComplaintList)
    .get('/api/manageSystem/system/property/complaint/getComplaintInfo', manageSystemController.systemController.propertyController.complaintController.getComplaintInfo)
    .get('/api/manageSystem/system/property/complaint/getAppointTaskManagerList', manageSystemController.systemController.propertyController.complaintController.getAppointTaskManagerList)
    .del('/api/manageSystem/system/property/complaint/deleteComplaint', manageSystemController.systemController.propertyController.complaintController.deleteComplaint)
    .patch('/api/manageSystem/system/property/complaint/finishComplaint', koaBody, manageSystemController.systemController.propertyController.complaintController.finishComplaint)
    .patch('/api/manageSystem/system/property/complaint/changeComplaintType', koaBody, manageSystemController.systemController.propertyController.complaintController.changeComplaintType)
    .patch('/api/manageSystem/system/property/complaint/appointTask', koaBody, manageSystemController.systemController.propertyController.complaintController.appointTask)
    // manage system -- system -- property -- activity
    .get('/api/manageSystem/system/property/activity/getActivityList', manageSystemController.systemController.propertyController.activityController.getActivityList)
    .get('/api/manageSystem/system/property/activity/getActivityInfo', manageSystemController.systemController.propertyController.activityController.getActivityInfo)
    .get('/api/manageSystem/system/property/activity/getActivityEnrollList', manageSystemController.systemController.propertyController.activityController.getActivityEnrollList)
    .post('/api/manageSystem/system/property/activity/addActivity', koaBody, manageSystemController.systemController.propertyController.activityController.addActivity)
    .patch('/api/manageSystem/system/property/activity/editActivity', koaBody, manageSystemController.systemController.propertyController.activityController.editActivity)
    .get('/api/manageSystem/system/property/actiity/exportEnrollList', manageSystemController.systemController.propertyController.activityController.exportEnrollList)
    // manage system -- system -- property -- announcement
    .get('/api/manageSystem/system/property/announcement/getAnnouncementList', manageSystemController.systemController.propertyController.announcementController.getAnnouncementList)
    .get('/api/manageSystem/system/property/announcement/getAnnouncementInfo', manageSystemController.systemController.propertyController.announcementController.getAnnouncementInfo)
    .post('/api/manageSystem/system/property/announcement/addAnnouncement', koaBody, manageSystemController.systemController.propertyController.announcementController.addAnnouncement)
    .patch('/api/manageSystem/system/property/announcement/editAnnouncement', koaBody, manageSystemController.systemController.propertyController.announcementController.editAnnouncement)
    .del('/api/manageSystem/system/property/announcement/deleteAnnouncement', manageSystemController.systemController.propertyController.announcementController.deleteAnnouncement)
    // manage system -- system -- property -- report
    .get('/api/manageSystem/system/property/report/getReportList', manageSystemController.systemController.propertyController.reportController.getReportList)
    .get('/api/manageSystem/system/property/report/getReportInfo', manageSystemController.systemController.propertyController.reportController.getReportInfo)
    .patch('/api/manageSystem/system/property/report/finishReport', koaBody, manageSystemController.systemController.propertyController.reportController.finishReport)
    .get('/api/manageSystem/system/property/report/getAppointTaskManagerList', manageSystemController.systemController.propertyController.reportController.getAppointTaskManagerList)
    .patch('/api/manageSystem/system/property/report/appointTask', koaBody, manageSystemController.systemController.propertyController.reportController.appointTask)
    // manage system -- system -- property -- suggestion
    .get('/api/manageSystem/system/property/suggestion/getSuggestionList', manageSystemController.systemController.propertyController.suggestionController.getSuggestionList)
    .get('/api/manageSystem/system/property/suggestion/getSuggestionInfo', manageSystemController.systemController.propertyController.suggestionController.getSuggestionInfo)
    .get('/api/manageSystem/system/property/suggestion/getAppointTaskManagerList', manageSystemController.systemController.propertyController.suggestionController.getAppointTaskManagerList)
    .patch('/api/manageSystem/system/property/suggestion/appointTask', koaBody, manageSystemController.systemController.propertyController.suggestionController.appointTask)
    .patch('/api/manageSystem/system/property/suggestion/answerSuggestion', koaBody, manageSystemController.systemController.propertyController.suggestionController.answerSuggestion)
    
    /************************************************ 文档到此为止 **************************************/
    // manage system -- system -- property -- room
    .post('/api/manageSystem/system/property/room/importRoomList', koaBody, manageSystemController.systemController.propertyController.roomController.importRoomList)
    .get('/api/manageSystem/system/property/room/getRoomList', manageSystemController.systemController.propertyController.roomController.getRoomList)
    .patch('/api/manageSystem/system/property/room/editHostInfo', koaBody, manageSystemController.systemController.propertyController.roomController.editHostInfo)
     // manage system -- system -- property -- payment
     .get('/api/manageSystem/system/property/payment/getPropertyList', manageSystemController.systemController.propertyController.paymentController.getPropertyList)   
     .get('/api/manageSystem/system/property/payment/getWaterList', manageSystemController.systemController.propertyController.paymentController.getWaterList)   
     .get('/api/manageSystem/system/property/payment/payRuleinit', manageSystemController.systemController.propertyController.paymentController.payRuleinit)   
     .get('/api/manageSystem/system/property/payment/propertyDetail', manageSystemController.systemController.propertyController.paymentController.propertyDetail)   
     .get('/api/manageSystem/system/property/payment/waterDetail', manageSystemController.systemController.propertyController.paymentController.waterDetail)   
     .post('/api/manageSystem/system/property/payment/payRulesave', koaBody, manageSystemController.systemController.propertyController.paymentController.payRulesave)   
     .post('/api/manageSystem/system/property/payment/propertyDetailEdit', koaBody, manageSystemController.systemController.propertyController.paymentController.propertyDetailEdit)   
     .post('/api/manageSystem/system/property/payment/waterDetailEdit', koaBody, manageSystemController.systemController.propertyController.paymentController.waterDetailEdit)   
     .post('/api/manageSystem/system/property/payment/waterMoneyEdit', koaBody, manageSystemController.systemController.propertyController.paymentController.waterMoneyEdit)   
     .post('/api/manageSystem/system/property/payment/importPropertyList', koaBody, manageSystemController.systemController.propertyController.paymentController.importPropertyList)   
     .post('/api/manageSystem/system/property/payment/importWaterList', koaBody, manageSystemController.systemController.propertyController.paymentController.importWaterList)   
     .post('/api/manageSystem/system/property/payment/downTemplate', koaBody, manageSystemController.systemController.propertyController.paymentController.downTemplate)   
     .post('/api/manageSystem/system/property/payment/downPropertyAll', koaBody, manageSystemController.systemController.propertyController.paymentController.downPropertyAll)   
     .post('/api/manageSystem/system/property/payment/downWaterAll', koaBody, manageSystemController.systemController.propertyController.paymentController.downWaterAll)   
     .post('/api/manageSystem/system/property/payment/downPropertySin', koaBody, manageSystemController.systemController.propertyController.paymentController.downPropertySin)   
     .post('/api/manageSystem/system/property/payment/downWaterSin', koaBody, manageSystemController.systemController.propertyController.paymentController.downWaterSin)   
     .get('/api/manageSystem/system/property/payment/waterLeft', manageSystemController.systemController.propertyController.paymentController.waterLeft)   
     .post('/api/manageSystem/system/property/payment/waterLeftEdit', koaBody, manageSystemController.systemController.propertyController.paymentController.waterLeftEdit)  
    // manage system -- system -- property -- frequently phone
    .get('/api/manageSystem/system/property/frequentlyPhone/getFrequentlyPhoneList', manageSystemController.systemController.propertyController.frequentlyPhoneController.getFrequentlyPhoneList)
    .post('/api/manageSystem/system/property/frequentlyPhone/addFrequentlyPhoneGroup', koaBody, manageSystemController.systemController.propertyController.frequentlyPhoneController.addFrequentlyPhoneGroup)
    .del('/api/manageSystem/system/property/frequentlyPhone/deleteFrequentlyPhoneGroup', manageSystemController.systemController.propertyController.frequentlyPhoneController.deleteFrequentlyPhoneGroup)
    .post('/api/manageSystem/system/property/frequentlyPhone/addFrequentlyPhoneContact', koaBody, manageSystemController.systemController.propertyController.frequentlyPhoneController.addFrequentlyPhoneContact)
    .patch('/api/manageSystem/system/property/frequentlyPhone/editFrequentlyPhoneGroup', koaBody, manageSystemController.systemController.propertyController.frequentlyPhoneController.editFrequentlyPhoneGroup)
    .patch('/api/manageSystem/system/property/frequentlyPhone/editFrequentlyPhoneContact', koaBody, manageSystemController.systemController.propertyController.frequentlyPhoneController.editFrequentlyPhoneContact)
    .del('/api/manageSystem/system/property/frequentlyPhone/deleteFrequentlyPhoneContact', manageSystemController.systemController.propertyController.frequentlyPhoneController.deleteFrequentlyPhoneContact)
    .get('/api/manageSystem/system/property/frequentlyPhone/getFrequentlyPhoneListInfo', manageSystemController.systemController.propertyController.frequentlyPhoneController.getFrequentlyPhoneListInfo)
    
    // manage system -- system -- mall
    // manage system -- system -- mall -- merchandise
    // manage system -- system -- mall -- merchandise -- merchandise

    
    
    .get('/api/manageSystem/system/mall/merchandise/merchandise/getUserCount', manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.getUserCount)
   

    .patch('/api/manageSystem/system/mall/merchandise/merchandise/setTogetherInfo', koaBody,manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.setTogetherInfo)



    .patch('/api/manageSystem/system/mall/merchandise/merchandise/cancelGroup', koaBody,manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.cancelGroup)



    .get('/api/manageSystem/system/mall/merchandise/merchandise/getAloneInfo',manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.getAloneInfo)

    .get('/api/manageSystem/system/mall/merchandise/merchandise/getTogetherInfo',manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.getTogetherInfo)

    .get('/api/manageSystem/system/mall/merchandise/merchandise/getTogetherDetails',manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.getTogetherDetails)

    .patch('/api/manageSystem/system/mall/merchandise/merchandise/forceGroup',koaBody,manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.forceGroup)

    .patch('/api/manageSystem/system/mall/merchandise/merchandise/goodsUpDown',koaBody,manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.goodsUpDown)



   





















    .get('/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseList', manageSystemController.systemController.mallController.merchandiseController.merchandiseController.getMerchandiseList)
    .get('/api/manageSystem/system/mall/merchandise/merchandise/getMerchandiseInfo', manageSystemController.systemController.mallController.merchandiseController.merchandiseController.getMerchandiseInfo)
    .patch('/api/manageSystem/system/mall/merchandise/merchandise/editMerchandise', koaBody, manageSystemController.systemController.mallController.merchandiseController.merchandiseController.editMerchandise)
    .post('/api/manageSystem/system/mall/merchandise/merchandise/addMerchandise', koaBody, manageSystemController.systemController.mallController.merchandiseController.merchandiseController.addMerchandise)
    .get('/api/manageSystem/system/mall/merchandise/merchandise/getTypeList', manageSystemController.systemController.mallController.merchandiseController.merchandiseController.getTypeList)
    // manage system -- system -- mall -- merchandise -- group purchase
    .post('/api/manageSystem/system/mall/merchandise/groupPurchase/createGroupPurchase', koaBody, manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.createGroupPurchase)
    .post('/api/manageSystem/system/mall/merchandise/groupPurchase/editGroupPurchase', koaBody, manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.editGroupPurchase)
    //.get('/api/manageSystem/system/mall/merchandise/groupPurchase/getGroupPurchaseList', manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.getGroupPurchaseList)
    .get('/api/manageSystem/system/mall/merchandise/groupPurchase/exportOrder', manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.exportOrder)

    .get('/api/manageSystem/system/mall/merchandise/groupPurchase/exportSingleOrder', manageSystemController.systemController.mallController.merchandiseController.groupPurchaseController.exportSingleOrder)



    // manage system -- system -- mall -- coupon
    .get('/api/manageSystem/system/mall/coupon/getCouponList', manageSystemController.systemController.mallController.couponController.getCouponList)
    .post('/api/manageSystem/system/mall/coupon/createCoupon', koaBody, manageSystemController.systemController.mallController.couponController.createCoupon)
    .del('/api/manageSystem/system/mall/coupon/deleteCoupon', manageSystemController.systemController.mallController.couponController.deleteCoupon)
    // manage system -- system -- mall -- order
    .get('/api/manageSystem/system/mall/order/getOrderList', manageSystemController.systemController.mallController.orderController.getOrderList)
    .post('/api/manageSystem/system/mall/order/importOrder', koaBody, manageSystemController.systemController.mallController.orderController.importOrder)















    //.get('/api/manageSystem/system/mall/order/exportSingleOrder', manageSystemController.systemController.mallController.orderController.exportSingleOrder)
    














    
    // manager system -- system -- manager
    // manager system -- system -- manager -- manager
    .get('/api/manageSystem/system/manager/manager/getManagerList', manageSystemController.systemController.managerController.managerController.getManagerList)
    .get('/api/manageSystem/system/manager/manager/getSimpleManagerList', manageSystemController.systemController.managerController.managerController.getSimpleManagerList)
    .post('/api/manageSystem/system/manager/manager/addManager', koaBody, manageSystemController.systemController.managerController.managerController.addManager)
    .get('/api/manageSystem/system/manager/manager/getManagerInfo', manageSystemController.systemController.managerController.managerController.getManagerInfo)
    .get('/api/manageSystem/system/manager/manager/getSimpleDepartmentList', manageSystemController.systemController.managerController.managerController.getSimpleDepartmentList)
    .post('/api/manageSystem/system/manager/manager/addManagerDepartment', koaBody, manageSystemController.systemController.managerController.managerController.addManagerDepartment)
    .post('/api/manageSystem/system/manager/manager/setAsParkManager', koaBody, manageSystemController.systemController.managerController.managerController.setAsParkManager)
    .delete('/api/manageSystem/system/manager/manager/removeManagerDepartment', manageSystemController.systemController.managerController.managerController.removeManagerDepartment)
    .patch('/api/manageSystem/system/manager/manager/editManager', koaBody, manageSystemController.systemController.managerController.managerController.editManager)
    .patch('/api/manageSystem/system/manager/manager/resetPassword', koaBody, manageSystemController.systemController.managerController.managerController.resetPassword)
    .patch('/api/manageSystem/system/manager/manager/lockManager', koaBody, manageSystemController.systemController.managerController.managerController.lockManager)
    .patch('/api/manageSystem/system/manager/manager/unlockManager', koaBody, manageSystemController.systemController.managerController.managerController.unlockManager)
    // manager system -- system -- manager -- logs
    .get('/api/manageSystem/system/manager/logs/getLogsList', manageSystemController.systemController.managerController.logsController.getLogsList)
    // manager system -- system -- manager -- building
    .get('/api/manageSystem/system/manager/building/getBuildingList', manageSystemController.systemController.managerController.buildingController.getBuildingList)
    .patch('/api/manageSystem/system/manager/building/distributeBuildingManager', koaBody, manageSystemController.systemController.managerController.buildingController.distributeBuildingManager)
    // manage system -- system -- manager -- department
    .get('/api/manageSystem/system/manager/department/getDepartmentList', manageSystemController.systemController.managerController.departmentController.getDepartmentList)
    .get('/api/manageSystem/system/manager/department/getPermissionsList', manageSystemController.systemController.managerController.departmentController.getPermissionsList)
    .post('/api/manageSystem/system/manager/department/addDepartment', koaBody, manageSystemController.systemController.managerController.departmentController.addDepartment)
    .post('/api/manageSystem/system/manager/department/editDepartment', koaBody, manageSystemController.systemController.managerController.departmentController.editDepartment)
    .del('/api/manageSystem/system/manager/department/deleteDepartment', manageSystemController.systemController.managerController.departmentController.deleteDepartment)
    .get('/api/manageSystem/system/manager/department/getDepartmentInfo', manageSystemController.systemController.managerController.departmentController.getDepartmentInfo)
    // manager system -- system -- system -- access
    .get('/api/manageSystem/system/system/access/getAccessLogsList', manageSystemController.systemController.systemController.logsController.getLogsList)
    .get('/api/manageSystem/system/system/exception/getExceptionLogsList', manageSystemController.systemController.systemController.exceptionController.getLogsList)
    .get('/api/manageSystem/system/system/sms/getSmsList', manageSystemController.systemController.systemController.smsController.getSmsList)
    .get('/api/manageSystem/system/system/park/getParkList', manageSystemController.systemController.systemController.parkController.getParkList)
    .post('/api/manageSystem/system/system/park/addPark', koaBody, manageSystemController.systemController.systemController.parkController.addPark)
    // manager system -- system -- user -- operationLogs
    .get('/api/manageSystem/system/user/operationLogs/getLogsList', manageSystemController.systemController.userController.operationLogsController.getLogsList)
    .get('/api/manageSystem/system/user/activityUser/getActivityUser', manageSystemController.systemController.userController.activityUserController.getActivityUser)
    .get('/api/manageSystem/system/user/userStatistics/getUserStatistics', manageSystemController.systemController.userController.userStatisticsController.getUserStatistics)
    .get('/api/manageSystem/system/user/functionStatistics/getFunctionStatistics', manageSystemController.systemController.userController.functionStatisticsController.getFunctionStatistics)
    .get('/api/manageSystem/system/user/functionStatistics/getRepairmentCharts', manageSystemController.systemController.userController.functionStatisticsController.getRepairmentCharts)
    .get('/api/manageSystem/system/user/functionStatistics/getComplaintCharts', manageSystemController.systemController.userController.functionStatisticsController.getComplaintCharts)
    .get('/api/manageSystem/system/user/functionStatistics/getReportCharts', manageSystemController.systemController.userController.functionStatisticsController.getReportCharts)
    .get('/api/manageSystem/system/user/functionStatistics/getSuggestionCharts', manageSystemController.systemController.userController.functionStatisticsController.getSuggestionCharts)
    .get('/api/manageSystem/system/user/functionStatistics/getActivityCharts', manageSystemController.systemController.userController.functionStatisticsController.getActivityCharts)
    // manage system -- system -- feedback
    .get('/api/manageSystem/system/feedback/getFeedbackList', manageSystemController.systemController.feedbackController.getFeedbackList)
    .get('/api/manageSystem/system/feedback/getFeedbackInfo', manageSystemController.systemController.feedbackController.getFeedbackInfo)
    
    
    ;

module.exports = router;