const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const router = require('./routers');

mongoose.connect('mongodb://127.0.0.1:27017/ourtest', (err) => {
  if (err) {
    throw err;
  }
});

const app = new Koa();

app.use(bodyParser({
  onerror(err, ctx) {
    ctx.throw('body parse error', 422);
  },
}));
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000);
