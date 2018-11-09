const mongoose = require('mongoose');

const postReplySchema = new mongoose.Schema({
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

const PostReply = mongoose.model('PostReply', postReplySchema);

module.exports = PostReply;

