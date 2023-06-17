# Examples
## Echo
```js
const { Bot } = require('poe-protocol')

const bot = new Bot();

bot.on('start', () => {
  console.log('Bot server started');
});

bot.on('query', (query) => {
  bot.text(`${message.query[message.query.length - 1].content}`);
  bot.done();
});

bot.start(3000);
```

## Time
```js
const { Bot } = require('poe-protocol')

const bot = new Bot();

bot.on('start', () => {
  console.log('Bot server started');
});

bot.on('query', (query) => {
  bot.text(`The time is ${new Date().toLocaleTimeString()}`);
  bot.done();
});

bot.start(3000);
```

## Streaming Responses
```js
const { Bot } = require('poe-protocol')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const bot = new Bot();

bot.on('start', () => {
  console.log('Bot server started');
});

bot.on('query', async (query) => {
  for (let i = 0; i < 10; i++) {
    bot.text(`Message ${i}`);
    await sleep(1000);
  }
  bot.done();
});

bot.start(3000);
```

## Feedback
```js
const { Bot } = require('poe-protocol')

const bot = new Bot();

bot.on('start', () => {
  console.log('Bot server started');
});

bot.on('feedback', (feedback) => {
  console.log('Feedback:', feedback.type);
});

bot.on('query', (query) => {
  bot.text(`Hello world`);
  bot.done();
});

bot.start(3000);
```