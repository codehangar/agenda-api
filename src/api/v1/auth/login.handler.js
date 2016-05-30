var PasswordService = require('../../../services/password.service.js');
var ErrorHandlerService = require('../../../services/error-handler.service.js');
var SessionService = require('../../../services/session.service.js');
var UserRepository = require('../../../repositories/user.repository.js');
var User = require('../../../models/user.model.js');
var co = require('co');

/**
 * Returns Auth Object
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var authLoginPost = function(req, res) {
  var errors;
  co(function*() {
    // Get user by email
    var user = yield UserRepository.getByEmail(req.body.email);
    user = User.create(user);
    // If user is empty return invalid email or password error
    if (!user) {
      errors = {};
      return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.authFailure, res);
    }
    // Check if password is match
    var isMatch = yield PasswordService.comparePassword(req.body.password, user.password);
    // Generate a session if passwords matched
    // Else throw invalid email or password.
    if (isMatch) {
      var token = SessionService.generateKey();
      yield SessionService.createSession(token, user);
      res.status(200);
      res.json({
        token: token,
        user: user.toJson('ui')
      });
    } else {
      errors = {};
      return ErrorHandlerService.handleCustomErrors(400, errors, ErrorHandlerService.authFailure, res);
    }
  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = authLoginPost;
