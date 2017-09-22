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

const BOARD_SIZE = 49;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
const MAX_PLAYER_COLOURS = 2;
const TWO_PLAYER_FINAL_TURN = 24;
const FOUR_PLAYER_FINAL_TURN = 12;
const BOARD_SIDE_SIZE = 7;

module.exports = {
  ActionTypes,
  Directions,
  TurnPhases,
  TurnPhasesOrder,
  Colours,
  MIN_PLAYERS,
  MAX_PLAYERS,
  MAX_PLAYER_COLOURS,
  TWO_PLAYER_FINAL_TURN,
  FOUR_PLAYER_FINAL_TURN,
  BOARD_SIZE,
  BOARD_SIDE_SIZE
};
