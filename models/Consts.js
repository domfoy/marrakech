const ActionTypes = {
  orientAssam: 'ORIENT_ASSAM',
  addCarpet: 'ADD_CARPET'
};

const Directions = {
  right: 'RIGHT',
  up: 'UP',
  left: 'LEFT',
  down: 'DOWN'
};

const TurnPhases = Object.assign({
  payTax: 'PAY_TAX',
  drawDice: 'DRAW_DICE',
  moveAssam: 'MOVE_ASSAM'
}, ActionTypes);

const TurnPhasesOrder = [
  'orientAssam',
  'drawDice',
  'moveAssam',
  'payTax',
  'addCarpet'
];

module.exports = {
  ActionTypes,
  Directions,
  TurnPhases,
  TurnPhasesOrder
}
