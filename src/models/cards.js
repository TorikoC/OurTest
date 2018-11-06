const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
  intro: {
    type: String,
    default: '',
  },
  category: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Number,
    default: 0,
  },
  cards: {
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
  comments: {
    type: Array,
    default: [],
  },
  settings: {
    type: Object,
    default: {
      accessbility: 0,
    }
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
