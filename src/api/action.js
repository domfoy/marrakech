const _ = require('lodash');

const router = require('koa-router')();

const Game = require('mongoose').model('Game');

function displayCurrentAction(ctx) {
  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

async function setAction(ctx) {
  const currentAction = _.last(ctx.state.game.actions);

  currentAction.set('payload', ctx.request.body);
  await ctx.state.game.save({context: 'document'});

  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

async function checkGameId(ctx, next) {
  ctx.assert(ctx.params.gameId);

  const game = await Game.findOne({_id: ctx.params.gameId});

  ctx.assert(game, 400, 'No game found');

  ctx.state.game = game;

  await next();
}

router.get('/current', checkGameId, displayCurrentAction);
router.put('/:id', checkGameId, setAction);
// router.post('/:id/next', computeNextAction);

module.exports = router;
