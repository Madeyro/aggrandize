var nano = require('nano')('http://localhost:5984')
var cookie = {};
// exports.cookie = cookie;

var db_name = "aggrandize";
var db = require('nano')(
  { "url"      : 'http://localhost:5984/' + db_name,
    "cookie"   : 'AuthSession=' + cookie
});

const userpass = process.env.COUCHDB_PASS;
const username = process.env.COUCHDB_USER;


nano.auth(username, userpass, function (err, body, headers) {
  if (err) {
    console.log(err.message);
    console.log("Check env variables COUCHDB_USER and COUCHDB_PASS");
    process.exit(1);
  }

  if (headers && headers['set-cookie']) {
    cookie = headers['set-cookie'];
  }

  console.log("Cookie succesfully obtained.");
});

module.exports = db;