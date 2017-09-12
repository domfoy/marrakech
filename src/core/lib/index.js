const {moveAssam, payTax, formatResponse} = require('./assam.js');
const {computeColoursDomains} = require('./board.js');
const {drawDice} = require('./dice.js');

module.exports = {
  moveAssam,
  computeColoursDomains,
  drawDice,
  payTax,
  formatResponse
};
