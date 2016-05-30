var ErrorHandlerService = require('../../../services/error-handler.service.js');
var TokenService = require('../../../services/token.service.js');
var UserRepository = require('../../../repositories/user.repository.js');
var co = require('co');
var User = require('../../../models/user.model.js');

/**
 * Returns 200 with updated user object
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userConfirmEmail = function(req, res) {
  var errors;
  co(function*() {
    // Lookup user by email
    var user = yield UserRepository.getByEmail(req.body.email);
    if (user) {
      // Cast as user model
      user = User.create(user);
      // Make sure token supplied is correct
      if (user.confirmEmailToken !== req.body.confirmEmailToken) {
        errors = {};
        return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.invalidConfirmEmailToken, res);
      }
      // Make sure token has not expired
      if (user.confirmEmailExpiry < new Date()) {
        errors = {};
        return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.expiredConfirmEmailToken, res);
      }
      // Set emailConfirmed to true, and nullify token and expiry
      user.emailConfirmed = true;
      user.confirmEmailToken = null;
      user.confirmEmailExpiry = null;
      // Save fields to db
      yield UserRepository.update(user.toJson('db'));
      // Send Ok and updated user object
      res.status(200).json(user.toJson('ui'));
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

module.exports = userConfirmEmail;
