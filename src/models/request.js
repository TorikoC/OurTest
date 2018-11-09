const mongoose = require('mongoose');
const config = require('config');

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  username: {
    type: String,
  },
  description: {
    type: String,
  },
  comments: {
    type: Array,
    default: [],
  },
  status: {
    type: Number,
    default: config.get('request-unapproved')
  },
  approvedIndex: {
    type: Number,
    default: -1,
  },
  createdAt: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Number,
    default: 0,
  },
  votes: {
    type: Number,
    default: 0,
  }
});

// TODO:
// add unique index for title & username

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;

