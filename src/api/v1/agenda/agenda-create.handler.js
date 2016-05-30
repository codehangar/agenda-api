var TokenService = require('../../../services/token.service.js');
var ErrorHandlerService = require('../../../services/error-handler.service.js');
var UserRepository = require('../../../repositories/user.repository.js');
var AgendaRepository = require('../../../repositories/agenda.repository.js');
var SessionService = require('../../../services/session.service.js');
var co = require('co');
var User = require('../../../models/user.model.js');
var Agenda = require('../../../models/agenda.model.js');

/**
 * Returns 201 {User, Token}
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var agendaPost = function(req, res) {
  // Set body fields to user model
  var agenda = Agenda.create(req.body);

  co(function*() {
    // Make sure email is unique
    // var results = yield AgendaRepository.getByEmail(req.body.email);
    // If we did not find email then lets create user
    // Else lets throw email already in use.
    // if (!results) {
      // Hash password
      // var hash = yield PasswordService.encryptPassword(req.body.password);
      // Update User password with hashed password
      // user.password = hash;
      // Generate an expiry and token for confirm email
      // var emailToken = yield TokenService.generateToken();
      // Update user model with token and expiry for confirm email
      // user.confirmEmailToken = emailToken.token;
      // user.confirmEmailExpiry = emailToken.expiry;
      // Save user to db
      // Make sure to pass db tag to get props for db only fields
      var insertResults = yield AgendaRepository.create(agenda.toJson('db'));
      // Set newly created ID on user
      // user.id = insertResults.generated_keys[0];
      // Send welcome email
      // yield PostmarkService.sendWelcomeEmail(user.email);

      // Everything went well send a created status back
      // var sessionToken = SessionService.generateKey();
      // yield SessionService.createSession(sessionToken, user);
      res.status(201);
      res.json({
        // token: sessionToken,
        agenda: agenda.toJson('ui')
      });
    // } else {
    //   // Handle email conflict
    //   var errors = {
    //     email: ['Email already in use.']
    //   };
    //   return ErrorHandlerService.handleCustomErrors(409, errors, ErrorHandlerService.conflict, res);
    // }
  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = agendaPost;
