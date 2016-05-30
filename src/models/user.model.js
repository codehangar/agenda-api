var Model = require('./model');

/** Setup Model Properties and tags **/
var User = new Model({
  id: {
    value: null,
    tags: ['ui', 'db']
  },
  email: {
    value: null,
    tags: ['ui', 'db']
  },
  emailConfirmed: {
    value: false,
    tags: ['ui', 'db']
  },
  password: {
    value: null,
    tags: ['db']
  },
  sessionExpiryDate: {
    value: null,
    tags: []
  },
  resetPasswordToken: {
    value: null,
    tags: ['db']
  },
  resetPasswordExpiry: {
    value: null,
    tags: ['db']
  },
  confirmEmailToken: {
    value: null,
    tags: ['db']
  },
  confirmEmailExpiry: {
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

module.exports = User;
