const db = require('../auth')
const nano = require('nano-blue')

async function getApp (app) {
  const doc = await db.get(app)
  return doc[0] // cut off couchdb metadata
}

async function getRev (app) {
  const doc = await db.view('views', 'revisions', { keys: [`${app}`] })
  return doc[0].rows[0].value // cut off metadata
}

async function getList (app) {
  const doc = await db.view('views', 'wait_lists', { keys: [`${app}`] })
  return doc[0].rows[0] // cut off metadata
}

async function resizeList (app, newSize) {
  var doc = await getApp(app)
  // create new JSON
  doc = doc[0] // cut information about response
  doc.listsize = newSize
  return addApp(doc)
}

async function clearList (app) {
  var doc = await getList(app)

  // create new clear waitlist
  var newDoc = {
    _id: doc.id,
    _rev: doc.rev,
    type: 'waitlist',
    app: doc.key,
    users: []
  }

  const res = await db.insert(newDoc)
  return res[0]
}

async function addApp (data) {
  const res = await db.insert(data)

  // create also waitlist
  var waitlist = {
    type: 'waitlist',
    app: data._id,
    users: []
  }

  const res2 = await db.insert(waitlist)
  return [res[0], res2[0]] // cut off couchdb metadata
}

async function deleteApp (app, rev) {
  const doc = await db.destroy(app, rev)
  return doc[0] // cut off couchdb metadata
}

module.exports = {
  getApp,
  getRev,
  getList,
  clearList,
  resizeList,
  addApp,
  deleteApp
}
