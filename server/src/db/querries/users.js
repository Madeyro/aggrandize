const db = require('../auth')
// const apps = require('./apps')

async function getAll (app) {
  const users = await db.view('views', 'all_users', { keys: [`${app}`] })
  return users[0].rows
}

async function getUser (user) {
  const doc = await db.get(user)
  return doc[0] // cut off couchdb metadata
}

async function addUser (data) {
  const doc = await db.insert(data)
  return doc[0] // cut off couchdb metadata
}

async function grantUserAccess (mail, invs, app) {
  var userJson
  var freeInvs = invs
  if (freeInvs == null) {
    invs = 10 // default value
  }
  try {
    userJson = await getUser(mail)
    for (var key in userJson.apps) {
      if (userJson.apps[key].id === app) {
        // already has access to app -> skip
        return null
      }
    }
    // user exits but does not have access to app
    userJson.apps[userJson.apps.length] = {
      'id': `${app}`,
      'used_inv': '0',
      'free_inv': `${invs}`
    }
  } catch (err) {
    // missing -> create new one
    userJson = {
      '_id': `${mail}`,
      'type': 'user',
      'apps': [
        {
          'id': `${app}`,
          'used_inv': '0',
          'free_inv': `${invs}`
        }
      ]
    }
  }
  try {
    return addUser(userJson)
  } catch (err) {
    return err
  }
}

async function addUserBulk (data) {
  return db.bulk(data)
}

async function resizeInv (user, app, newSize) {
  var doc = await getUser(user)
  // create new JSON
  for (var index in doc.apps) {
    if (doc.apps[index].id === app) {
      doc.apps[index].free_inv = newSize
    }
  }
  return addUser(doc)
}

async function deleteUser (user, appId) {
  var json = user.apps

  for (var app in json) {
    if (json[app].id === appId) {
      json.splice(app, 1)
    }
  }
  if (json.length) {
    // build updated version
    var update = {
      '_id': `${user._id}`,
      '_rev': `${user._rev}`,
      'type': 'user',
      'apps': json
    }
    return db.insert(update)
  } else {
    return db.destroy(user._id, user._rev)
  }
}

module.exports = {
  getAll,
  getUser,
  addUser,
  grantUserAccess,
  addUserBulk,
  resizeInv,
  deleteUser
}
