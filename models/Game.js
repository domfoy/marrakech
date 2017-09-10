const assert = require('assert');

const mongoose = require('mongoose'),
      _ = require('lodash');

const positionSchema = require('mongoose').model('Position').schema;
const actionSchema = require('mongoose').model('Action').schema;
const orientAssamActionSchema = require('mongoose').model('__OrientAssamAction').schema;
const layRugActionSchema = require('mongoose').model('__LayRugAction').schema;

const {Directions} = require('./Consts.js');

const directionAsArray = _.values(Directions);

module.exports = function registerGame() {
  const gameSchema = new mongoose.Schema({
    playerCount: {type: Number, min: 2, max: 4},
    totalTurns: {type: Number, min: 12, max: 24},
    currentTurn: {type: Number, min: 1},
    assam: {
      direction: {type: String, enum: directionAsArray},
      position: positionSchema
    },
    board: {
      layer: {
        type: [{type: Number, min: 0, max: 4}],
        default: new Array(49).join('0').split('').map(parseFloat),
        validate: v => v.length === 49
      },
      colourDomains: {
        type: [{
          colourId: {type: Number, min: 1, max: 4},
          domains: [{
            size: {type: Number, min: 0, max: 49},
            cells: {
              type: [{type: Number, min: 0, max: 48}]
            }
          }]
        }],
        required: true,
        validate: v => v.length >= 2 && v.length <= 4
      }
    },
    players: {
      type: [{
        money: Number,
        colours: {
          type: [{
            type: Number,
            min: 1,
            max: 4
          }],
          required: true,
          validate: v => v.length === 1 || v.length === 2
        }
      }],
      required: true,
      validate: v => v.length >= 2 && v.length <= 4
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

    lastAction.computeNextAction(this);
  };

  mongoose.model('Game', gameSchema);
};
