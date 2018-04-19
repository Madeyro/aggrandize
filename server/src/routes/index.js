const Router = require('koa-router')
const router = new Router({prefix: '/api/0'})

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'This is API. See DOCS for allowed calls.'
  }
})

module.exports = router
