const router = require('koa-router')();

const {Game} = require('../../models/Game');

router.get('/', displayAssam);
router.put('/', changeAssam);

function displayAssam(ctx) {
  ctx.response.body = ctx.game.assam.toObject();
}

async function changeAssam(ctx, next) {
  ctx.game.assam = ctx.request.body;

  const newGame = await ctx.game.save();

  ctx.response.body = newGame.assam.toObject();
}

module.exports = router;
