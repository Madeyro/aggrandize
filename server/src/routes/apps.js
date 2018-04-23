const Router = require('koa-router')
const router = new Router({prefix: '/api/0/apps'})

const appQuery = require('../db/querries/apps')
const userQuery = require('../db/querries/users')
const invQuery = require('../db/querries/invs')

// get app
router.get('/:app', async ctx => {
  try {
    var app = await appQuery.getApp(ctx.params.app)
    ctx.status = 200
    ctx.body = app
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// add app / start program
router.put('/', async ctx => {
  try {
    const existingApp = await appQuery.getApp(ctx.request.body.id)
    // without error -> already exists
    ctx.status = 400
    ctx.body = {
      status: 'Already exists',
      data: existingApp
    }
  } catch (err) {
    // continue to creation
    try {
      var appJson = {
        _id: ctx.request.body.id,
        type: 'app',
        admin: ctx.request.body.admin,
        listsize: Number(ctx.request.body.listsize)
      }

      const app = await appQuery.addApp(appJson)

      ctx.status = 201
      ctx.body = app
    } catch (err) {
      ctx.status = 400
      ctx.body = {
        status: 'error',
        message: err.message || 'Sorry, an error has occurred.'
      }
    }
  }
})

// delte app / cancel program
router.delete('/:app', async ctx => {
  try {
    const appRev = await appQuery.getRev(ctx.params.app)
    const res = await appQuery.deleteApp(ctx.params.app, appRev)

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

// add user to app
router.put('/:app/users/:user', async ctx => {
  const res = await userQuery.grantUserAccess(ctx.params.user, ctx.request.body.invs, ctx.params.app)
  if (res == null) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: 'User already has access to app.'
    }
  } else if (res instanceof Error) {
    throw res
  } else {
    ctx.status = 201
    ctx.body = res
  }
})

// delete user's access to app
router.delete('/:app/users/:user', async ctx => {
  try {
    const userDoc = await userQuery.getUser(ctx.params.user)
    const res = await userQuery.deleteUser(userDoc, ctx.params.app)

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

// get all app users
router.get('/:app/users', async ctx => {
  try {
    const users = await userQuery.getAll(ctx.params.app)

    ctx.status = 200
    ctx.body = users
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// get number of app users
router.get('/:app/users/count', async ctx => {
  try {
    const count = await userQuery.getAllCount(ctx.params.app)

    ctx.status = 200
    ctx.body = count
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.get('/:app/invs/sent', async ctx => {
  try {
    const count = await invQuery.getSentCount(ctx.params.app)

    ctx.status = 200
    ctx.body = count
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.get('/:app/invs/available', async ctx => {
  try {
    const count = await invQuery.getFreeCount(ctx.params.app)

    ctx.status = 200
    ctx.body = count
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// get waiting list
router.get('/:app/waitlist', async ctx => {
  try {
    const users = await appQuery.getList(ctx.params.app)

    ctx.status = 200
    ctx.body = users
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// used slots in waitling list
router.get('/:app/waitlist/occupied', async ctx => {
  try {
    const res = await appQuery.getListOccupation(ctx.params.app)

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

// waitling list size
router.get('/:app/waitlist/size', async ctx => {
  try {
    const res = await appQuery.getListSize(ctx.params.app)

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

// resize waiting list
router.put('/:app/waitlist/newsize/:size', async ctx => {
  try {
    const res = await appQuery.resizeList(ctx.params.app, ctx.params.size)

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

// change # of invs for user
router.put('/:app/users/:user/newinvs/:size', async ctx => {
  try {
    const res = await userQuery.resizeInv(ctx.params.user, ctx.params.app, ctx.params.size)

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

// accept all from waiting list
router.put('/:app/waitlist/acceptall', async ctx => {
  try {
    var list = await appQuery.getList(ctx.params.app)
    list = list.value.users // cut off unused data

    var invs = ctx.request.body.invs
    if (invs == null) {
      invs = 10 // default value
    }

    // Can not use bulk because each user must be checked if he already exists
    for (var index in list) {
      const res = await userQuery.grantUserAccess(list[index], ctx.request.body.invs, ctx.params.app)
      if (res == null) {
        ctx.status = 400
        ctx.body = {
          status: 'error',
          message: 'User already has access to app.'
        }
      } else if (res instanceof Error) {
        throw res
      } else {
        ctx.status = 201
        ctx.body = res // only the last one is in body
      }
    }

    await appQuery.clearList(ctx.params.app)
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

// Apply for waiting list
router.put('/:app/waitlist/:mail', async ctx => {
  try {
    var listDoc = await appQuery.getListDoc(ctx.params.app)

    listDoc = listDoc.value // cut off unused data
    const maxSize = await appQuery.getListSize(ctx.params.app)

    if (listDoc.users.length >= maxSize) {
      // waitlist is full, user can not apply to it
      throw Error('Waiting list is full. User can not apply to it.')
    }

    for (var index in listDoc.users) {
      if (listDoc.users[index] === ctx.params.mail) {
        throw Error('User already is in waiting list.')
      }
    }

    listDoc.users[listDoc.users.length] = ctx.params.mail
    const res = await appQuery.addList(listDoc)

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

module.exports = router
