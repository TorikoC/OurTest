const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const router = new Router();

router.post('/', async (ctx) => {
  const {
    email,
    password,
  } = ctx.request.body;
  console.log(email, password);

  const where = {
    email,
  };
  const user = await User.findOne(where);
  console.log(user);
  if (user && user.password === password) {
    const token = await jwt.sign({ username: 'hawl' }, '42');
    ctx.body = { token };
  } else {
    ctx.body = 'error';
  }
});

module.exports = router;
