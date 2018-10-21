const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
    default: '/logo.png',
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
  },
  comments: {
    type: Array,
    default: [],
  },
  activities: {
    type: Array,
    default: [],
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
