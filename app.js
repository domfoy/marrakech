require('./register-models');

const Koa = require('koa');
const body = require('koa-body');
const Router = require('koa-router');

const {game, action} = require('./src/api');

const app = new Koa();

const router = new Router();

router.get('/ping', (ctx) => {ctx.body = 'OK';});
router.use('/game', game.routes(), game.allowedMethods());
router.use('/game/:gameId/action', action.routes(), action.allowedMethods());

app
  // .use(async (ctx, next) => {
  //   try {
  //     await next;
  //   } catch (err) {
  //     console.log(err);
  //     ctx.throw(500, 'sa mere');
  //     // ctx.status = 400;
  //     // ctx.body = err.message;
  //     // // ctx.app.emit('error', err, ctx);
  //     // ctx.throw(300, 'changed');
  //   }
  // })
  .use(body())
  .use(router.routes())
  .use(router.allowedMethods());


module.exports = app;
