var uuid = require('node-uuid');

var TokenService = function() {

};

TokenService.prototype.generateToken = function() {
  var _this = this;
  var expiry = new Date();
  return new Promise(function(resolve, reject) {
    resolve({
      token: uuid.v4(),
      expiry: new Date(expiry.setTime(expiry.getTime() + 30000 * 60))
    });
  });
};

module.exports = new TokenService();
