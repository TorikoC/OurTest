const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  username: {
    type: String,
  },
  details: {
    type: Array,
  },
  score: {
    type: Number,
    default: 0,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  timeLimit: {
    type: Number,
    default: 0,
  },
  timeUsed: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: 0,
  }
});

// TODO:
// add unique index for title & username

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
