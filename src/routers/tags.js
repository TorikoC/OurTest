const Router = require('koa-router');
const router = new Router();
const Test = require('../models/test');

router.get('/', async (ctx) => {
  const where = {};
  const tests = await Test.find(where);
  
  const table = {};
  tests.forEach((test) => {
    test.tags.forEach((tag) => {
      if (table[tag]) {
        table[tag] += 1;
      } else {
        table[tag] = 1;
      }
    })
  })
  const result = [];
  for(let key in table) {
    result.push({
      tag: key,
      count: table[key],
    })
  }
  result.sort((o1, o2) => o2.count - o1.count);
  ctx.body = result;
});

module.exports = router;
