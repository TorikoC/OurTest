const Router = require('koa-router');
const Card = require('../models/cards');
const CardComment = require('../models/card-comment');
const User = require('../models/user');
const jwt = require('koa-jwt');
const getRating = require('../tools/getRating');

const config = require('config');

const secret = config.get('jwt-secret');

const router = new Router();

router.get('/', async (ctx) => {
  let { 
    username, 
    page,
    limit,
    keyword,
    category,
  } = ctx.request.query;

  page = +page || 1;
  limit = +limit || 20;
  keyword = keyword || '';
  category = category || '';

  const tags = keyword.split(',').filter(obj => obj.trim() !== '').map((obj) => obj.trim());

  let where = {
    $or: [
      {
        title: {
          $regex: keyword,
        },
      },
      {
        tags: {
          $all: tags
        }
      }
    ],
  }; 
  if (category) {
    category = category.split(',').filter((obj) => obj.trim() !== '');
    where.category = {
      $all: category,
    }
  }
  if (username) {
    where.author = username;
    delete where['settings.accessbility'];
  }
  const skip = (page - 1) * limit;
  const results = await Card.find(where).skip(skip).limit(limit);
  const total = await Card.count(where);
  ctx.body = { results, total };
})

router.get('/:title', jwt({
  secret,
}), async (ctx) => {
  const {
    title
  } = ctx.params;

  const where = {
    title,
  };

  const { username } = ctx.state.user;


  const result = await Card.findOne(where).lean();
  const comments = await CardComment.find(where).lean();

  result.comments = comments;

  result.rating = getRating(result.stars);

  if (result.author === username) {
    result.isAuthor = true;
  }

  ctx.body = result;
})

router.post('/', jwt({
  secret,
}), async (ctx) => {
  const {
    body
  } = ctx.request;

  const result = await Card.create(body);

  ctx.body = result;
})

router.put('/comments/:title', jwt({
  secret,
}), async (ctx) => {
  delete ctx.request.body.__v;

  const { body } = ctx.request;
  const { title } = ctx.params;
  const { username } = ctx.state.user;

  const card = await Card.findOne({ title });
  const user = await User.findOne({ username });

  console.log(body, card, user);
  card.comments.push(body);
  body.title = card.title;
  body.type = 'card';
  user.comments.push(body);

  card.save();
  user.save();

  ctx.body = card;
})

router.put('/:title/stars', jwt({
  secret,
}), async (ctx) => {
  const { count } = ctx.request.body;
  const { title } = ctx.params;
  const card = await Card.findOne({ title });
  const { username } = ctx.state.user;

  if (card) {
    card.stars.push({
      username,
      count,
    });
  }

  card.save();
  ctx.body = card;
})

router.put('/:title/settings', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;
  const { title } = ctx.params;
  const { username } = ctx.state.user;

  const card = await Card.findOne({ title });

  if(card.author !== username) {
    ctx.throw(400);
  } else {
    Object.assign(card, body);
    card.save();
    ctx.body = card;
  }
})

router.del('/:title', jwt({
  secret,
}), async (ctx) => {
  const { title } = ctx.params;
  const { username } = ctx.state.user;

  const card = await Card.findOne({ title });
  if(card.author !== username) {
    ctx.throw(400);
  } else {
    ctx.body = await Card.remove({title});
  }
})

router.get('/:title/comments', async (ctx) => {
  let {
    page,
    limit,
  } = ctx.request.query;

  const { title } = ctx.params;

  page = +page || 1;
  limit = +limit || 20;

  const where = {
    title,
  }

  const skip = (page - 1) * limit;
  const results = await CardComment.find(where).skip(skip).limit(limit);
  const total = await CardComment.count(where);

  ctx.body = { 
    results,
    total,
  };
})

router.post('/:title/comments', jwt({
  secret,
}), async (ctx) => {
  const { body } = ctx.request;

  ctx.body = await CardComment.create(body);
})



module.exports = router;