const Router = require('koa-router');
const config = require('config');
const Request = require('../models/request');
const RequestComment = require('../models/request-comment');

const jwt = require('koa-jwt');
const secret = config.get('jwt-secret'); 

const router = new Router();

router.get('/', async (ctx) => {
  let { 
    username, 
    page,
    limit,
    target,
    keyword,
    status,
  } = ctx.request.query;

  username = username || '';

  page = +page || 1;
  limit = +limit || 20;

  keyword = keyword || '';
  target = target || '';
  status = +status || '';

  let where = {}; 

  if (target === 'title') {
    where.title = {
      $regex: keyword,
    }
  } else if (target === 'description') {
    where.description = {
      $regex: keyword,
    }
  } else {
    Object.assign(where, {
      $or: [
        {
          title: {
            $regex: keyword,
          }
        },
        {
          description: {
            $regex: keyword,
          }
        }
      ]
    })
  }

  if (status === config.get('request-approved')) {
    where.status = config.get('request-approved');
  } else if (status === config.get('request-unapproved')) {
    where.status = config.get('request-unapproved');
  } 

  if (username) {
    where.username = username;
  }

  const skip = (page - 1) * limit;
  const results = await Request.find(where).skip(skip).limit(limit).sort({
    createdAt: -1,
  });
  const total = await Request.count(where);
  ctx.body = { results, total };
})

router.get('/:title', jwt({
  secret,
}), async (ctx) => {
  const { title } = ctx.params;

  const result = await Request.findOne({title}).lean();
  const comments = await RequestComment.find({title}).lean();
  console.log(comments);
  result.comments = comments;

  ctx.body = result;
})

router.put('/:title/status', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;
  const  { title } = ctx.params;
  const result = await Request.findOne({title});

  result.status = +body.status;
  if (result.status === config.get('request-approved')) {
    result.approvedIndex = body.approvedIndex;
  }
  result.save();
  ctx.body = '';
})

router.get('/:title/comments', async (ctx) => {
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
  const results = await RequestComment.find(where).skip(skip).limit(limit);
  const total = await RequestComment.count(where);

  ctx.body = { 
    results,
    total,
  };
})

router.post('/:title/comments', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;

  ctx.body = await RequestComment.create(body);
})

router.post('/', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;
  const { username } = ctx.state.user;

  body.username = username;
  body.createdAt = Date.now();

  Request.create(body);
})

module.exports = router;
