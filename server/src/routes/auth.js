const Router = require('koa-router')
const router = new Router({prefix: '/api/0/auth'})

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userQuery = require('../db/querries/users')

// Log in
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

    ctx.status = 200
    ctx.body = { 'token': token }
  } catch (err) {
    ctx.status = 403
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// generate admin API token
router.post('/apps/:id', async ctx => {
  try {
    var token = jwt.sign({
      mail: ctx.request.body.mail,
      app: ctx.params.id,
      admin: true,
      aud: ctx.request.body.mail,
      iss: 'https://aggrandize.io/'
    }, 'secret')

    ctx.status = 200
    ctx.body = { 'token': token }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// validate admin API token
router.get('/apps', async ctx => {
  try {
    const token = ctx.request.header.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'secret')

    if (decoded.admin && decoded.app === ctx.request.body.app && decoded.iss === 'https://aggrandize.io') {
      throw Error('Access denied. Invalid token.')
    }

    var userDoc = await userQuery.getUser(ctx.request.body.user)

    var access = false
    for (let i in userDoc.apps) {
      if (userDoc.apps[i].id === ctx.request.body.app) {
        access = true
      }
    }

    if (!access) {
      throw Error('Access denied. User does not have access.')
    }

    ctx.status = 200
    ctx.body = {access: 'granted'}
  } catch (err) {
    ctx.status = 403
    ctx.body = {access: 'denied', reason: err.message}
  }
})

module.exports = router
