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
  totalScore: {
    type: Number,
    default: 0,
  },
  category: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
  },
  questions: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  stars: {
    type: Array,
    default: [],
  },
  vote: {
    type: Object,
    default: {
      disable: false,
      count: 0,
    }
  },
  settings: {
    type: Object,
    default: {
      // 0 public, 1 private
      accessbility: 0,
      // 0. all questions, 1. each question
      timerMode: 0,
      // minutes
      timeLimit: {
        minutes: 0,
        seconds: 10,
      },
      // 0. always, 1. scheduled.
      schedule: 0,
      scheduleAt: 0,
      whitelist: [],
    }
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
