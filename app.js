require('./register-models');

const http = require('http');

const io = require('socket.io');
const Koa = require('koa');
const body = require('koa-body');
const Router = require('koa-router');

const {game, action} = require('./src/api');
const socketHandler = require('./src/socket');

const app = new Koa();

const router = new Router();

router.get('/ping', (ctx) => {ctx.body = 'OK';});
router.use('/game', game.routes(), game.allowedMethods());
router.use('/game/:gameId/action', action.routes(), action.allowedMethods());

// app
//   .use(async (ctx, next) => {
//     try {
//       await next();
//     } catch (err) {
//       if (err.name === 'ValidationError') {
//         ctx.status = 400;
//         ctx.body = err.message;
//       } else {
//         ctx.throw(500, 'sa mere');
//       }
//       ctx.app.emit('error', err, ctx);
//     }
//   })
//   .use(body())
//   .use(router.routes())
//   .use(router.allowedMethods());

const server = http.createServer(app.callback());
const _io = io(server);

socketHandler(_io);

module.exports = server;
