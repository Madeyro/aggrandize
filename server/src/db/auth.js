const userpass = process.env.COUCHDB_PASS
const username = process.env.COUCHDB_USER

var cookie = {}

var dbName = 'aggrandize'
var db = require('nano-blue')(
  { 'url': 'http://localhost:5984/' + dbName,
    'cookie': 'AuthSession=' + cookie
  })

db.auth(username, userpass, function (err, body, headers) {
  if (err) {
    console.log('\nERROR: \n' + err.message + '\n')
    process.exit(1)
  }

  if (headers && headers['set-cookie']) {
    cookie = headers['set-cookie']
  }

  console.log('Cookie succesfully obtained.')
})

module.exports = db
