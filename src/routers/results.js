const Router = require('koa-router');
const Result = require('../models/result');

const router = new Router();

router.get('/', async(ctx) => {
  let { username, page } = ctx.request.query;
  page = +page || 1;
  const where = {
    username,
  }; 
  
  const limit = 20;
  const skip = (page - 1) * limit;
  const results = await Result.find(where).skip(skip).limit(limit);
  const total = await Result.count(where);
  ctx.body = { total, results };
})

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const result = await Result.findOne({_id: id});
  console.log('get', result);
  ctx.body = result;
})

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  ctx.body = await Result.create(body);
})

module.exports = router;
