const Router = require('koa-router');
const Category = require('../models/category');

const router = new Router();

router.get('/', async (ctx) => {
  const result = await Category.find({});
  ctx.body = result;
})

module.exports = router;

