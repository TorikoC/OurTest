const Router = require('koa-router');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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
    username,
  } = ctx.state.user;
  const {
    email,
    bio,
  } = ctx.request.body;

  if (!email) {
    ctx.throw('authentication error');
  }
  const user = await User.findOne({ username });
  
  const { avatar } = ctx.request.files;
  if (avatar && avatar.size > 0) {
    const getType = (type) => {
      if (type.indexOf('jpeg') !== -1) {
        return 'jpg';
      } else if (type.indexOf('png') !== -1) {
        return 'png';
      }
      return 'jpg';
    }
    fs.unlinkSync(path.join(__dirname, '..', 'static/avatar/', user.avatar.split('/').pop()));
    const rs = fs.createReadStream(avatar.path);
    const name = Date.now() + '.' + getType(avatar.type);
    const ws = fs.createWriteStream(path.join(__dirname, '..', 'static/avatar/', name));
    rs.pipe(ws);
    user.avatar = 'http://localhost:3001/avatar/' + name;
    console.log('uploading %s -> %s', avatar.name, ws.path);
  } 
  if (email) {
    user.email = email;
  }
  if (bio) {
    user.bio = bio;
  }
  user.save();
  ctx.body = user;
  // console.log(user);
  // if (user) {
  //   if (user.testHistories) {
  //     user.testHistories.push(result);
  //   } else {
  //     user.testHistories = [result];
  //   }
  //   user.save();
  //   ctx.body = 'ok';
  // }
});

module.exports = router;
