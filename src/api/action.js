const _ = require('lodash');

const router = require('koa-router')();

const Game = require('mongoose').model('Game');

function displayAction(ctx) {
  console.log(ctx.state);
  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

async function setAction(ctx) {
  console.log(ctx.request.body);
  const currentAction = _.last(ctx.state.game.actions);


  currentAction.payload = ctx.request.body;

  await ctx.state.game.save();

  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

// async function computeNextAction(ctx) {
//
// }

async function checkGameId(ctx, next) {
  ctx.assert(ctx.params.gameId);

  const game = await Game.findOne({_id: ctx.params.gameId});

  ctx.assert(game);

  ctx.state.game = game;

  await next();
}

router.get('/current', checkGameId, displayAction);
router.put('/:id', checkGameId, setAction);
// router.post('/:id/next', computeNextAction);

module.exports = router;
