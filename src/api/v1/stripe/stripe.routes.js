var express = require('express');
var router = express.Router();

/** Auth Middlewares **/
var authenticated = require('../../../middleware/authenticated.middleware.js');

/** Routes **/
router.post('/subscribe', authenticated, require('./stripe-subscribe.handler.js'));

module.exports = router;
