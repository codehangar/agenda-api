'use strict';

try {
  // Loads environment settings from '.env' into process.env
  // This is for local development
  require('dotenv').load();
} catch (e) {
  console.log('.env file not found')
}

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var corsMiddleware = require('./src/middleware/cors.middleware.js');

/** General App Middleware **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(corsMiddleware);

/** Register API Middleware **/
/** Version 1 **/
app.use('/api/v1/docs', express.static('./src/api/v1/_docs'));
app.use('/api/v1', require('./src/api/v1/routes.js'));

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
  console.log('listening on port: %s', port);
});

module.exports = app;
