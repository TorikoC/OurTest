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
});

// TODO:
// add unique index for title & username

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
