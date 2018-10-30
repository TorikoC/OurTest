const Router = require('koa-router');
const Card = require('../models/cards');
const jwt = require('koa-jwt');
const getRating = require('../tools/getRating');

const router = new Router();

router.get('/', async (ctx) => {
  const results = await Card.find({});
  ctx.body = results;
})

router.get('/:title', async (ctx) => {
  const {
    title
  } = ctx.params;

  const where = {
    title,
  };

  const result = await Card.findOne(where).lean();

  // result.stars =[];
  // result.vote = {
  //   count: 1,
  //   disable: true,
  // }
  result.rating = getRating(result.stars);

  ctx.body = result;
})

router.post('/', async (ctx) => {
  const {
    body
  } = ctx.request;

  const result = await Card.create(body);

  ctx.body = result;
})

router.put('/:title', async (ctx) => {
  const { body } = ctx.request;
  const { title } = ctx.params;
  const card = await Card.findOne({ title });
  // const { username } = ctx.state.user;

  Object.assign(card, body);

  card.save();
  ctx.body = card;
})

router.put('/stars/:title', jwt({
  secret: '42',
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