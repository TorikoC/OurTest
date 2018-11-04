const Router = require('koa-router');
const Card = require('../models/cards');
const User = require('../models/user');
const jwt = require('koa-jwt');
const getRating = require('../tools/getRating');

const SECRET = '42';

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

router.get('/:title', async (ctx) => {
  const {
    title
  } = ctx.params;

  const where = {
    title,
  };

  const result = await Card.findOne(where).lean();

  result.rating = getRating(result.stars);

  ctx.body = result;
})

router.post('/', jwt({
  secret: SECRET,
}), async (ctx) => {
  const {
    body
  } = ctx.request;

  const result = await Card.create(body);

  ctx.body = result;
})

router.put('/comments/:title', jwt({
  secret: SECRET,
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
  secret: SECRET,
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

module.exports = router;