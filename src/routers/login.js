const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Result = require('../models/result');
const Comment = require('../models/comment');

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
  const results = await Result.find({username: user.username});
  const comments = await Comment.find({username: user.username});
  if (user && user.password === password) {
    user.activities.push(`
      login from ${ctx.request.ip}, ${new Date().toLocaleString()}
    `)
    const token = await jwt.sign({ username: user.username, email: user.email }, '42');
    ctx.body = {
      token,
      user: {
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        results: results.slice(0, 10),
        comments: user.comments.slice(0, 10),
        activities: user.activities.slice(0, 10),
      },
    };
    user.save();
  } else {
    ctx.throw(401, 'incorrect email or password.');
  }
});

module.exports = router;
