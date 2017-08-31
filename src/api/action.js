const router = require('koa-router')();

const {Game} = require('../../models/Game');

router.get('/:id', displayAction);
router.put('/:id', setAction);
router.post('/:id/next', computeNextAction);

function displayAction(ctx) {
  ctx.response.body = ctx.game.assam.toObject();
}

async function changeAssam(ctx, next) {
  ctx.game.assam = ctx.request.body;

  const newGame = await ctx.game.save();

  ctx.response.body = newGame.assam.toObject();
}

async function computeNextAction(ctx, next) {
  
}

module.exports = router;
