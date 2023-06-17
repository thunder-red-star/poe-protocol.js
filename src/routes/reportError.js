module.exports = {
	name: 'report_error',
	handler: (req, res, bot) => {
		const body = req.body;

		bot.eventEmitter.emit('error', body.message, body.metadata);
	}
}