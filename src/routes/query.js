const Query = require('../types/Query');

module.exports = {
	name: 'query',
	handler: (req, res, bot) => {
		// Extract the query from the request body
		const body = req.body;

		// Create a new Query object
		const queryObject = new Query(req, res, body.query, body.message_id, body.user_id, body.conversation_id);

		// Emit the query event
		bot.eventEmitter.emit('query', queryObject);
	}
}