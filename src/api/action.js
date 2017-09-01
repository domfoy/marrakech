const _ = require('lodash');

const router = require('koa-router')();

function displayAction(ctx) {
  ctx.response.body = ctx.game.getCurrentAction().toObject();
}

async function setAction(ctx) {
  const currentAction = _.last(ctx.game.actions);

  currentAction.payload = ctx.request.body;

  await ctx.game.save();

  ctx.response.body = ctx.game.getCurrentAction().toObject();
}

// async function computeNextAction(ctx) {
//
// }

router.get('/current', displayAction);
router.get('/:id', fetchAction);
router.put('/:id', setAction);
// router.post('/:id/next', computeNextAction);

module.exports = router;
