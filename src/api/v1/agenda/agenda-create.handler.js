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
  var agenda = Agenda.create(req.body.agenda);
  var token = req.body.headers['x-access-token'];

  co(function*() {
    var session = yield SessionService.getSession(token);

    console.log('sesssssion', session);

    var userId = session.id;

    agenda.userId = userId;

    var insertResults = yield AgendaRepository.create(agenda.toJson('db'));

    res.status(201);
    res.json({
      agenda: agenda.toJson('ui')
    });

  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = agendaPost;
