module.exports = {
	name: 'report_feedback',
	handler: (req, res, bot) => {
		// Get the message ID, user ID, conversation ID, and feedback type from the request body
		const body = req.body;

		// Emit the reportFeedback event with a new Feedback object. No idea why reason isn't passed as body here but sent in query.
		const Feedback = require('../types/Feedback');
		const feedback = new Feedback(body.feedback_type, null, body.message_id, body.user_id, body.conversation_id);

		// Emit the reportFeedback event with the feedback object
		bot.eventEmitter.emit('feedback', feedback);
	}
}