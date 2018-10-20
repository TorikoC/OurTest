const Router = require('koa-router');

const User = require('../models/user');
const Test = require('../models/test');
const Comment = require('../models/comment');

const router = new Router();

router.get('/', async (ctx) => {
  const { username } = ctx.request.query;
  const where = {
    username,
  }; 
  const results = await Comment.find(where);
  ctx.body = results;

});

router.post('/', async (ctx) => {
  const { email, username } = ctx.state.user;
  const { title, comment } = ctx.request.body;
  if (email && title) {
    // TODO
    // 下面两步可以同时执行
    const user = await User.findOne({ email });
    const test = await Test.findOne({ title });
    Comment.create({
      title,
      username: user.username,
      avatar: 'http://localhost:8081/logo.png',
      content: comment,
      // TODO:
      // use createdAt from client
      createdAt: Date.now(),
    });
    if (user && user.comments) {
      user.comments.push({
        title,
        content: comment,
        dateTime: Date.now(),
      });
    }
    if (test && test.comments) {
      test.comments.push({
        avatar: 'http://localhost:8081/logo.png',
        username,
        content: comment,
        dateTime: Date.now(),
      });
    }
    user.save();
    await test.save();
    ctx.body = 'ok';
  } else {
    ctx.body = 'error';
  }
});

module.exports = router;
