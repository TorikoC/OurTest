const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = new Router();

router.post('/', async (ctx) => {
  const {
    email,
    password,
  } = ctx.request.body;

  const where = {
    email,
  };

  const user = await User.findOne(where);

  if (user && user.password === password) {
    const token = await jwt.sign({ username: user.username, email: user.email }, '42');
    ctx.body = {
      token,
      user: {
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        testHistories: user.testHistories.slice(0, 10),
        comments: user.comments.slice(0, 10),
      },
    };
  } else {
    ctx.throw(401, 'incorrect email or password.');
  }
});

module.exports = router;
