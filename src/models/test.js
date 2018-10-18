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

  settings: {
    type: Object,
    default: {
      // 1 public, 2 private
      accessbility: 1,
      // 1. all questions, 2. each question
      timerMode: 1,
      timeLimit: 10,
      // 1. always, 2. at specified time
      openMode: 1,
      openTime: 0,
      whitelist: [],
    }
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
