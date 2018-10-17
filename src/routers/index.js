const Router = require('koa-router');
const apiRouter = require('./api.js');

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('index');
});

router.use('/', apiRouter.routes(), apiRouter.allowedMethods());

router.get('*', async (ctx) => {
  await ctx.render('index');
});

module.exports = router;
