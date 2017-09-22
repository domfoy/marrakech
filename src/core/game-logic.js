
const {drawDice, moveAssam, payTax, formatResponse, computeFreeRugSpots} = require('./lib');

module.exports = {
  orientAssamPostProcess,
  layRugPostProcess
};

async function orientAssamPostProcess(game) {
  const draw = drawDice();

  const newAssam = moveAssam(game.assam, draw);

  game.assam = newAssam;

  const tax = payTax(game, newAssam);

  await game.save();

  const freeRugSpots = computeFreeRugSpots(game);

  return formatResponse(game, tax, freeRugSpots);
}

async function layRugPostProcess(game) {
  return game;
}
