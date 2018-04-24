const db = require('../auth')
const userQuery = require('./users')

async function addInv (invJson) {
  const res = await db.insert(invJson)
  return res[0] // cut off metadata
}

async function getInv (invId) {
  const res = await db.get(invId)
  return res[0]
}

async function getSentCount (appId) {
  const res = await db.view('views', 'sent_invs', { key: `${appId}` })
  if (res[0].rows.length) {
    return res[0].rows[0].value
  } else {
    return 0
  }
}

async function getFreeCount (appId) {
  const res = await db.view('views', 'free_invs', { key: `${appId}` })
  if (res[0].rows.length) {
    return res[0].rows[0].value
  } else {
    return 0
  }
}

async function declineInv (invId) {
  const invDoc = await getInv(invId)
  var invitator = await userQuery.getUser(invDoc.from)

  for (var index in invitator.apps) {
    if (invitator.apps[index].id === invDoc.app) {
      invitator.apps[index].used_inv -= 1 // todo break if 0
      invitator.apps[index].free_inv += 1
      break
    }
  }
  const res = await db.destroy(invId, invDoc._rev)
  await userQuery.addUser(invitator)
  return res[0]
}

async function accept (invDoc) {
  const res = await addInv(invDoc)
  return res[0]
}

async function sentByUser (userId) {
  const res = await db.view('views', 'users_invs', { key: `${userId}` })
  return res[0].rows
}

module.exports = {
  addInv,
  getInv,
  getSentCount,
  getFreeCount,
  declineInv,
  accept,
  sentByUser
}
