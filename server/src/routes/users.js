const Router = require('koa-router');
const router = new Router({prefix: "/api/0"});

const db = require("../db/auth")

router.get('/users', async ctx => {
  ctx.body = db.view('users_views', 'test_users',{ keys: ['Test App'] } ,function(err, body) {
    if (!err) {
      body.rows.forEach(function(doc) {
        console.log(doc.key+': ');
        console.log(doc.value)
      });
    }
  });
});

module.exports = router;