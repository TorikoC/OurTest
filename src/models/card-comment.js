const mongoose = require('mongoose');

const cardCommentSchema = new mongoose.Schema({
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

const CardComment = mongoose.model('CardComment', cardCommentSchema);

module.exports = CardComment;

