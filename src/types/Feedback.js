const User = require("./User");
const Conversation = require("./Conversation");

class Feedback {
	constructor(type, reason, messageId, userId, conversationId) {
		this.type = type;
		this.reason = reason;
		// Avoid circular import issues and "Message is not a constructor" errors
		const Message = require("./Message");
		this.message = new Message(messageId);
		this.user = new User(userId);
		this.conversation = new Conversation(conversationId);
	}
}

module.exports = Feedback;