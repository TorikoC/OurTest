const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  username: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  avatar: {
    type: String,
  }
});

// TODO:
// add unique index for title & username

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
