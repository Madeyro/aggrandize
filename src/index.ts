const Koa = require('koa');
const app = new Koa();

var nano = require('nano')('http://localhost:5984');
const compose = require('koa-compose');

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
    ctx.body = 'Hello, world!';
  } else {
    next();
  }
}

const all = compose([random, database, home]);

app.use(all);
app.listen(8080);

