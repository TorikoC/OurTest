const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'default title',
  },
  intro: {
    type: String,
    default: 'default introduction',
  },
  author: {
    type: String,
    default: 'admin(defalut author)',
  },
  score: {
    type: Number,
    default: 100,
  },
  tags: {
    type: String,
    default: '',
  },
  timeLimit: {
    type: Number,
    default: 1000 * 10,
  },
  questions: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
