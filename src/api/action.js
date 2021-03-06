const _ = require('lodash');

const router = require('koa-router')();

const Game = require('mongoose').model('Game');

router.get('/current', fetchGame, displayCurrentAction);
router.put('/:id', fetchGame, checkAction, setAction);
router.post('/:id/next', fetchGame, checkAction, addNextAction);

module.exports = router;

async function fetchGame(ctx, next) {
  ctx.assert(ctx.params.gameId);

  const game = await Game.findOne({_id: ctx.params.gameId});

  ctx.assert(game, 400, 'No game found');

  ctx.state.game = game;

  await next();
}

async function checkAction(ctx, next) {
  ctx.assert(_.last(ctx.state.game.actions)._id.toString() === ctx.params.id, 400, 'Wrong action id');

  await next();
}

function displayCurrentAction(ctx) {
  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

async function setAction(ctx) {
  const currentAction = _.last(ctx.state.game.actions);

  currentAction.set('payload', ctx.request.body);

  await trySave(ctx);

  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

async function trySave(ctx) {
  try {
    await ctx.state.game.save({context: 'document'});
  } catch (error) {
    ctx.throw(400, error.message);
  }
}

async function addNextAction(ctx) {
  const payload = await ctx.state.game.computeNextAction();

  ctx.response.body = payload;
}
