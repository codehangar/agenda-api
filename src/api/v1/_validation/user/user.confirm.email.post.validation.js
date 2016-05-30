var validator = require('validator'),
	ErrorHandlerService = require('../../../../services/error-handler.service.js');
/**
 * User Confirm Email Validation
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userConfirmEmailValidation = function(req, res, next) {
	var errors = {};

	if(!req.body.confirmEmailToken) {
		errors.confirmEmailToken = ['confirmEmailToken is a required'];
	}

	if(!req.body.email) {
		errors.email = ['Email is a required field'];
	} else {
		if(!validator.isEmail(req.body.email)) {
			errors.email = ['Invalid email address']
		}
	}

	// If the errors object is not empty then send validation errors
	// Else lets continue
	if(Object.keys(errors).length) {
		return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.validation, res);
	} else {
		next();
	}
};

module.exports = userConfirmEmailValidation;