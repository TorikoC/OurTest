const mongoose = require('mongoose');

const testCommentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  username: {
    type: String,
  },
  content: {
    type: String,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

// TODO:
// add unique index for title & username

const TestComment = mongoose.model('TestComment', testCommentSchema);

module.exports = TestComment;
