require('dotenv').config();
var http = require('http');
var app = require('./api/index');
var normalizePort = require('./utils/normalizePort');
var onError = require('./utils/onError');

/**
 * Module dependencies.
 */



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
