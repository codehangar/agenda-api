var redis = require('redis');
var uuid = require('node-uuid');

var SessionService = function() {
  this.client = redis.createClient({
    url: process.env.REDISCLOUD_URL
  });
};

/**
 * Generate a new session
 * @param {String} Session Key
 * @param {Mixed} Session Value
 * @returns {Promise}
 */
SessionService.prototype.createSession = function(key, value) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    // Add expiryDate to value
    value.sessionExpiryDate = _this.generateExpiryDate();
    // If value is an object lets stringify it
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    _this.client.set(key, value, function(err, replies) {
      if (err) {
        reject(err);
      } else {
        resolve(replies);
      }
    });
  });
};

/**
 * Get a session by key
 * @param {String} Session Key
 * @returns {Promise}
 */
SessionService.prototype.getSession = function(key) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    _this.client.get(key, function(err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(row));
      }
    });
  });
};

/**
 * Delete a session by key
 * @param {String} Session Key
 * @returns {Promise}
 */
SessionService.prototype.deleteSession = function(key) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    _this.client.del(key, function(err, replies) {
      if (err) {
        reject(err);
      } else {
        resolve(replies);
      }
    });
  });
};

/**
 * Update a session by key and value
 * @param {String} Session Key
 * @param {Mixed} Session Value
 * @returns {Promise}
 */
SessionService.prototype.updateSession = function(key, value) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    // Update ExpiryDate
    value.sessionExpiryDate = _this.generateExpiryDate();
    // If value is an object lets stringify it
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    _this.client.set(key, value, function(err, replies) {
      if (err) {
        reject(err);
      } else {
        resolve(replies);
      }
    });
  });
};

/**
 * Generate a new session
 * @param {String} Session Key
 * @param {Mixed} Session Value
 * @returns {Promise}
 */
SessionService.prototype.generateKey = function() {
  return uuid.v4();
};

/**
 * Generate a new expiry date
 * @returns Session Key
 */
SessionService.prototype.generateExpiryDate = function() {
  var expiryDate = new Date();
  var expiryDate = new Date(expiryDate.setTime(expiryDate.getTime() + 30000 * 60));
  return expiryDate;
};

/**
 * Check if expiryDate is still valid
 * @returns boolean
 */
SessionService.prototype.expiryDateIsValid = function(expiryDate) {
  return !(new Date(expiryDate) < new Date());
};

module.exports = new SessionService();
