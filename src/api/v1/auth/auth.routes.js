var express = require('express');
var router = express.Router();

/** Auth Middlewares **/
var authenticated = require('../../../middleware/authenticated.middleware.js');
var authLoginValidation = require('../_validation/auth/auth.login.validation.js');

/** Routes **/
router.post('/login', authLoginValidation, require('./login.handler.js'));
router.post('/logout', authenticated, require('./logout.handler.js'));
router.get('/me', authenticated, require('./me.handler.js'));

module.exports = router;
