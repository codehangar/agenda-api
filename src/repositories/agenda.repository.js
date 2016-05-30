var RethinkDbService = require('../services/rethink-db.service.js');
var co = require('co');
var r = require('rethinkdb');

var AgendaRepository = function() {

};

/**
 * Create User Record
 * @param {Object} User Object
 * @returns {Promise}
 */
AgendaRepository.prototype.create = function(agenda) {
  return new Promise(function(resolve, reject) {
    co(function*() {
      // Get a open db connection
      var conn = yield RethinkDbService.getDatabaseConnection();
      // Insert user
      var results = yield r.table('agenda').insert(agenda).run(conn);
      conn.close();
      resolve(results);
    }).catch(function(e) {
      reject(e);
    });
  });
};

/**
 * Get User Record by email address
 * @param {Object} User Object
 * @returns {Promise}
 */
// AgendaRepository.prototype.getByEmail = function(email) {
//   return new Promise(function(resolve, reject) {
//     co(function*() {
//       // Get a open db connection
//       var conn = yield RethinkDbService.getDatabaseConnection();
//       // Find email
//       var results = yield r.table('user').getAll(email, {
//         index: 'email'
//       }).run(conn);
//       results = yield results.toArray();
//       conn.close();
//       resolve(results[0]);
//     }).catch(function(e) {
//       reject(e);
//     });
//   });
// };

/**
 * Update User Record
 * @param {Object} User Object
 * @returns {Promise}
 */
// AgendaRepository.prototype.update = function(user) {
//   return new Promise(function(resolve, reject) {
//     co(function*() {
//       // Get a open db connection
//       var conn = yield RethinkDbService.getDatabaseConnection();
//       // Update User
//       var results = yield r.table('user').get(user.id).replace(user).run(conn);
//       conn.close();
//       resolve(results);
//     }).catch(function(e) {
//       reject(e);
//     });
//   });
// };

module.exports = new AgendaRepository();
