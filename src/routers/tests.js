const Router = require('koa-router');
const Test = require('../models/test');

const router = new Router();

router.get('/', async(ctx) => {
  const { username } = ctx.request.query;
  const where = {}; 
  if (username) {
    where.author = username;
  }
  console.log(where);
  const results = await Test.find(where);
  ctx.body = results;
})

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

router.put('/:title', async (ctx) => {
  const { body } = ctx.request;
  const { title } = ctx.params;
  const test = await Test.findOne({ title });
  const newTest = Object.assign(test, body);
  newTest.save();
  ctx.body = newTest;
});

module.exports = router;
