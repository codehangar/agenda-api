var Model = require('./model');

/** Setup Model Properties and tags **/
var StripeInvoice = new Model({
  id: {
    value: null,
    tags: ['db']
  },
  subscriptionId: {
    value: null,
    tags: ['db']
  },
  invoiceId: {
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

module.exports = StripeInvoice;
