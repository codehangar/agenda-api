var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var SALT_WORK_FACTOR = 10;

var PasswordService = function() {

};

PasswordService.prototype.encryptPassword = function(password) {
  return new Promise(function(resolve, reject) {
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        resolve(hash);
      });
    });
  });
};

PasswordService.prototype.comparePassword = function(candidatePassword, hashedPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword || '', hashedPassword, function(err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

PasswordService.prototype.generateResetToken = function() {
  var _this = this;
  var expiry_date = new Date();
  return new Promise(function(resolve, reject) {
    resolve({
      reset_token: uuid.v4(),
      expiry_date: new Date(expiry_date.setTime(expiry_date.getTime() + 30000 * 60))
    });
  });
};

module.exports = new PasswordService();
