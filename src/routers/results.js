const Router = require('koa-router');
const Result = require('../models/result');

const router = new Router();

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const result = await Result.findOne({_id: id});
  console.log('get', result);
  ctx.body = result;
})

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  console.log(body);
  Result.create(body);
  ctx.body = 'ok';
})

module.exports = router;
