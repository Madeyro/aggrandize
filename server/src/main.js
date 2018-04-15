const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')
const appsRoutes = require('./routes/apps')
const invsRoutes = require('./routes/invs')

const app = new Koa()
const PORT = process.env.PORT || 8081

// body parser
app.use(bodyParser())

// routes
app.use(indexRoutes.routes())
app.use(usersRoutes.routes())
app.use(appsRoutes.routes())
app.use(invsRoutes.routes())

// server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
