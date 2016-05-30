// var request = require('request');
var ErrorHandlerService = require('../../../services/error-handler.service.js');
var StripeService = require('../../../services/stripe.service.js');
var StripeTransactionLogRepository = require('../../../repositories/stripe-transaction-log.repository.js');
var StripeSubscriptionRepository = require('../../../repositories/stripe-subscription.repository.js');
var StripeSubscription = require('../../../models/stripe-subscription.model.js');
var co = require('co');

// Handle Paypal PDT
function stripeSubscribeHandler(req, res) {

  // Get the credit card details submitted by the form
  // Should this route be authenticated? If not we need to pass the userId(parentId)
  var user = req.user;

  co(function*() {

    var subscription = yield StripeSubscriptionRepository.getByUserId(user.id);

    if (subscription) {
      var stripeSub = yield StripeService.updateSubscription(user, subscription, req.body);
      // Save subscription object in transactionlogs table
      yield StripeTransactionLogRepository.create(stripeSub);

      subscription.subscriptionId = stripeSub.id;
      subscription.plan = stripeSub.plan.id;
      subscription.quantity = stripeSub.quantity;
      subscription.trialEnd = stripeSub.trial_end;
      subscription.activeUntil = stripeSub.current_period_end;
      subscription.status = stripeSub.status;

      yield StripeSubscriptionRepository.update(subscription);

      subscription = yield StripeSubscriptionRepository.getByUserId(user.id);
      res.json(subscription);
    } else {

      var customer = yield StripeService.createCustomer(user, req.body);
      // Save customer object in transactionlogs table
      yield StripeTransactionLogRepository.create(customer);

      // Create new subscription from customer object
      var newSub = StripeSubscription.create({
        type: 'user',
        parentId: user.id, // If we authenticate this route, use: user.id
        customerId: customer.id,
        subscriptionId: customer.subscriptions.data[0].id,
        plan: customer.subscriptions.data[0].plan.id,
        quantity: customer.subscriptions.data[0].quantity,
        trialEnd: customer.subscriptions.data[0].trial_end, // This needs to be specified in the plan creation or passed in the payload above
        activeUntil: customer.subscriptions.data[0].current_period_end, // Not sure this is correct way to guarantee this date
        status: customer.subscriptions.data[0].status
      });
      // Create newSub, use toJson('db') as a standard
      yield StripeSubscriptionRepository.create(newSub.toJson('db'));

      newSub = yield StripeSubscriptionRepository.getByUserId(user.id);
      res.json(newSub);
    }

  }).catch(function(e) {
    return ErrorHandlerService.handleError(e, ErrorHandlerService.unknown, res);
  });
};

module.exports = stripeSubscribeHandler;
