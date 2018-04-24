const Router = require('koa-router')
const router = new Router({prefix: '/api/0/auth'})

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userQuery = require('../db/querries/users')

router.post('/', async ctx => {
  try {
    const user = await userQuery.getUser(ctx.request.body.mail)

    var doesMatch = await bcrypt.compare(ctx.request.body.password, user.password)
    if (!doesMatch) {
      throw Error('Password does not match')
    }

    const adminApps = await userQuery.adminApps(user._id)
    const userApps = await userQuery.userApps(user._id)

    var token = jwt.sign({
      mail: ctx.request.body.mail,
      apps: userApps.value,
      admin: adminApps,
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

router.post('/apps/:id', async ctx => {
  try {
    var token = jwt.sign({
      mail: ctx.request.body.mail,
      app: ctx.params.id,
      admin: true,
      aud: ctx.request.body.mail,
      iss: 'https://aggrandize.io/'
    }, 'secret')
    ctx.body = { 'token': token }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.post('/token', async ctx => {
  try {
    const token = ctx.request.header.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'secret')
    ctx.body = decoded
  } catch (err) {
    ctx.body = err.message
  }
})

module.exports = router
