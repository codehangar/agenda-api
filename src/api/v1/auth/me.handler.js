var ErrorHandlerService = require('../../../services/error-handler.service.js');
var SessionService = require('../../../services/session.service.js');
var User = require('../../../models/user.model.js');
var co = require('co');

/**
 * Returns 200
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var authMeGet = function(req, res) {
  co(function*() {
    var user = req.user;
    res.status(200);
    user = User.create(user);
    res.json(user.toJson('ui'));
  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = authMeGet;
