var RethinkDbService = require('../services/rethink-db.service.js');
var co = require('co');
var r = require('rethinkdb');

var StripeSubscriptionRepository = function() {

};

/**
 * Create StripeSubscription Record
 * @param {Object} StripeSubscription Object
 * @returns {Promise}
 */
StripeSubscriptionRepository.prototype.create = function(stripeSubscription) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Insert stripeSubscription
      var results = yield r.table('stripeSubscription').insert(stripeSubscription).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

/**
 * Update StripeSubscription Record
 * @param {Object} StripeSubscription Object
 * @returns {Promise}
 */
StripeSubscriptionRepository.prototype.update = function(stripeSubscription) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Update StripeSubscription
      var results = yield r.table('stripeSubscription').get(stripeSubscription.id).replace(stripeSubscription).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

/**
 * Get Subscription Record by user id
 * @param {String} User Id
 * @returns {Promise}
 */
StripeSubscriptionRepository.prototype.getByUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Find email
      var results = yield r.table('stripeSubscription').getAll(userId, {
        index: 'parentId'
      }).run(conn);
      results = yield results.toArray();
      conn.close();
      resolve(results[0]);
    }).catch(function(e) {
      reject(e);
    });
  });
};

module.exports = new StripeSubscriptionRepository();
