var ErrorHandlerService = require('../../../services/error-handler.service.js');
var SessionService = require('../../../services/session.service.js');
var PostmarkService = require('../../../services/postmark.service.js');
var UserRepository = require('../../../repositories/user.repository.js');
var co = require('co');
var User = require('../../../models/user.model.js');

/**
 * Returns 200 with User Object UI properties
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var userPut = function(req, res) {
  var user = User.create(req.user);
  var emailChange = false;
  var errors;

  co(function*() {
    // If email is different lets make sure its unique
    if (req.body.email !== user.email && req.body.email !== undefined) {
      // Make sure email is unique
      var results = yield UserRepository.getByEmail(req.body.email);
      if (results) {
        errors = {
          email: ['Email already in use.']
        }
        return ErrorHandlerService.handleCustomErrors(409, errors, ErrorHandlerService.conflict, res);
      } else {
        user.email = req.body.email;
        user.emailConfirmed = false;
        emailChange = true;
      }
    }
    // Update any other fields here
    user.updatedDate = new Date();
    // Update user in db
    yield UserRepository.update(user.toJson('db'));
    // if email changed send a new confirm email
    if (emailChange) {
      yield PostmarkService.sendConfirmEmail(user.email);
    }
    // Send ok status and updated user object
    res.status(200);
    res.json(user.toJson('ui'));
  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = userPut;
