var stripe = require("stripe")(process.env.STRIPE_API_KEY);
var co = require('co');

var StripeService = function() {

};

/**
 * Create a Stripe Customer (new subscription)
 * @param {Object} User
 * @param {Object} Stripe Params
 * @returns {Promise}
 */
StripeService.prototype.createCustomer = function(user, stripeParams) {
  return new Promise(function(resolve, reject) {
    stripe.customers.create({
      source: stripeParams.stripeToken,
      plan: stripeParams.plan,
      email: user.email,
      quantity: stripeParams.quantity
    }, function(err, customer) {
      if (err) {
        reject(err);
      } else {
        resolve(customer);
      }
    });
  });
};

/**
 * Update a Stripe Subscription
 * @param {Object} User
 * @param {Object} Subscription
 * @param {Object} Stripe Params
 * @returns {Promise}
 */
StripeService.prototype.updateSubscription = function(user, subscription, stripeParams) {
  return new Promise(function(resolve, reject) {
    stripe.customers.updateSubscription(
      subscription.customerId,
      subscription.subscriptionId, {
        plan: stripeParams.plan,
        quantity: stripeParams.quantity
      },
      function(err, newSubscription) {
        if (err) {
          reject(err);
        } else {
          resolve(newSubscription);
        }
      }
    );
  });
};

module.exports = new StripeService();
