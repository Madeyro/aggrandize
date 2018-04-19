const Router = require('koa-router')
const router = new Router({prefix: '/api/0/users'})

const timeStamp = require('../utils/timestamp')
const userQuery = require('../db/querries/users')
const invQuery = require('../db/querries/invs')

router.get('/:user', async ctx => {
  try {
    const user = await userQuery.getUser(ctx.params.user)

    ctx.status = 200
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

router.post('/register', async ctx => {
  try {
    ctx.body = await userQuery.addUser({
      _id: ctx.request.body.mail,
      type: 'user',
      password: ctx.request.body.password
    })
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.put('/:user/:app/sendinv/:invited', async ctx => {
  try {
    var invitator = await userQuery.getUser(ctx.params.user)
    var freeInv = 0
    for (var index in invitator.apps) {
      if (invitator.apps[index].id === ctx.params.app) {
        freeInv = invitator.apps[index].free_inv
        invitator.apps[index].free_inv -= 1 // todo break if 0
        invitator.apps[index].used_inv += 1
        break
      }
    }

    if (!freeInv) {
      throw Error('User does not have any free invitations to send.')
    }

    var inv = {
      type: 'inv',
      app: ctx.params.app,
      from: ctx.params.user,
      to: ctx.params.invited,
      sent: `${timeStamp()}`
    }

    var res = await invQuery.addInv(inv)
    await userQuery.addUser(invitator)
    res['url'] = Router.url('/api/0/inv/:id', {id: `${res.id}`})

    ctx.status = 201
    ctx.body = {
      status: 'success',
      data: res
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
