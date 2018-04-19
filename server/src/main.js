const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')
const appsRoutes = require('./routes/apps')
const invsRoutes = require('./routes/invs')
const authRoutes = require('./routes/auth')

const app = new Koa()
const PORT = process.env.PORT || 8081

// body parser
app.use(bodyParser())

// Cross-Origin Resource Sharing
app.use(cors())

// routes
app.use(indexRoutes.routes())
app.use(usersRoutes.routes())
app.use(appsRoutes.routes())
app.use(invsRoutes.routes())
app.use(authRoutes.routes())

// server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
