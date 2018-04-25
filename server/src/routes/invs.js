const Router = require('koa-router')
const router = new Router({prefix: '/api/0/inv'})
const iplocation = require('iplocation')

const userQuery = require('../db/querries/users')
const invQuery = require('../db/querries/invs')
const timeStamp = require('../utils/timestamp')

// accept invitation
router.put('/:id', async ctx => {
  try {
    var invDoc = await invQuery.getInv(ctx.params.id)
    var newUser
    try {
      newUser = await userQuery.getUser(invDoc.to)
      for (var index in newUser.apps) {
        if (newUser.apps[index].id === invDoc.app) {
          await invQuery.declineInv(ctx.params.id)
          throw Error('User already has access to app.')
        }
      }
      newUser.apps.push({
        id: invDoc.app,
        used_inv: 0,
        free_inv: 5
      })
    } catch (err) {
      newUser = {
        _id: invDoc.to,
        type: 'user',
        apps: [
          {
            id: invDoc.app,
            used_inv: 0,
            free_inv: 5
          }
        ]
      }
    }

    const res = await userQuery.addUser(newUser)
    const ipLocation = await iplocation(ctx.request.ip)
    // add metadata to invitation
    invDoc['accepted'] = {
      date: timeStamp(),
      location: {
        city: ipLocation.city,
        region: ipLocation.region_name,
        country: ipLocation.country_name
      }
    }
    invQuery.accept(invDoc)

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

// decline invitation
router.delete('/:id', async ctx => {
  try {
    const res = await invQuery.declineInv(ctx.params.id)

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

module.exports = router
