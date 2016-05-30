var ErrorHandlerService = function() {

};

/**
 * Handle Error Callbacks
 * @param {Object} Error Object
 * @param {String} Message
 * @param {Object} Express Response Object
 */
ErrorHandlerService.prototype.handleError = function(err, msg, res) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500);
  res.json({
    code: 500,
    message: msg,
    errors: err.message
  });
  return;
};

/**
 * Handle Custom Errors
 * @param {Integer} Status Code
 * @param {Object} Error Object
 * @param {String} Message
 * @param {Object} Express Response Object
 */
ErrorHandlerService.prototype.handleCustomErrors = function(code, errors, msg, res) {
  var errors = {
    code: code,
    errors: errors,
    message: msg
  };
  res.status(errors.code);
  res.json(errors);
  return;
};

/* Unknown Message */
ErrorHandlerService.prototype.unknown = 'An unknown application error has occured';

/* Validation Message */
ErrorHandlerService.prototype.validation = 'A validation error has occured';

/* Conflict Message */
ErrorHandlerService.prototype.conflict = 'A conflict has occured';

/* Auth Failure Message */
ErrorHandlerService.prototype.authFailure = 'Invalid credentials were supplied';

/* Unauthorized Content */
ErrorHandlerService.prototype.unauthorizedContent = 'Unauthorized for this content';

/* Invalid token Message */
ErrorHandlerService.prototype.invalidToken = 'Invalid token supplied';

/* Expired token Message */
ErrorHandlerService.prototype.expiredToken = 'Token has expired';

/* No token provided Message */
ErrorHandlerService.prototype.noToken = 'No token provided. Token can be provided the following ways: req.body.token || req.query.token || req.headers[\'x-access-token\']';

/* Invalid confirmEmailToken Message */
ErrorHandlerService.prototype.invalidConfirmEmailToken = 'Invalid confirmEmailToken supplied';

/* Expired confirmEmailToken Message */
ErrorHandlerService.prototype.expiredConfirmEmailToken = 'confirmEmailToken has expired';

/* Invalid resetPasswordToken Message */
ErrorHandlerService.prototype.invalidResetPasswordToken = 'Invalid resetPasswordToken supplied';

/* Expired resetPasswordToken Message */
ErrorHandlerService.prototype.expiredResetPasswordToken = 'resetPasswordToken has expired';

module.exports = new ErrorHandlerService();
