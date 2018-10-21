const mongoose = require('mongoose'),
      _ = require('lodash');

const positionSchema = require('mongoose').model('Position').schema;
const actionSchema = require('mongoose').model('Action').schema;
const orientAssamActionSchema = require('mongoose').model('__OrientAssamAction').schema;
const layRugActionSchema = require('mongoose').model('__LayRugAction').schema;

const {
  ActionTypes,
  Colours,
  ColoursAsArray,
  ColourType,
  Directions
} = require('./Consts.js');
const {
  layRugPostProcess,
  orientAssamPostProcess
} = require('../src/core/game-logic.js');


const BOARD_SIZE = 49;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
const MAX_PLAYER_COLOURS = 2;
const TWO_PLAYER_FINAL_TURN = 24;
const FOUR_PLAYER_FINAL_TURN = 12;

const actionTypesAsArray = _.values(ActionTypes);
const directionAsArray = _.values(Directions);

const ColourId = {type: Number, min: 0, max: 4};
const CellType = {type: Number, min: 0, max: BOARD_SIZE - 1};

const SpotType = {
  type: [CellType],
  validate: v => v.length === 2 && v[0] < v[1]
};

module.exports = function registerGame() {
  const defaultLayer = [];
  let size = 49;

  while (size--) defaultLayer[size] = Colours.NONE;

  const gameSchema = new mongoose.Schema({
    playerCount: {type: Number, min: MIN_PLAYERS, max: MAX_PLAYERS},
    remainingColours: [ColourType],
    remainingPlayerIds: [{type: Number, min: 1, max: MAX_PLAYERS}],
    totalTurns: {type: Number, min: FOUR_PLAYER_FINAL_TURN, max: TWO_PLAYER_FINAL_TURN},
    pendingAction: {
      turnId: {type: Number, min: 1},
      playerId: {type: Number, min: 1, max: MAX_PLAYERS},
      colour: ColourType,
      type: {type: String, enum: actionTypesAsArray}
    },
    assam: {
      direction: {type: String, enum: directionAsArray},
      position: positionSchema
    },
    board: {
      layer: {
        type: [ColourId],
        default: defaultLayer,
        validate: v => v.length === BOARD_SIZE
      },
      coloursDomains: {
        type: [{
          colourId: ColourId,
          domains: [{
            size: {type: Number, min: 0, max: BOARD_SIZE },
            cells: {
              type: [CellType]
            }
          }]
        }],
        required: true,
        validate: v => v.length <= MAX_PLAYERS
      },
      uncoveredRugs: [{
        spot: SpotType,
        colour: ColourId
      }]
    },
    players: {
      type: [{
        id: {type: Number, min: 1, max: MAX_PLAYERS},
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
    usePushEach: true,
    bufferCommands: false,
    toObject: {
      retainKeyOrder: true
    }
  });

  function validateActions() {
    return true;
  }

  gameSchema.path('actions').discriminator('OrientAssamAction', orientAssamActionSchema);
  gameSchema.path('actions').discriminator('LayRugAction', layRugActionSchema);

  gameSchema.methods.getCellColour = function getCellColour(cellIndex) {
    const cell = this.board.layer[cellIndex];
    return ColoursAsArray[cell];
  };

  gameSchema.methods.getCurrentAction = function getCurrentAction() {
    return _.last(this.actions);
  };

  gameSchema.methods.applyAction = async function applyAction(action) {
    switch (this.pendingAction.type) {
    case ActionTypes.ORIENT_ASSAM:
      this.assam.direction = action.direction;
      this.actions.push({
        kind: 'OrientAssamAction',
        meta: this.pendingAction,
        type: ActionTypes.ORIENT_ASSAM,
        payload: action
      });
      orientAssamPostProcess(this);
      break;
    case ActionTypes.LAY_RUG:
      const colourId = _.findIndex(ColoursAsArray, c => c === this.pendingAction.colour);
      this.board.layer[action.positions[0].x + 3 + ((action.positions[0].y + 3) * 7)] = colourId;
      this.board.layer[action.positions[1].x + 3 + ((action.positions[1].y + 3) * 7)] = colourId;
      this.actions.push({
        kind: 'LayRugAction',
        meta: this.pendingAction,
        type: ActionTypes.ORIENT_ASSAM,
        payload: action
      });
      layRugPostProcess(this);
      break;
    default:
    }

    await this.save({context: 'document'});
  };

  gameSchema.methods.isOver = function isOver() {
    return this.remainingPlayerIds.length === 1
    || (this.actions.length === this.totalTurns && !!_.last(this.actions).payload);
  };

  gameSchema.methods.getCurrentPlayerColours = function getCurrentPlayerColours() {
    const currentPlayer = this.pendingAction.playerId;

    return this.players[currentPlayer - 1].colours;
  };

  mongoose.model('Game', gameSchema);
};
