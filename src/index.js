const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { EventEmitter } = require('events');

class Bot {
	/**
	 * Constructor for Poe Protocol Wrapper.
	 * @param {number} port - Port to listen on. Default is 3000.
	 * @param {object} options - Options for the Poe Wrapper. Options are poeSettings, and expressSettings.
	 */
	constructor(options = {}) {
		this.options = options;
		this.app = express();
		this.eventEmitter = new EventEmitter();
		this.authKey = null;

		// TODO: this is useless so lets make it useful
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));

		// Find routes in routes folder
		const routes = require('./routes/index.js');

		// Add base route, and we will determine the route from the body (in the type field)
		this.app.post('/', (req, res) => {
			// If no version field, return 400
			if (!req.body.version) {
				return res.status(400).send({
					error: 'No version field provided.'
				});
			}

			// If no type field, return 400
			if (!req.body.type) {
				return res.status(400).send({
					error: 'No type field provided.'
				});
			}

			// If no route for type (it's a dict so check the keys), return 501
			if (!Object.keys(routes).includes(req.body.type)) {
				return res.status(501).send({
					error: 'No route for type provided.'
				});
			}

			// Ignore if auth key is set and not equal to the auth key.
			// It doesn't seem like Poe is using this so we can ignore it (you'd expect better from Quora but whatever)
			if (this.authKey && req.body.auth_key !== this.authKey) {
				/*
				return res.status(401).send({
					error: 'Invalid auth key.'
				});
				 */
			}

			// Determine route from type
			const route = routes[req.body.type];

			// Run handler for route
			route.handler(req, res, this);
		});
	}

	start(port = 3000, authKey) {
		// If no auth key, return error
		if (!authKey) {
			throw new Error('No auth key provided.');
		}

		// Set the auth key
		this.authKey = authKey;

		// If no port, return error
		if (!port) {
			throw new Error('No port provided.');
		}

		// Start the server
		this.app.listen(port, () => {
			// Emit the start event
			this.eventEmitter.emit('start');
		});
	}

	on(event, callback) {
		this.eventEmitter.on(event, callback);
	}
}

module.exports = {
	Bot
}