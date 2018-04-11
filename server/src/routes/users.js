const Router = require('koa-router');
const router = new Router({prefix: "/api/0/users"});

const db = require("../db/auth")
const querries = require("../db/querries/users")

router.get('/:app', async ctx => {
  try {
    ctx.body = querries.getAll(ctx.params.app);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.post('/', async ctx => {
  try {
    console.log(ctx.request.body);
    const movie = await queries.addUser(ctx.request.body);
    if (movie.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = router;