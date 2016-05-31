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
var agendaGetAllByUserId = function(req, res) {
  // Set body fields to user model

  co(function*() {

    var userId = req.user.id;

    var agendas = yield AgendaRepository.agendaGetAllByUserId(userId);

    res.status(200);
    res.json(agendas);

  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = agendaGetAllByUserId;


// 200 typical success status
// 201 Created successfully status

// 400 Validation error (user input error)
// 401 Unauthorized (i.e. no a valid token, not logged in)
// 403 Forbidden (user does not have permission for this resource)

// 500 Unknown Server Error