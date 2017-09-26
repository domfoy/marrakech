const {moveAssam, payTax, formatResponse} = require('./assam.js');
const {computeColoursDomains, computeFreeRugSpots} = require('./board.js');
const {drawDice} = require('./dice.js');

module.exports = {
  moveAssam,
  computeColoursDomains,
  computeFreeRugSpots,
  drawDice,
  payTax,
  formatResponse
};
