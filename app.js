const Koa = require('koa');
const body = require('koa-body');
const Router = require('koa-router');

const init = require('./lib/init.js');
const {assam} = require('./lib/api');

async function initApp(db) {
  const app = new Koa();

  app.context.db = db;
  router = new Router();

  router.use('/assam', assam.routes(), assam.allowedMethods());

  app.context.game = await init();

  app.use(body());

  app.use(router.routes());

  return app;
}

module.exports = initApp;
