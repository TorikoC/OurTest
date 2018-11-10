const mongoose = require('mongoose');

const requestCommentSchema = new mongoose.Schema({
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

const RequestComment = mongoose.model('RequestComment', requestCommentSchema); 

module.exports = RequestComment;


