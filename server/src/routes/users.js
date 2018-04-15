const Router = require('koa-router')
const router = new Router({prefix: '/api/0/users'})

const query = require('../db/querries/users')

router.get('/:user', async ctx => {
  try {
    const user = await query.getUser(ctx.params.user)

    ctx.status = 201
    ctx.body = {
      status: 'success',
      data: user
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

module.exports = router
