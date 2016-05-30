var ErrorHandlerService = require('../../../services/error-handler.service.js');
var SessionService = require('../../../services/session.service.js');
var PostmarkService = require('../../../services/postmark.service.js');
var TokenService = require('../../../services/token.service.js');
var UserRepository = require('../../../repositories/user.repository.js');
var co = require('co');
var User = require('../../../models/user.model.js');

/**
 * Returns 200
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userSendResetPasswordEmail = function(req, res) {
  co(function*() {
    // Lookup user by email
    var user = yield UserRepository.getByEmail(req.body.email);
    if (user) {
      // Cast as user model
      user = User.create(user);
      // Generate an expiry and token for confirm email
      var token = yield TokenService.generateToken();
      // Update user model with token and expiry for confirm email
      user.resetPasswordToken = token.token;
      user.resetPasswordExpiry = token.expiry;
      // Update user in db
      yield UserRepository.update(user.toJson('db'));
      // Send Confirm email
      yield PostmarkService.sendResetPasswordEmail(user.email);
      // Send 200 Status
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

module.exports = userSendResetPasswordEmail;
