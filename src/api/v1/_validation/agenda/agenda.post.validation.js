var validator = require('validator'),
	ErrorHandlerService = require('../../../../services/error-handler.service.js');
/**
 * User Create Validation
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userPostValidation = function(req, res, next) {
	var errors = {};

	if(!req.body.agenda.title) {
		errors.email = ['Agenda Title is a required field'];
	} else {
		// if(!validator.isEmail(req.body.email)) {
		// 	errors.email = ['Invalid email address']
		// }
	}

	// if(!req.body.headers['x-acess-token']) {
	// 	errors.password = ['Session token is required'];
	// } else {
	// 	// if(!validator.isLength(req.body.password, { min: 8, max: 16})) {
	// 	// 	errors.password = ['Password must be between 8 and 16 characters'];
	// 	// }
	// }

	// If the errors object is not empty then send validation errors
	// Else lets continue
	if(Object.keys(errors).length) {
		return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.validation, res);
	} else {
		next();
	}
};

module.exports = userPostValidation;