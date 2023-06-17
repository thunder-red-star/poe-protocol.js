# Example
```js
const { Bot } = require('poe-protocol')

const bot = new Bot();

bot.on('start', () => {
  console.log('Bot server started');
})

bot.on('query', (query) => {
  bot.text(`You said "${message.query[message.query.length - 1].content}"`);
})

bot.start(3000);
```
