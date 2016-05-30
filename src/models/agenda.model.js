var Model = require('./model');

/** Setup Model Properties and tags **/
var Agenda = new Model({
  id: {
    value: null,
    tags: ['ui', 'db']
  },
  userId: {
    value: null,
    tags: ['ui', 'db']
  },
  address: {
    value: null,
    tags: ['ui', 'db']
  },
  description: {
    value: false,
    tags: ['ui', 'db']
  },
  startDate: {
    value: false,
    tags: ['ui', 'db']
  },
  endDate: {
    value: false,
    tags: ['ui', 'db']
  },
  mapLink: {
    value: false,
    tags: ['ui', 'db']
  },
  title: {
    value: false,
    tags: ['ui', 'db']
  },
  subtitle: {
    value: false,
    tags: ['ui', 'db']
  },
  website: {
    value: false,
    tags: ['ui', 'db']
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

module.exports = Agenda;
