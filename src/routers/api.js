const jwt = require('koa-jwt');

const Router = require('koa-router');
const userRouter = require('./users');
const loginRouter = require('./login');
const testRouter = require('./tests');
const commentRouter = require('./comments');
const mailRouter = require('./mail');
const resultRouter = require('./results');
const tagsRouter = require('./tags');
const categoryRouter = require('./category');

const router = new Router();

router.prefix('api');
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());

router.use('/users', jwt({
  secret: '42',
  cookie: 'token',
}), userRouter.routes(), userRouter.allowedMethods());

router.use('/tests', testRouter.routes(), testRouter.allowedMethods());
router.use('/sendmail', mailRouter.routes(), mailRouter.allowedMethods());
router.use('/results', resultRouter.routes(), resultRouter.allowedMethods());
router.use('/tags', tagsRouter.routes(), tagsRouter.allowedMethods());
router.use('/category', categoryRouter.routes(), categoryRouter.allowedMethods());

router.use('/comments', jwt({
  secret: '42',
}), commentRouter.routes(), commentRouter.allowedMethods());

module.exports = router;
