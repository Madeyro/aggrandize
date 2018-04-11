const db = require('../auth');
const apps = require('./apps');

function getAll(app) {
  console.log(app);

  return db.view('users_views', 'test_users',{ keys: [`${app}`] });
}

function addUser(app, mail) {
  apps.getApp(app)
  // db.insert({ _id: 'myid', _rev: '1-23202479633c2b380f79507a776743d5', crazy: false });
}

module.exports = {
  getAll,
  addUser,
};