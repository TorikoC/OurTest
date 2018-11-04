const Router = require('koa-router');
const Result = require('../models/result');

const router = new Router();

const jwt = require('koa-jwt');
const config = require('config');

const secret = config.get('jwt-secret');

router.get('/', async(ctx) => {
  let { 
    title,
    username, 
    page,
    limit,
    keyword,
  } = ctx.request.query;
  title = title || '',
  username = username || '',
  page = +page || 1;
  limit = +limit || 20;
  keyword = keyword || '';
  
  const where = {};

  if (keyword) {
    where.title = {
      $regex: keyword,
    }
  }
  if (title) {
    where.title = title;
  }
  if (username) {
    where.username = username;
  }
  
  const skip = (page - 1) * limit;
  const results = await Result.find(where).skip(skip).limit(limit);
  const total = await Result.count(where);
  ctx.body = { total, results };
})

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const result = await Result.findOne({_id: id});
  ctx.body = result;
})

router.post('/', jwt({
  secret
}), async (ctx) => {
  const { body } = ctx.request;
  ctx.body = await Result.create(body);
})

module.exports = router;
