const db = require('../auth')

async function getApp (appId) {
  const doc = await db.get(appId)
  return doc[0] // cut off couchdb metadata
}

async function getRev (appId) {
  const doc = await db.view('views', 'revisions', { keys: [`${appId}`] })
  return doc[0].rows[0].value // cut off metadata
}

async function getList (appId) {
  const doc = await db.view('views', 'waitlist_users', { keys: [`${appId}`] })
  return doc[0].rows[0] // cut off metadata
}

async function getListDoc (appId) {
  const doc = await db.view('views', 'waitlist_docs', { keys: [`${appId}`] })
  return doc[0].rows[0] // cut off metadata
}

async function getListSize (appId) {
  const doc = await getApp(appId)
  return doc.listsize // cut off metadata
}

async function getListOccupation (appId) {
  if (appId !== null) {
    const resOne = await db.view('views', 'waitlist_occupied', { key: `${appId}` })
    if (resOne[0].rows.length) {
      return resOne[0].rows[0].value
    } else {
      return 0
    }
  } else {
    const resMany = await db.view('views', 'waitlist_occupied')
    return resMany[0].rows
  }
}

async function resizeList (appId, newSize) {
  var doc = await getApp(appId)
  doc.listsize = newSize
  return updateApp(doc)
}

async function clearList (appId) {
  var doc = await getList(appId)

  // create new clear waitlist
  var newDoc = {
    _id: doc.id,
    _rev: doc.value.rev,
    type: 'waitlist',
    app: doc.key,
    users: []
  }

  const res = await db.insert(newDoc)
  return res[0]
}

async function updateList (appId, acceptedUsers) {
  var doc = await getList(appId)

  var updatedUsers = doc.value.users

  acceptedUsers.forEach(user => {
    for (let i in updatedUsers) {
      if (updatedUsers[i] === user) {
        updatedUsers.splice(i, 1)
      }
    }
  })

  // create new clear waitlist
  var newDoc = {
    _id: doc.id,
    _rev: doc.value.rev,
    type: 'waitlist',
    app: doc.key,
    users: updatedUsers
  }

  const res = await db.insert(newDoc)
  return res[0]
}

async function addList (jsonData) {
  const res = await db.insert(jsonData)
  return res[0]
}

async function addApp (jsonData) {
  const res = await db.insert(jsonData)

  // create also waitlist
  var waitlist = {
    type: 'waitlist',
    app: jsonData._id,
    users: []
  }
  try {
    var waitList = await getListDoc(jsonData._id)
    waitList.appDeleted = false
    await addList(waitList)
  } catch (err) {
    await addList(waitlist)
  }
  return res[0] // cut off couchdb metadata
}

async function updateApp (jsonData) {
  const res = await db.insert(jsonData)
  return res[0]
}

async function deleteApp (appId, rev) {
  const doc = await db.destroy(appId, rev)
  return doc[0] // cut off couchdb metadata
}

module.exports = {
  getApp,
  getRev,
  getList,
  clearList,
  updateList,
  getListDoc,
  getListSize,
  getListOccupation,
  resizeList,
  addList,
  addApp,
  updateApp,
  deleteApp
}
