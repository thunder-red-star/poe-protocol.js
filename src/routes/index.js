const queryRoute = require('./query');
const settingsRoute = require('./settings');
const reportFeedbackRoute = require('./reportFeedback');
const reportErrorRoute = require('./reportError');

module.exports = {
		'query': queryRoute,
		'settings': settingsRoute,
		'report_feedback': reportFeedbackRoute,
		'report_error': reportErrorRoute
}