# poe-protocol
Simple bot library for Poe (not the game, the chat app) written with Express.js and some other middleware. This library 
is written in CJS, if anyone wants to do an ESM port and open a PR, I will gladly accept it. I am not attributed with 
Quora in any way. This is just a fun project (if you can call it that).

## Installation
```bash
npm install poe-protocol
```

## Quick Start
```javascript
const Poe = require('poe-protocol');

const bot = new Poe.Bot();

bot.on('start', () => {
  console.log('Bot server started');
});

bot.on('query', (query) => {
  bot.text(`Hello world`);
  bot.done();
});

bot.start(3000);
```

## License
MIT