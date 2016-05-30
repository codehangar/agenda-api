var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth/auth.routes.js'));

router.use('/user', require('./user/user.routes.js'));

router.use('/agenda', require('./agenda/agenda.routes.js'));

router.use('/stripe', require('./stripe/stripe.routes.js'));

module.exports = router;
