const db = require('../auth') // authenticate DB

async function getAll (appId) {
  const users = await db.view('views', 'all_users', { keys: [`${appId}`] })
  return users[0].rows
}

async function getAllCount (appId) {
  const users = await db.view('views', 'user_count', { key: `${appId}` })
  if (users[0].rows.length) {
    return users[0].rows[0].value
  } else {
    return 0
  }
}

async function getUser (userId) {
  const doc = await db.get(userId)
  return doc[0] // cut off couchdb metadata
}

async function addUser (jsonData) {
  const doc = await db.insert(jsonData)
  return doc[0] // cut off couchdb metadata
}

async function grantUserAccess (mail, invs, appId) {
  var userJson
  var freeInvs
  if (invs == null) {
    freeInvs = 10 // default value
  } else {
    freeInvs = Number(invs)
  }
  try {
    userJson = await getUser(mail)
    for (var key in userJson.apps) {
      if (userJson.apps[key].id === appId) {
        // already has access to app -> skip
        return null
      }
    }
    // user exits but does not have access to app
    userJson.apps.push({
      id: appId,
      used_inv: 0,
      free_inv: freeInvs
    })
  } catch (err) {
    // missing -> create new one
    userJson = {
      _id: mail,
      type: 'user',
      apps: [
        {
          id: appId,
          used_inv: 0,
          free_inv: freeInvs
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

async function addUserBulk (jsonData) {
  return db.bulk(jsonData)
}

async function resizeInv (userId, appId, newSize) {
  var doc = await getUser(userId)
  // create new JSON
  for (var index in doc.apps) {
    if (doc.apps[index].id === appId) {
      doc.apps[index].free_inv = Number(newSize)
      break
    }
  }
  return addUser(doc)
}

async function deleteUser (user, appId) {
  var json = user.apps

  for (var app in json) {
    if (json[app].id === appId) {
      json.splice(app, 1)
      break
    }
  }
  if (json.length) {
    // build updated version
    var update = {
      _id: user._id,
      _rev: user._rev,
      type: 'user',
      apps: json
    }
    let res = await db.insert(update)
    return res[0]
  } else {
    let res = await db.destroy(user._id, user._rev)
    return res[0]
  }
}

async function adminApps (user) {
  var apps = await db.view('views', 'admins', { keys: [`${user}`] })
  apps = apps[0].rows

  var list = []
  apps.forEach(app => {
    list.push(app.id)
  })

  return list
}

async function userApps (user) {
  const apps = await db.view('views', 'apps_per_user', { keys: [`${user}`] })
  return apps[0].rows[0]
}

module.exports = {
  getAll,
  getAllCount,
  getUser,
  addUser,
  grantUserAccess,
  addUserBulk,
  resizeInv,
  deleteUser,
  adminApps,
  userApps
}
