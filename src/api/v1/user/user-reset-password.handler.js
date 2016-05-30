var ErrorHandlerService = require('../../../services/error-handler.service.js');
var TokenService = require('../../../services/token.service.js');
var PasswordService = require('../../../services/password.service.js');
var UserRepository = require('../../../repositories/user.repository.js');
var co = require('co');
var User = require('../../../models/user.model.js');

/**
 * Returns 200
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userResetPassword = function(req, res) {
  var errors;
  co(function*() {
    // Lookup user by email
    var user = yield UserRepository.getByEmail(req.body.email);
    if (user) {
      // Cast as user model
      user = User.create(user);
      // Make sure token supplied is correct
      if (user.resetPasswordToken !== req.body.resetPasswordToken) {
        errors = {};
        return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.invalidResetPasswordToken, res);
      }
      // Make sure token has not expired
      if (user.resetPasswordExpiry < new Date()) {
        errors = {};
        return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.expiredResetPasswordToken, res);
      }
      // Hash password
      var hash = yield PasswordService.encryptPassword(req.body.password);
      // Update User password with hashed password
      user.password = hash;
      // Set emailConfirmed to true, and nullify token and expiry
      user.resetPasswordToken = null;
      user.resetPasswordExpiry = null;
      // Save fields to db
      yield UserRepository.update(user.toJson('db'));
      // Send Ok and updated user object
      res.sendStatus(200);
    } else {
      errors = {
        email: ['Invalid email address, user not found']
      };
      return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.validation, res);
    }
  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = userResetPassword;
