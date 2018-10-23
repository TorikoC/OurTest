const Router = require('koa-router');
const Test = require('../models/test');
const jwt = require('koa-jwt');

const router = new Router();

router.get('/', async(ctx) => {
  let { 
    username, 
    page,
    limit,
    keyword,
  } = ctx.request.query;

  page = +page || 1;
  limit = +limit || 20;
  keyword = keyword || '';

  let where = {
    'settings.accessbility': 0,
    title: {
      $regex: keyword,
    },
  }; 
  if (username) {
    where.author = username;
    delete where['settings.accessbility'];
  }
  const skip = (page - 1) * 20;
  const results = await Test.find(where).skip(skip).limit(limit);
  const total = await Test.count(where);
  ctx.body = { results, total };
})

router.get('/:title', jwt({
  secret: '42',
}), async (ctx) => {
  const { title } = ctx.params;
  const where = { title };
  const result = await Test.findOne(where);
  if (result.settings.accessbility) {
    try {
      const { email, username } = ctx.state.user;
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

router.post('/', async (ctx) => {
  const { body } = ctx.request;
  const result = await Test.create(body);
  ctx.body = result;
});

router.put('/:title', async (ctx) => {
  const { body } = ctx.request;
  const { title } = ctx.params;
  const test = await Test.findOne({ title });
  Object.assign(test, body);
  test.save();
  ctx.body = test;
});

module.exports = router;
