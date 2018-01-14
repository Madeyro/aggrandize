var nano = require('nano')('http://localhost:5984')
var callback = console.log;
var cookie = {};
exports.cookie = cookie;

const args = process.argv;
const username = args.slice(2);
const userpass = args.slice(3);

nano.auth(username, userpass, function (err, body, headers) {
  if (err) {
    return callback(err);
  }

  if (headers && headers['set-cookie']) {
    cookie = headers['set-cookie'];
  }

  callback("Cookie succesfully obtained.");
});