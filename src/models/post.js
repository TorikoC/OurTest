const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  replys: {
    type: Number,
    default: 0,
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
