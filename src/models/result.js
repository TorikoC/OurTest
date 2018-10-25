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
  scores: {
    type: Number,
    default: 0,
  },
  totalScores: {
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
