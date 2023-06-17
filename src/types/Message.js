const Feedback = require("./Feedback");

class Message {
	constructor(messageId, role = null, content = null, contentType = null, timestamp = null, feedback = null, attachments = null) {
		this.role = role;
		this.content = content;
		this.contentType = contentType;
		// No idea why they send the timestamp in microseconds
		this.timestamp = Math.round(timestamp / 10);
		this.createdAt = new Date(this.timestamp);
		this.id = messageId;
		// Avoid circular import issues and "Message is not a constructor" errors
		const Feedback = require('./Feedback');
		this.feedback = (feedback ? feedback.map((feedback) => new Feedback(feedback.type, feedback.reason, messageId, null, null)) : null)
		// it's in the protocol but not covered in the detailed spec so idk I'm just gonna leave it here
		this.attachments = attachments;
	}
}

module.exports = Message;