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
  password: {
    type: String,
  },
  comments: {
    type: Array,
    default: [],
  },
  testHistories: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
