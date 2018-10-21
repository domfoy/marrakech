const {moveAssam, payTax, formatResponse} = require('./assam.js');
const {computeColoursDomains, computeFreeRugSpots, computeUncoveredRugs} = require('./board.js');
const {drawDice} = require('./dice.js');

module.exports = {
  moveAssam,
  computeColoursDomains,
  computeFreeRugSpots,
  computeUncoveredRugs,
  drawDice,
  payTax,
  formatResponse
};
