const db = require('../auth');

function getApp(app) {
  app = db.get(app, { revs_info: true });
  console.log(app);
  return app

}

function addApp(app, mail) {
  app_doc = db.getApp(app)
  if (app_doc) {
    db.insert({ _id: 'myid', crazy: false });
  }
}

module.exports = {
  getApp,
  addApp,
};