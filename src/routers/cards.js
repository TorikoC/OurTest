const Router = require('koa-router');
const Card = require('../models/cards');

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

  const result = await Card.findOne(where);

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

module.exports = router;