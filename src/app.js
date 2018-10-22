const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const serve = require('koa-static');
const path = require('path');
const views = require('koa-views');

const router = require('./routers');

mongoose.connect('mongodb://127.0.0.1:27017/ourtest', (err) => {
  if (err) {
    throw err;
  }
});

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});
app.on('error', (err, ctx) => {
  console.log('error logged.');
});

app.use(views(path.join(__dirname, 'public'), {
  map: {
    html: 'pug',
  },
}));
app.use(serve(path.join(__dirname, 'public')));
app.use(serve(path.join(__dirname, 'static')));
app.use(koaBody({ multipart: true }));
app.use(bodyParser({
  onerror(err, ctx) {
    ctx.throw('body parse error', 422);
  },
}));
app.use(cors({ credentials: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001);
