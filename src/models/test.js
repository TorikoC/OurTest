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
      // 0 public, 1 private
      accessbility: 0,
      // 0. all questions, 1. each question
      timerMode: 0,
      // minutes
      timeLimit: 10,
      // 0. always, 1. scheduled.
      schedule: 0,
      scheduleAt: 0,
      whitelist: [],
    }
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
