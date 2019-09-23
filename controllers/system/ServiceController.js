const repairmentController = require('./service/RepairmentController');
const complaintController = require('./service/ComplaintController');
const activityController = require('./service/ActivityController');
const announcementController = require('./service/AnnouncementController');
const reportController = require('./service/ReportController');
const suggestionController = require('./service/SuggestionController');
const frequentlyPhoneController = require('./service/FrequentlyPhoneController');

module.exports = {
    repairmentController,
    complaintController,
    activityController,
    announcementController,
    reportController,
    suggestionController,
    frequentlyPhoneController
}