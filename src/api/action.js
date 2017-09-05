const _ = require('lodash');

const router = require('koa-router')();

const Game = require('mongoose').model('Game');

async function checkUrl(ctx, next) {
  ctx.assert(ctx.params.gameId);

  const game = await Game.findOne({_id: ctx.params.gameId});

  ctx.assert(game, 400, 'No game found');

  ctx.assert(_.last(game.actions)._id === ctx.params.id, 400, 'Wrong action id');

  ctx.state.game = game;

  await next();
}

function displayCurrentAction(ctx) {
  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

async function trySave(ctx) {
  try {
    await ctx.state.game.save({context: 'document'});
  } catch (error) {
    ctx.throw(400, error.message);
  }
}

async function setAction(ctx) {
  const currentAction = _.last(ctx.state.game.actions);

  currentAction.set('payload', ctx.request.body);

  await trySave(ctx);

  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

async function addNextAction(ctx) {
  // if (ctx.request.body) {
  //   const currentAction = _.last(ctx.state.game.actions);
  //   currentAction.set('payload', ctx.request.body);
  //   await trySave(ctx);
  // }

  const nextAction = ctx.state.game.computeNextAction();

  ctx.response.body = ctx.state.game.getCurrentAction().toObject();
}

router.get('/current', checkUrl, displayCurrentAction);
router.put('/:id', checkUrl, setAction);
router.post('/:id/next', addNextAction);

module.exports = router;
