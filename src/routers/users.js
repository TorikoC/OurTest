const Router = require('koa-router');
const User = require('../models/user');

const router = new Router();

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const option = {
    _id: id,
  };
  const user = await User.findOne(option);
  ctx.body = user;
});

router.post('/', async (ctx) => {
  const {
    username,
    email,
    password,
  } = ctx.request.body;

  const option = {
    username,
    email,
    password,
  };

  const result = await User.create(option);
  ctx.body = result;
});

router.put('/', async (ctx) => {
  const {
    email,
  } = ctx.state.user;
  const {
    result,
  } = ctx.request.body;
  if (!email) {
    ctx.throw('authentication error');
  }
  const user = await User.findOne({ email });
  if (user) {
    if (user.testHistories) {
      user.testHistories.push(result);
    } else {
      user.testHistories = [result];
    }
    user.save();
    ctx.body = 'ok';
  }
});

module.exports = router;
