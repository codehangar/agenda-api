var validator = require('validator');
/**
 * signup validation middleware
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var authValidation = function(req, res, next) {
	var errors = {
		code: 400,
		errors: {}
	};

	if(!req.body.email) {
		errors.errors.email = ['Email is a required field.'];
	}

	if(!req.body.password) {
		errors.errors.password = ['Password is a required field.'];
	}

	// If the errors.errors object is not empty then send validation errors
	// Else lets continue
	if(Object.keys(errors.errors).length) {
		res.status(400);
		res.json(errors);
	} else {
		next();
	}
};

module.exports = authValidation;