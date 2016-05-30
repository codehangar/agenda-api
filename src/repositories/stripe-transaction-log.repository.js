var RethinkDbService = require('../services/rethink-db.service.js');
var co = require('co');
var r = require('rethinkdb');

var StripeTransactionLogRepository = function() {

};

/**
 * Create StripeTransactionLog Record
 * @param {Object} StripeTransactionLog Object
 * @returns {Promise}
 */
StripeTransactionLogRepository.prototype.create = function(stripeTransactionLog) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Insert stripeTransactionLog
      var results = yield r.table('stripeTransactionLog').insert(stripeTransactionLog).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

/**
 * Update StripeTransactionLog Record
 * @param {Object} StripeTransactionLog Object
 * @returns {Promise}
 */
StripeTransactionLogRepository.prototype.update = function(stripeTransactionLog) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Update StripeTransactionLog
      var results = yield r.table('stripeTransactionLog').get(stripeTransactionLog.id).replace(stripeTransactionLog).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

module.exports = new StripeTransactionLogRepository();
