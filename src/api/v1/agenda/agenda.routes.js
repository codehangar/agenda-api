var express = require('express');
var router = express.Router();

/** Auth Middlewares **/
var authenticated = require('../../../middleware/authenticated.middleware.js');

/** Validaiton Middlewares **/
var agendaPostValidation = require('../_validation/agenda/agenda.post.validation.js');
// var userPutValidation = require('../_validation/user/user.put.validation.js');
// var userConfirmEmailValidation = require('../_validation/user/user.confirm.email.post.validation.js');
// var userSendResetPasswordValidation = require('../_validation/user/user.send.reset.password.post.validation.js');
// var userResetPasswordValidation = require('../_validation/user/user.reset.password.post.validation.js');

/** Routes **/
router.post('/', agendaPostValidation, require('./agenda-create.handler.js'));
// router.put('/:userId', authenticated, userPutValidation, require('./user-update.handler.js'));
// router.post('/send/confirm/email', authenticated, require('./send-confirm-email.handler.js'));
// router.post('/confirm/email', userConfirmEmailValidation, require('./confirm-email.handler.js'));
// router.post('/send/reset/password', userSendResetPasswordValidation, require('./send-reset-password.handler.js'));
// router.post('/reset/password', userResetPasswordValidation, require('./user-reset-password.handler.js'));

module.exports = router;
