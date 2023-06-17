# API
## Bot
Simple bot server. Basically handles your webserver events and parses the request body into more useful data.

### Methods
#### `constructor(options)`
Creates a new bot instance, with the specified options (optional).

Options:
- poeSettings.
  - `poeSettings.contextWindowClearSecs` - The number of seconds to wait before clearing the context window. Default: null (disabled).
  - `poeSettings.allowUserContextClear` - Whether or not to allow users to clear the context window. Default: true.

Examples:
```js
// Create a new bot instance with default options
const bot = new Bot();

// Create a new bot instance with custom options
const bot = new Bot({
  poeSettings: {
    contextWindowClearSecs: 60,
    allowUserContextClear: false
  }
});
```

#### `start(port = 3000, authKey = null)`
Starts the bot server on the specified port.

Examples:
```js
// Start the bot server on port 3000 (default)
bot.start();

// Start the bot server on port 8080
bot.start(8080);

// Start the bot server on port 8080, with an auth key that must be sent in the request.
bot.start(8080, '32-char-auth-key-stored-securely');
```

### Events
#### `start`
Fired when the bot server has started.

Example:
```js
bot.on('start', () => {
  console.log('Bot server started');
});
```

#### `query`
Fired when a query is received from the client. Query is passed in as a query object.

Example:
```js
// Send a message back to the client
bot.on('query', (message) => {
  message.text("Hello world");
  message.done();
});

// Access the query data
bot.on('query', (queryData) => {
  console.log('Last message was:', queryData.query[query.length - 1].content);
});
```

#### `error`
Fired when an error occurs and was sent by the Poe server. Error message and metadata are passed in.

Example:
```js
bot.on('error', (message, metadata) => {
  console.log('Error:', message);
  console.log('Metadata:', metadata);
});
```

#### `feedback
Fired when feedback is received from the client. Feedback is passed in as a feedback object.

Example:
```js
bot.on('feedback', (feedback) => {
  console.log('Someone gave your message a ' + feedback.type);
});
```

## Query
Query object passed in to the `query` event. Contains the query data and methods to send a response.

### Properties
#### `req`
Allows you to access the original request object.

#### `res`
Allows you to access the original response object.

#### `query`
An array of message objects.

#### `id`
The id of the response that would be sent by the bot.

#### `user`
The user object of the user that sent the query.

#### `conversation`
The conversation object of the conversation that the query was sent in.

#### `createdAt`
The date that the query was created.

#### `timestamp`
The timestamp that the query was created.

### Methods
#### `meta(options)`
Sets the metadata of the query response. Metadata is passed in as an object.

Example:
```js
// Set metas to default values
query.meta();

// Set metas to custom values
query.meta({
  'content_type': 'text/plain',
});
```

#### `text(content)`
Sends a partial text response to the query. Content is passed in as a string.

Example:
```js
// Send a partial text response
query.text('Hello ');
// Send another partial text response
query.text('world');
```

#### `replaceResponse(content)`
Replaces the entire response with the specified content. Content is passed in as a string.

Example:
```js
// Replace the entire response
query.replaceResponse('Goodbye world (very dark)');
```

#### `suggestedReply(content)`
Adds a suggested reply to the query. Content is passed in as a string.

Example:
```js
// Add a suggested reply
query.suggestedReply('How are you doing today?');
// This can be called multiple times to add multiple suggested replies
query.suggestedReply('What is your favorite color?');
query.suggestedReply('What is your favorite food?');
query.suggestedReply('Is ThunderRedStar the best developer?');
```

#### `error(content)`
Sends an error response to the query, and then stops the connection. Content is passed in as a string.

Example:
```js
// Send an error response
query.error('I don\'t want to speak with you anymore.');
```

#### `done()`
Stops the connection. This must be called after sending a non-error response.

Example:
```js
// Send the response
query.done();
```

## Feedback
Feedback object passed in to the `feedback` event. Contains the feedback data.

### Properties
#### `type`
The type of feedback. Can be one of the following:
- `like`
- `dislike`

#### `reason`
The reason for the feedback. Sent inconsistently by the Poe server so don't rely on this.

#### `message`
Message object. For now, contains nothing but the message id.

#### `user`
User object. For now, contains nothing but the user id.

#### `conversation`
Conversation object. For now, contains nothing but the conversation id.

## Message
Message object, which contains individual message data.

### Properties
#### `messageId`
The id of the message.

#### `role`
The role of the message. Can be one of the following:
- `user`
- `bot`
- `system`

#### `content`
The content of the message.

#### `contentType`
The content type of the message. Can be one of the following:
- `text/plain`
- `text/markdown`

#### `timestamp`
The timestamp of the message.

#### `createdAt`
The date that the message was created, converted from timestamp.

#### `feedback`
An array of feedback objects. Does not contain conversation or user objects.

#### `attachments`
An array of attachment objects. Poe does not detail this in their documentation but I'm keeping it here because it's in 
the response. Will always be an empty array.

## User
User object, which contains user data.

### Properties
#### `id`
The id of the user.

## Conversation
Conversation object, which contains conversation data.

### Properties
#### `id`
The id of the conversation.