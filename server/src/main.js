const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

const app = new Koa();
const PORT = process.env.PORT || 8081;

// body parser
app.use(bodyParser());

// routes
app.use(indexRoutes.routes());
app.use(usersRoutes.routes());

// server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;