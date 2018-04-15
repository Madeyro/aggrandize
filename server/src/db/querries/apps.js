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

  const res2 = await addList(waitlist)
  return [res[0], res2] // cut off couchdb metadata
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
  getListDoc,
  getListSize,
  resizeList,
  addList,
  addApp,
  updateApp,
  deleteApp
}
