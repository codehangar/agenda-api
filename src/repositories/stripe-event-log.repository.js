var RethinkDbService = require('../services/rethink-db.service.js');
var co = require('co');
var r = require('rethinkdb');

var StripeEventLogRepository = function() {

};

/**
 * Create StripeEventLog Record
 * @param {Object} StripeEventLog Object
 * @returns {Promise}
 */
StripeEventLogRepository.prototype.create = function(stripeEventLog) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Insert stripeEventLog
      var results = yield r.table('stripeEventLog').insert(stripeEventLog).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

/**
 * Update StripeEventLog Record
 * @param {Object} StripeEventLog Object
 * @returns {Promise}
 */
StripeEventLogRepository.prototype.update = function(stripeEventLog) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Update StripeEventLog
      var results = yield r.table('stripeEventLog').get(stripeEventLog.id).replace(stripeEventLog).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

module.exports = new StripeEventLogRepository();
