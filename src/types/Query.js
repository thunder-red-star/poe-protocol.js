// Query type (from query)
const User = require('./User.js');
const Conversation = require('./Conversation.js');
const Message = require('./Message.js');
const snakeCaseString = require('../utils/snakeCase.js');


class Query {
	/**
	 * Represents a query from Poe.
	 * @param {Express.Request} req - The Express request object.
	 * @param {Express.Response} res - The Express response object.
	 * @param {Object[]} query - The query object from Poe.
	 * @param {string} messageId - The ID of the message.
	 * @param {string} userId - The ID of the user.
	 * @param {string} conversationId - The ID of the conversation.
	 */
	constructor(req, res, query, messageId, userId, conversationId) {
		this.req = req;
		this.res = res;
		this.query = query.map((message) => new Message(message.id, message.role, message.content, message.contentType, message.timestamp, message.feedback));
		this.id = messageId;
		this.user = new User(userId);
		this.conversation = new Conversation(conversationId);
		this.createdAt = new Date();
		this.timestamp = this.createdAt.getTime();
		this.sent = {
			meta: false,
		}

		this.res.writeHead(200, {
			"Connection": "keep-alive",
			"Cache-Control": "no-cache",
			"Content-Type": "text/event-stream",
		});
	}

	/**
	 * Respond to the query with a meta object via server-sent events.
	 * @param {Object} options - The options to send to Poe.
	 * @param {string} options.contentType - The content type to send to Poe. Default is text/markdown.
	 * @param {boolean} options.linkify - Whether or not Poe should automatically add links to the response that generate additional queries to the bot server. Default is false.
	 * @param {boolean} options.suggestedReplies - Whether or not Poe should suggest followup messages to the user that they might want to send to the bot. Default is false.
	 * @param {boolean} options.refetchSettings - Whether or not Poe should refetch the settings from the bot server. Default is false.
	 * @returns {Promise} - A promise that resolves when the meta object is sent to Poe, or rejects if there is an error.
	 */
	meta(options = {}) {
		return new Promise((resolve, reject) => {
			try {
				if (this.sent.meta) {
					return reject(new Error('Meta already sent.'));
				}

				// Convert variable names to snake case
				const snakeCaseOptions = {};
				for (const key in options) {
					snakeCaseOptions[snakeCaseString(key)] = options[key];
				}

				this.res.write(`event: meta\ndata: ${JSON.stringify(snakeCaseOptions)}\n\n`);
				this.sent.meta = true;
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * Respond to the query with a text message via server-sent events.
	 * @param {string} message - The message to send to Poe.
	 * @returns {Promise} - A promise that resolves when the text message is sent to Poe, or rejects if there is an error.
	 */
	text(message) {
		return new Promise((resolve, reject) => {
			try {
				this.res.write(`event: text\ndata: ${JSON.stringify({text: message})}\n\n`);
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * Like text, but completely replaces any old text messages in the response.
	 * @param {string} message - The message to send to Poe.
	 * @returns {Promise} - A promise that resolves when the text message is sent to Poe, or rejects if there is an error.
	 */
	replaceResponse(message) {
		return new Promise((resolve, reject) => {
			try {
				this.res.write(`event: replace_response\ndata: ${JSON.stringify({text: message})}\n\n`);
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * Respond to the query with a suggested reply via server-sent events.
	 * @param {string} message - The suggested reply to send to Poe.
	 * @returns {Promise} - A promise that resolves when the suggested reply is sent to Poe, or rejects if there is an error.
	 */
	suggestedReply(message) {
		return new Promise((resolve, reject) => {
			try {
				this.res.write(`event: suggested_reply\ndata: ${JSON.stringify({text: message})}\n\n`);
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * Respond to the query with an error indicating that the bot server is unavailable via server-sent events.
	 * @param {string} message - The error message to send to Poe.
	 * @param {Object} options - The options to send to Poe.
	 * @param {boolean} options.allowRetry - Whether or not Poe should allow the user to retry the query. Default is true.
	 * @returns {Promise} - A promise that resolves when the error is sent to Poe, or rejects if there is an error while sending the error (lol).
	 */
	error(message, options = { allowRetry: true }) {
		return new Promise((resolve, reject) => {
			try {
				this.res.write(`event: error\ndata: ${JSON.stringify({text: message, allow_retry: options.allowRetry})}\n\n`);
				this.done();
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * Close the connection to Poe.
	 * @returns {Promise} - A promise that resolves when the connection is closed, or rejects if there is an error.
	 */
	done() {
		return new Promise((resolve, reject) => {
			try {
				// First send an event: done message to Poe (data = {})
				this.res.write('event: done\ndata: {}\n\n');
				this.res.end();
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = Query;