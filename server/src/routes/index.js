const Router = require('koa-router');
const router = new Router({prefix: "/api/0/"});

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'This is API'
  };
})

module.exports = router;