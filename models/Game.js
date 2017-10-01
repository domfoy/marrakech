const assert = require('assert');

const mongoose = require('mongoose'),
      _ = require('lodash');

const positionSchema = require('mongoose').model('Position').schema;
const actionSchema = require('mongoose').model('Action').schema;
const orientAssamActionSchema = require('mongoose').model('__OrientAssamAction').schema;
const layRugActionSchema = require('mongoose').model('__LayRugAction').schema;

const {Directions} = require('./Consts.js');

const BOARD_SIZE = 49;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
const MAX_PLAYER_COLOURS = 2;
const TWO_PLAYER_FINAL_TURN = 24;
const FOUR_PLAYER_FINAL_TURN = 12;

const directionAsArray = _.values(Directions);

const CellType = {
  type: {type: Number, min: 0, max: BOARD_SIZE - 1}
};

const ColourType = {
  type: Number,
  min: 1,
  max: 4
};

const SpotType = {
  type: [CellType],
  validate: v => v.length === 2 && v[0] < v[1]
};

module.exports = function registerGame() {
  const gameSchema = new mongoose.Schema({
    playerCount: {type: Number, min: MIN_PLAYERS, max: MAX_PLAYERS},
    totalTurns: {type: Number, min: FOUR_PLAYER_FINAL_TURN, max: TWO_PLAYER_FINAL_TURN},
    currentTurn: {type: Number, min: 1},
    assam: {
      direction: {type: String, enum: directionAsArray},
      position: positionSchema
    },
    board: {
      layer: {
        type: [{type: Number, min: 0, max: MAX_PLAYERS}],
        default: new Array(BOARD_SIZE).join('0').split('').map(parseFloat),
        validate: v => v.length === BOARD_SIZE
      },
      coloursDomains: {
        type: [{
          colourId: ColourType,
          domains: [{
            size: {type: Number, min: 0, max: BOARD_SIZE },
            cells: {
              type: [CellType],
              validate: v => v.length >= 0 && v.length < BOARD_SIZE
            }
          }]
        }],
        required: true,
        validate: v => v.length >= MIN_PLAYERS && v.length <= MAX_PLAYERS
      },
      uncoveredRugs: [{
        spot: SpotType,
        colour: ColourType
      }]
    },
    players: {
      type: [{
        money: Number,
        colours: {
          type: [ColourType],
          required: true,
          validate: v => v.length === 1 || v.length === MAX_PLAYER_COLOURS
        }
      }],
      required: true,
      validate: v => v.length >= MIN_PLAYERS && v.length <= 4
    },
    actions: {
      type: [actionSchema],
      validate: {
        isAsync: false,
        validator: validateActions,
        message: 'Invalid action'
      }
    }
  }, {
    bufferCommands: false,
    toObject: {
      retainKeyOrder: true
    }
  });

  function validateActions(v) {
    const currentAction = _.last(v);

    return currentAction.validateAction(this);
  }

  gameSchema.path('actions').discriminator('OrientAssamAction', orientAssamActionSchema);
  gameSchema.path('actions').discriminator('LayRugAction', layRugActionSchema);

  gameSchema.methods.getCurrentAction = function getCurrentAction() {
    return _.last(this.actions);
  };

  gameSchema.methods.computeNextAction = function computeNextAction() {
    const lastAction = _.last(this.actions);

    assert(lastAction, 'No action found in game');

    return lastAction.computeNextAction(this);
  };

  gameSchema.methods.getCurrentPlayerColours = function getCurrentPlayerColours() {
    const lastAction = _.last(this.actions);

    const currentPlayer = lastAction.meta.playerId;

    return this.players[currentPlayer - 1].colours;
  };

  mongoose.model('Game', gameSchema);
};
