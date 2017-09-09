const {drawDice, computeNextAssam} = require('./lib');

// const BOARD_LENGTH = 7;

module.exports = {
  orientAssamPostProcess
};

async function orientAssamPostProcess(game) {
  const draw = drawDice();

  game.assam = computeNextAssam(game.assam, draw);

  await game.save();

  // payTax()
}

// function payTax(game) {
//   const assamPosition = game.assam.position;
//
//   const cell = (assamPosition.x * BOARD_LENGTH) + assamPosition.y;
// }
