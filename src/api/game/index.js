const router = require('koa-router')();

const {init} = require('./lib.js');

async function initGame(ctx) {
  const game = await init();

  ctx.response.status = 201;
  ctx.response.body = {
    _id: game._id
  };
}

router.post('/', initGame);

module.exports = router;
