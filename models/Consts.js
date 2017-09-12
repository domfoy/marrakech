const ActionTypes = {
  orientAssam: 'ORIENT_ASSAM',
  layRug: 'LAY_RUG'
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
  'layRug'
];

const Colours = {
  none: '',
  blue: 'BLUE',
  yellow: 'YELLOW',
  red: 'RED',
  brown: 'BROWN'
};

const BOARD_LENGTH = 7;

module.exports = {
  ActionTypes,
  Directions,
  TurnPhases,
  TurnPhasesOrder,
  Colours,
  BOARD_LENGTH
};
