var Model = require('./model');

/** Setup Model Properties and tags **/
var StripeSubscription = new Model({
  id: {
    value: null,
    tags: ['db']
  },
  type: {
    value: null,
    tags: ['db']
  },
  parentId: {
    value: null,
    tags: ['db']
  },
  customerId: {
    value: null,
    tags: ['db']
  },
  plan: {
    value: null,
    tags: ['db']
  },
  subscriptionId: {
    value: null,
    tags: ['db']
  },
  quantity: {
    value: null,
    tags: ['db']
  },
  trialEnd: {
    value: null,
    tags: ['db']
  },
  activeUntil: {
    value: null,
    tags: ['db']
  },
  status: {
    value: null,
    tags: ['db']
  },
  createdDate: {
    value: new Date(),
    tags: ['db']
  },
  updatedDate: {
    value: null,
    tags: ['db']
  },
  deletedDate: {
    value: null,
    tags: ['db']
  }
});

module.exports = StripeSubscription;
