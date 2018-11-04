const Router = require('koa-router');
const Test = require('../models/test');
const jwt = require('koa-jwt');
const getRating = require('../tools/getRating');

const config = require('config');
const secret = config.get('jwt-secret');

const router = new Router();

router.get('/', async(ctx) => {
  let { 
    username, 
    page,
    limit,
    keyword,
    category,
  } = ctx.request.query;

  page = +page || 1;
  limit = +limit || 20;
  keyword = keyword || '';
  category = category || '';

  const tags = keyword.split(',').filter(obj => obj.trim() !== '').map((obj) => obj.trim());

  let where = {
    'settings.accessbility': 0,
    $or: [
      {
        title: {
          $regex: keyword,
        },
      },
      {
        tags: {
          $all: tags
        }
      }
    ],
  }; 
  if (category) {
    category = category.split(',').filter((obj) => obj.trim() !== '');
    where.category = {
      $all: category,
    }
  }
  if (username) {
    where.author = username;
    delete where['settings.accessbility'];
  }
  const skip = (page - 1) * limit;
  const results = await Test.find(where).skip(skip).limit(limit);
  const total = await Test.count(where);
  ctx.body = { results, total };
})

router.get('/:title', jwt({
  secret: '42',
}), async (ctx) => {
  const { title } = ctx.params;
  const { email, username } = ctx.state.user;
  const where = { title };
  const result = await Test.findOne(where).lean();

  result.rating = getRating(result.stars);

  result.stars.forEach((obj) => {
    if (obj.username === username) {
      result.vote.disable = true;
      result.vote.count = obj.count ;
    }
  })
  if (result.settings.accessbility) {
    try {
      if (!email || (result.settings.whitelist.indexOf(email) === -1 && result.author !== username)) {
        ctx.throw(new Error('this test is private, memebers only.'));
      } else {
        ctx.body = result;
      }
    } catch (err) {
      ctx.throw(new Error('this test is private, memebers only.'));
    }
  } else {
    ctx.body = result;
  }
});

router.post('/', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;
  body.tags = body.tags.split(',').filter(obj => obj.trim() !== '').map((obj) => obj.trim());
  body.category = body.category.split(',').filter(obj => obj.trim() !== '').map((obj) => obj.trim());
  const result = await Test.create(body);
  ctx.body = result;
});

router.put('/:title', jwt({
  secret,
}), async (ctx) => {
  delete ctx.request.body.__v;
  const { body } = ctx.request;
  const { title } = ctx.params;
  const test = await Test.findOne({ title });
  Object.assign(test, body);
  test.save();
  ctx.body = test;
});

router.put('/stars/:title', jwt({
  secret
}), async (ctx) => {
  const { count } = ctx.request.body;
  const { title } = ctx.params;
  const test = await Test.findOne({ title });
  const { username } = ctx.state.user;

  if (test) {
    test.stars.push({
      username,
      count,
    });
  }

  test.save();
  ctx.body = test;
})

router.del('/:title', jwt({
  secret
}), async (ctx) => {
  const { title } = ctx.params;
  const { username } = ctx.state.user;
  const result = await Test.findOne({title});
  console.log(result);
  if (result && result.author === username) {
    ctx.body = await Test.remove({title});
  } else {
    ctx.throw('Test not exist or user not authenticated.');
  }
})

module.exports = router;
