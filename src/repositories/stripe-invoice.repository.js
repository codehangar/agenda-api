var RethinkDbService = require('../services/rethink-db.service.js');
var co = require('co');
var r = require('rethinkdb');

var StripeInvoiceRepository = function() {

};

/**
 * Create StripeInvoice Record
 * @param {Object} StripeInvoice Object
 * @returns {Promise}
 */
StripeInvoiceRepository.prototype.create = function(stripeInvoice) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Insert stripeInvoice
      var results = yield r.table('stripeInvoice').insert(stripeInvoice).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

/**
 * Update StripeInvoice Record
 * @param {Object} StripeInvoice Object
 * @returns {Promise}
 */
StripeInvoiceRepository.prototype.update = function(stripeInvoice) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Update StripeInvoice
      var results = yield r.table('stripeInvoice').get(stripeInvoice.id).replace(stripeInvoice).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

module.exports = new StripeInvoiceRepository();
