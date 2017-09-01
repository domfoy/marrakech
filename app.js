const Koa = require('koa');
const body = require('koa-body');
const Router = require('koa-router');

const init = require('./src/init.js');
const {action} = require('./src/api');

async function initApp() {
  const app = new Koa();

  app.context.game = await init();

  const router = new Router();

  router.use('/action', action.routes(), action.allowedMethods());

  app.use(body());
  app.use(router.routes());

  console.log(app.context.game);

  return app;
}

module.exports = initApp;
