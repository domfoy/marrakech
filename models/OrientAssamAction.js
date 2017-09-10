const mongoose = require('mongoose'),
      _ = require('lodash');

const {Directions, ActionTypes} = require('./Consts.js');

const directionAsArray = _.values(Directions);

const {orientAssamPostProcess} = require('../src/core/game-logic.js');


const orientAssamAction = {
  type: {
    type: String,
    default: ActionTypes.orientAssam,
    enums: [ActionTypes.orientAssam]
  },
  payload: {
    direction: {
      type: String,
      enum: directionAsArray,
      required: true
    }
  }
};

module.exports = function registerOrientAssamAction() {
  const orientAssamActionSchema = new mongoose.Schema(orientAssamAction, {
    _id: false
  });

  orientAssamActionSchema.methods.validateAction = function validateAction(game) {
    const assamDirection = _.indexOf(directionAsArray, game.assam.direction);

    const assamOppositeDirection = (assamDirection + 2) % 4;

    if (!_.get(this, 'payload.direction')) {
      return false;
    }

    const actionDirection = _.indexOf(directionAsArray, this.payload.direction);

    if (actionDirection < 0) {
      return false;
    }

    return actionDirection !== assamOppositeDirection;
  };

  orientAssamActionSchema.methods.computeNextAction = function computeNextAction(game) {
    return orientAssamPostProcess(game);
  };

  mongoose.model('__OrientAssamAction', orientAssamActionSchema);
};
