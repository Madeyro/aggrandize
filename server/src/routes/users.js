const Router = require('koa-router')
const router = new Router({prefix: '/api/0/users'})

const timeStamp = require('../utils/timestamp')
const userQuery = require('../db/querries/users')
const appQuery = require('../db/querries/apps')
const invQuery = require('../db/querries/invs')

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/:user', async ctx => {
  try {
    const user = await userQuery.getUser(ctx.params.user)

    ctx.status = 200
    ctx.body = user
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
    var hash = await bcrypt.hash(ctx.request.body.password, saltRounds)
    ctx.status = 201
    ctx.body = await userQuery.addUser({
      _id: ctx.request.body.mail,
      type: 'user',
      password: hash,
      apps: []
    })
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// send invite
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
    res['url'] = Router.url('localhost/acceptinv/:id', {id: `${res.id}`})

    ctx.status = 201
    ctx.body = res
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.get('/:user/adminto', async ctx => {
  try {
    const res = await userQuery.adminApps(ctx.params.user)

    ctx.status = 200
    ctx.body = res
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.get('/:user/apps', async ctx => {
  try {
    const res = await userQuery.userApps(ctx.params.user)

    ctx.status = 200
    ctx.body = res
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// get all waitling lists
router.get('/:user/waitlists', async ctx => {
  try {
    var occupiedView = await appQuery.getListOccupation(null)

    var waitlists = []

    for (let i in occupiedView) {
      let listDoc = await appQuery.getListDoc(occupiedView[i].key)
      console.log(listDoc)

      let listSize = await appQuery.getListSize(occupiedView[i].key)
      console.log(listSize)

      let applied = 'No'
      listDoc.value.users.forEach(user => {
        if (user === ctx.params.user) {
          applied = 'Yes'
        }
      })
      waitlists.push({
        name: occupiedView[i].key,
        freeSlots: Number(listSize) - Number(occupiedView[i].value),
        applied: applied
      })
    }

    ctx.status = 200
    ctx.body = waitlists
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// all sent invitations by user
router.get('/:user/sentinvs', async ctx => {
  try {
    ctx.status = 200
    ctx.body = await invQuery.sentByUser(ctx.params.user)
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

module.exports = router
