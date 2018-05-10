const mongoose = require('mongoose');
const config = require('./config');

const MONGO_URL = config.serverUrl + config.dbName;

// Set mongoose to use Promises
mongoose.Promise = global.Promise;

// Try connecting, or create a connection...
try {
	mongoose.connect(MONGO_URL);
} catch (err) {
	mongoose.createConnection(MONGO_URL);
}

// Tell me what happens
mongoose.connection
	.once('open', () => console.log('--MongoDB Running--'))
	.on('error', e => {
		throw e;
	});