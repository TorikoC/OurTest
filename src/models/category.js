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
      name: '计算机',
      children: [
        {
          name: '编程语言',
          children: [
            {
              name: 'JavaScript',
              children: [],
            },
            {
              name: 'Python',
              children: [],
            }
          ],
        },
        {
          name: '计算机网络',
          children: [],
        },
        {
          name: '数据结构和算法',
          children: [],
        }
      ],
    }, {
      name: '外语',
      children: [
        {
          name: '英语',
          children: [],
        },
        {
          name: '日语',
          children: [],
        },
      ]
    }
  ]
  await Category.create(docs);
})()


module.exports = Category;

