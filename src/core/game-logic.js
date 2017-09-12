
const {drawDice, moveAssam, payTax, formatResponse} = require('./lib');

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

  return formatResponse(game, tax);
}

async function layRugPostProcess(game) {
  return game;
}
