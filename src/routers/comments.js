const Router = require('koa-router');

const User = require('../models/user');
const Test = require('../models/test');
const Card = require('../models/cards');
const Comment = require('../models/comment');

const jwt = require('koa-jwt');
const SECRET = '42';

const router = new Router();

router.get('/users/:username', async (ctx) => {
  const { username } = ctx.params;
  let {
    page, 
    limit,
    keyword,
  } = ctx.request.query;

  page = +page || 1;
  limit = +limit || 20;
  keyword = keyword || '';

  const where = {
    username,
    $or: [{
      title: {
        $regex: keyword,
      }
    }, {
      content: {
        $regex: keyword,
      },
    }],
  }; 

  const skip =  (page - 1) * limit;
  const results = await Comment.find(where).skip(skip).limit(limit);
  const total = await Comment.count(where);
  ctx.body = { results, total };
});

router.post('/tests/:title', jwt({
  secret: SECRET,
}), async (ctx) => {
  const { username } = ctx.state.user;
  const { title } = ctx.params;
  const { body } = ctx.request;

  const user = await User.findOne({ username });
  const test = await Test.findOne({ title });

  user.comments.push(body);
  test.comments.push(body);

  user.save();
  test.save();

  ctx.body = 0;
});

router.post('/cards/:title', jwt({
  secret: SECRET,
}), async (ctx) => {
  const { username } = ctx.state.user;
  const { title } = ctx.params;
  const { body } = ctx.request;

  const user = await User.findOne({ username });
  const card = await Card.findOne({ title });

  user.comments.push(body);
  card.comments.push(body);

  
  user.save();
  card.save();

  ctx.body = 0;
});

module.exports = router;
