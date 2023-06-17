const Poe = require('../src/index.js');
const dotenv = require('dotenv');
dotenv.config();

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const bot = new Poe.Bot(
	{
		"poeSettings": {
			"contextWindowClearSecs": 60,
			"allowUserContextClear": true,
		}
	});

bot.on('query', async (message) => {
	let messageString = `I agree with your statement, "${message.query[message.query.length - 1].content}".`;

	// Split into letters, so we can simulate typing
	let letters = messageString.split('');
	for (let i = 0; i < letters.length; i += 3) {
		// Send the letter
		message.text(letters[i] + (letters[i + 1] || '') + (letters[i + 2] || ''));
		// Sleep for 100ms
		await sleep(100);
	}

	message.done();
});

bot.on('feedback', (feedback) => {
	console.log("User " + feedback.type + "d some message");
});

bot.on('error', (message, metadata) => {
	console.error("You are a dumb programmer lol");
	console.error(message);
	console.error(metadata);
})

bot.on('start', () => {
	console.log('Bot started.');
});

bot.start(process.env.PORT, process.env.AUTH_KEY);