// Not used
const jwt = require('jsonwebtoken')

async function userAuthenticate (token, app) {
  const decoded = jwt.verify(token, 'secret')
  if (!decoded.apps.includes(app)) {
    throw Error('User does not have access to this app')
  } else {
    return true
  }
}

async function adminAuthenticate (token, app) {
  const decoded = jwt.verify(token, 'secret')
  if (!decoded.admin.includes(app)) {
    throw Error('User is not have admin of this app')
  } else {
    return true
  }
}

module.exports = {
  userAuthenticate,
  adminAuthenticate
}
