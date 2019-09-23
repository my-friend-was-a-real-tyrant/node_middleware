const repairmentController = require('./property/RepairmentController');
const complaintController = require('./property/ComplaintController');
const roomController = require('./property/RoomController');
const paymentController = require('./property/paymentController');
const activityController = require('./property/ActivityController');
const announcementController = require('./property/AnnouncementController');
const reportController = require('./property/ReportController');
const suggestionController = require('./property/SuggestionController');
const frequentlyPhoneController = require('./property/FrequentlyPhoneController');

module.exports = {
    repairmentController,
    complaintController,
    roomController,
    paymentController,
    activityController,
    announcementController,
    reportController,
    suggestionController,
    frequentlyPhoneController
};