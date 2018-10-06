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

module.exports = router;
