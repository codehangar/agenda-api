var validator = require('validator'),
	ErrorHandlerService = require('../../../../services/error-handler.service.js');
/**
 * User Update Validation
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userPutValidation = function(req, res, next) {
	var errors = {};

	if(req.params.userId !== req.user.id) {
		return ErrorHandlerService.handleCustomErrors(401, errors, ErrorHandlerService.unauthorizedContent, res);
	}
	// If the errors.errors object is not empty then send validation errors
	// Else lets continue
	if(Object.keys(errors).length) {
		return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.validation, res);
	} else {
		next();
	}
};

module.exports = userPutValidation;