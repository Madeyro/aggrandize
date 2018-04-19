const Router = require('koa-router')
const router = new Router({prefix: '/api/0/auth'})

const jwt = require('jsonwebtoken')
const userQuery = require('../db/querries/users')

router.post('/', async ctx => {
  try {
    const user = await userQuery.getUser(ctx.request.body.mail)
    console.log(user)

    if (user.password !== ctx.request.body.password) {
      throw Error('Password does not match')
    }

    var token = jwt.sign({
      admin: true,
      mail: ctx.request.body.mail,
      aud: ctx.request.body.mail,
      iss: 'https://aggrandize.io/'
    }, 'secret', { expiresIn: '1h' })
    ctx.body = { 'token': token }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// router.post('/token', async ctx => {
//   try {
//     const token = ctx.request.header.authorization.split(' ')[1]
//     const decoded = jwt.verify(token, 'secret')
//     ctx.body = decoded
//   } catch (err) {
//     ctx.body = err.message
//   }
// })

module.exports = router
