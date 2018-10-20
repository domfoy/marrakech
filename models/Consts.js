const _ = require('lodash');

const ActionTypes = {
  ORIENT_ASSAM: 'ORIENT_ASSAM',
  LAY_RUG: 'LAY_RUG'
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
  'ORIENT_ASSAM',
  'drawDice',
  'moveAssam',
  'payTax',
  'LAY_RUG'
];

const Colours = {
  NONE: '',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
  RED: 'RED',
  BROWN: 'BROWN'
};

const BOARD_SIZE = 49;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
const MAX_PLAYER_COLOURS = 2;
const TWO_PLAYER_FINAL_TURN = 24;
const FOUR_PLAYER_FINAL_TURN = 12;
const BOARD_SIDE_SIZE = 7;

const ColourType = {
  type: String,
  enum: _.values(Colours)
};

module.exports = {
  ActionTypes,
  Directions,
  TurnPhases,
  TurnPhasesOrder,
  Colours,
  ColourType,
  MIN_PLAYERS,
  MAX_PLAYERS,
  MAX_PLAYER_COLOURS,
  TWO_PLAYER_FINAL_TURN,
  FOUR_PLAYER_FINAL_TURN,
  BOARD_SIZE,
  BOARD_SIDE_SIZE
};
