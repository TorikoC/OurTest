const Router = require('koa-router');
const config = require('config');
const Post = require('../models/post');
const PostReply = require('../models/post-reply');
const jwt = require('koa-jwt');

const secret = config.get('jwt-secret');

const router = new Router();

router.get('/', async (ctx) => {
  let {
    category,
    keyword,
    page,
    limit,
  } = ctx.request.query;

  category = category || '';
  keyword = keyword || '';
  page = +page || 1;
  limit = +limit || 20;
  const skip = (page - 1) * limit;
  
  const where = {};

  if (category) {
    where.category = category;
  }
  if (keyword) {
    where.title = {
      $regex: keyword,
    }
  }

  const results = await Post.find(where).skip(skip).limit(limit);
  const total = await Post.count(where);

  ctx.body = { 
    results,
    total,
  };
})

router.get('/:title', jwt({
  secret,
}), async (ctx) => {
  const { title } = ctx.params;

  const result = await Post.findOne({title}).lean();

  const replys = await PostReply.find({title}).lean();

  result.replys = replys;

  ctx.body = result;
})

router.get('/:title/replys', async (ctx) => {
  let {
    page,
    limit,
  } = ctx.request.query;

  const { title } = ctx.params;

  page = +page || 1;
  limit = +limit || 20;

  const where = {
    title,
  }

  const skip = (page - 1) * limit;
  const results = await PostReply.find(where).skip(skip).limit(limit);
  const total = await PostReply.count(where);

  ctx.body = { 
    results,
    total,
  };
})

router.post('/:title/replys', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;

  ctx.body = await PostReply.create(body);
})

router.post('/', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;

  Post.create(body);

  ctx.body = '';
})

module.exports = router;