const mongoose = require('mongoose'),
      _ = require('lodash');

const {Directions, ActionTypes} = require('./Consts.js');

const directionAsArray = _.values(Directions);

const orientAssamAction = {
  type: {
    type: String,
    default: ActionTypes.ORIENT_ASSAM,
    enums: [ActionTypes.ORIENT_ASSAM]
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

  mongoose.model('__OrientAssamAction', orientAssamActionSchema);
};
