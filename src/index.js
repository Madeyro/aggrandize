const credentials = require('./loginDB.js');

const Koa = require('koa');
const app = new Koa();

const compose = require('koa-compose');

var db_name = "aggrandize";
var db = require('nano')(
  { "url"      : 'http://localhost:5984/' + db_name,
  "cookie"   : 'AuthSession=' + credentials.cookie
});


async function random(ctx, next) {
  if ('/random' == ctx.path) {
    ctx.body = Math.floor(Math.random() * 10);
  } else {
    await next();
  }
};

async function database(ctx, next) {
  if ('/db' == ctx.path) {
    ctx.body = 'You are accessing the database.';
  } else {
    next();
  }
}

async function home(ctx, next) {
  if ('/' == ctx.path) {
    ctx.body = 'Hello, world!'
  } else {
    next();
  }
}

async function get_users(ctx, next) {
  if ('/api/0/getUsers' == ctx.path) {
    ctx.body = db.view('Views', 'app_users',{ keys: ['Test App'] } ,function(err, body) {
      if (!err) {
        body.rows.forEach(function(doc) {
          console.log(doc.key+': ');
          console.log(doc.value)
        });
      }
    });
  } else {
    next();
  }
}




const all = compose([random, database, home, get_users]);

app.use(all);
app.listen(8080);

