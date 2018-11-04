const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user');
const Result = require('../models/result');

const router = new Router();
const secret = config.get('jwt-secret');

router.post('/', async (ctx) => {
  const {
    email,
    password,
  } = ctx.request.body;

  const where = {
    email,
  };

  const user = await User.findOne(where);
  if (!user) {
    ctx.throw('user not exist.');
  } 
  const results = await Result.find({username: user.username});
  if (user && user.password === password) {
    user.activities.push(`
      login from ${ctx.request.ip}, ${new Date().toLocaleString()}
    `)
    const token = await jwt.sign({ username: user.username, email: user.email }, secret);
    ctx.body = {
      token,
      user: {
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        bio: user.bio,
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
