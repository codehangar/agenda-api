var ErrorHandlerService = require('../../../services/error-handler.service.js');
var SessionService = require('../../../services/session.service.js');
var PostmarkService = require('../../../services/postmark.service.js');
var TokenService = require('../../../services/token.service.js');
var UserRepository = require('../../../repositories/user.repository.js');
var co = require('co');
var User = require('../../../models/user.model.js');

/**
 * Returns 200 with updated user object
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userSendConfirmEmail = function(req, res) {

  co(function*() {
    var user = User.create(req.user);
    // Generate an expiry and token for confirm email
    var token = yield TokenService.generateToken();
    // Update user model with token and expiry for confirm email
    user.emailConfirmed = false;
    user.confirmEmailToken = token.token;
    user.confirmEmailExpiry = token.expiry;
    // Update user in db
    yield UserRepository.update(user.toJson('db'));
    // Send Confirm email
    yield PostmarkService.sendConfirmEmail(user.email);
    // Send 200 Status and user
    res.status(200).json(user.toJson('ui'));
  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = userSendConfirmEmail;
