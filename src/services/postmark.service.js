var postmark = require('postmark');

var PostmarkService = function() {
  this.client = new postmark.Client(process.env.POSTMARK_TOKEN);
};

/**
 * Send Postmark welcome email to specified email
 * @param {String} Email address
 * @returns {Promise}
 */
PostmarkService.prototype.sendWelcomeEmail = function(email) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    _this.client.sendEmailWithTemplate({
      "From": "keith@codehangar.io",
      "To": email,
      "TemplateId": 475601,
      "TemplateModel": {
        "product_name": "product_name_Value",
        "name": "name_Value",
        "action_url": "action_url_Value",
        "username": "username_Value",
        "sender_name": "sender_name_Value",
        "product_address_line1": "product_address_line1_Value",
        "product_address_line2": "product_address_line2_Value"
      }
    }, function(error, success) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

/**
 * Send Postmark confirm email for email changes
 * @param {String} Email address
 * @returns {Promise}
 */
PostmarkService.prototype.sendConfirmEmail = function(email, token) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    _this.client.sendEmailWithTemplate({
      "From": "keith@codehangar.io",
      "To": email,
      "TemplateId": 475605,
      "TemplateModel": {
        "product_name": "product_name_Value",
        "name": "name_Value",
        "action_url": "action_url_Value",
        "username": "username_Value",
        "sender_name": "sender_name_Value",
        "product_address_line1": "product_address_line1_Value",
        "product_address_line2": "product_address_line2_Value"
      }
    }, function(error, success) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

/**
 * Send Postmark reset password email
 * @param {String} Email address
 * @returns {Promise}
 */
PostmarkService.prototype.sendResetPasswordEmail = function(email, token) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    _this.client.sendEmailWithTemplate({
      "From": "keith@codehangar.io",
      "To": email,
      "TemplateId": 475602,
      "TemplateModel": {
        "product_name": "product_name_Value",
        "name": "name_Value",
        "action_url": "action_url_Value",
        "sender_name": "sender_name_Value",
        "product_address_line1": "product_address_line1_Value",
        "product_address_line2": "product_address_line2_Value"
      }
    }, function(error, success) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = new PostmarkService();
