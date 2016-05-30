var ErrorHandlerService = require('../../../services/error-handler.service.js');
var SessionService = require('../../../services/session.service.js');
var co = require('co');

/**
 * Returns 200
 * @param {Object} Express Request Object
 * @param {Object} Express Response Object
 */
var authLogoutPost = function(req, res) {
  co(function*() {
    // Delete Session
    yield SessionService.deleteSession(req.token);
    res.sendStatus(200);
  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = authLogoutPost;
