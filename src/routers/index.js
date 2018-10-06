const jwt = require('koa-jwt');

const Router = require('koa-router');
const userRouter = require('./users');
const loginRouter = require('./login');

const router = new Router();

router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/users', jwt({ secret: '42', cookie: 'token' }), userRouter.routes(), userRouter.allowedMethods());

module.exports = router;
