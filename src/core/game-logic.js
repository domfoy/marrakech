const _ = require('lodash');

const {drawDice, moveAssam} = require('./lib');

const BOARD_LENGTH = 7;
const NEUTRAL_COLOR = 0;
const NO_TAX = {
  amount: 0
};

module.exports = {
  orientAssamPostProcess
};

async function orientAssamPostProcess(game) {
  const draw = drawDice();

  const newAssam = moveAssam(game.assam, draw);

  const tax = payTax(game, newAssam);

  await game.save();
}

function payTax(game, newAssam) {
  const assamPosition = newAssam.position;

  const cell = (assamPosition.x * BOARD_LENGTH) + assamPosition.y;

  const colourId = game.board.layer[cell];

  if (colourId === NEUTRAL_COLOR) {
    return NO_TAX;
  }

  const creditorId = _.findIndex(game.players, p => p.colours.includes(colourId));

  const debtorId = _.last(game.actions).meta.playerId;
  if (creditorId === debtorId) {
    return NO_TAX;
  }

  const involvedColourDomains = _.first(game.board.colourDomains, ds => ds.colourId === colourId);
  const involvedColourDomain = _.first(involvedColourDomains, d => d.cells.includes(cell));
  const taxAmount = involvedColourDomain.length;

  return {
    creditorId,
    amount: taxAmount
  };
}
