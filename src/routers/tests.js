const Router = require('koa-router');
const Test = require('../models/test');

const router = new Router();

router.get('/', async (ctx) => {
  const results = await Test.find({});
  ctx.body = results;
});
router.get('/:title', async (ctx) => {
  const { title } = ctx.params;
  const where = { title };
  const result = await Test.findOne(where);
  ctx.body = result;
});

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  const result = await Test.create(body);
  ctx.body = result;
});

module.exports = router;
