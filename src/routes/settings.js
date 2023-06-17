const snakeCaseString = require('../utils/snakeCase.js');

module.exports = {
	name: 'settings',
	handler: (req, res, bot) => {
		// Respond with a 200 and application/json. This is not SSE, this is a normal request.
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		// Send the settings object, but with snake_case keys
		snakeCaseSettings = {};
		for (const key in bot.options.poeSettings) {
			snakeCaseSettings[snakeCaseString(key)] = bot.options.poeSettings[key];
		}

		res.end(JSON.stringify(snakeCaseSettings));
	}
}