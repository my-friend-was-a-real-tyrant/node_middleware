// 个人中心模块
const myFamilyController = require('./personalCenter/MyFamilyController');
const myRepairmentController = require('./personalCenter/MyRepairmentController');
const myCouponController = require('./personalCenter/MyCouponController');
const myReportController = require('./personalCenter/MyReportController');
const editPersonalInfoController = require('./personalCenter/EditPersonalInfoController');

module.exports = {
    myFamilyController,
    myRepairmentController,
    myCouponController,
    myReportController,
    editPersonalInfoController
};