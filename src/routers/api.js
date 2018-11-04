const Router = require('koa-router');
const loginRouter = require('./login');
const userRouter = require('./users');
const testRouter = require('./tests');
const cardsRouter = require('./cards');
const mailRouter = require('./mail');
const resultRouter = require('./results');
const tagsRouter = require('./tags');
const categoryRouter = require('./category');
const commentRouter = require('./comments');

const router = new Router();

router.prefix('api');

router.use('/login', loginRouter.routes());
router.use('/users', userRouter.routes());
router.use('/tests', testRouter.routes());
router.use('/cards', cardsRouter.routes());
router.use('/sendmail', mailRouter.routes());
router.use('/results', resultRouter.routes());
router.use('/tags', tagsRouter.routes());
router.use('/category', categoryRouter.routes());
router.use('/comments', commentRouter.routes());

module.exports = router;
