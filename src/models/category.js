const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  children: {
    type: Array,
    default: [],
  }
});

const Category = mongoose.model('Category', CategorySchema);

(async () => {
  await Category.remove({});
  const docs = [
    {
      name: 'programming',
      children: [
        {
          name: 'JavaScript',
          children: [],
        }
      ],
    }, {
      name: 'Math',
      children: [
        {
          name: 'linear algebar very long long tags',
          children: [],
        }
      ],
    }, {
      name: 'language',
      children: [
        {
          name: 'English',
          children: [],
        },
        {
          name: 'Japanese',
          children: [],
        },
        {
          name: 'Chinese',
          children: [],
        }
      ]
    }
  ]
  await Category.create(docs);
})()


module.exports = Category;

