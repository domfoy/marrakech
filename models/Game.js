const mongoose = require('mongoose'),
      _ = require('lodash');

const positionSchema = require('mongoose').model('Position').schema;
const actionSchema = require('mongoose').model('Action').schema;

const {Directions} = require('./Consts.js');

const directionAsArray = _.values(Directions);

function validateActions(v) {
  const currentAction = _.last(v);

  if (currentAction.type === 'ORIENT_ASSAM') {
    const assamDirection = _.indexOf(directionAsArray, this.assam.direction);

    const assamOppositeDirection = (assamDirection + 2) % 4;

    if (!_.get(currentAction, 'payload.direction')) {
      return false;
    }

    const actionDirection = _.indexOf(directionAsArray, currentAction.payload.direction);

    if (actionDirection < 0) {
      return false;
    }

    return actionDirection !== assamOppositeDirection;
  }

  return true;
}

const gameSchema = new mongoose.Schema({
  currentTurn: {type: Number, min: 0},
  assam: {
    direction: {type: String, enum: directionAsArray},
    position: positionSchema
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


gameSchema.methods.getCurrentAction = function getCurrentAction() {
  return _.last(this.actions);
};

const Game = mongoose.model('Game', gameSchema);

module.exports = {
  Game
};
