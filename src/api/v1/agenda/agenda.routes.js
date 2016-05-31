var express = require('express');
var router = express.Router();

/** Auth Middlewares **/
var authenticated = require('../../../middleware/authenticated.middleware.js');

/** Validaiton Middlewares **/
var agendaPostValidation = require('../_validation/agenda/agenda.post.validation.js');

/** Routes **/
router.post('/', authenticated, agendaPostValidation, require('./agenda-create.handler.js'));
router.get('/', authenticated, require('./agenda-get.handler.js'));

module.exports = router;
