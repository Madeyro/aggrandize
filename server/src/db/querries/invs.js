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

module.exports = {
  addInv,
  getInv,
  declineInv,
  accept
}
