const mongoose = require('mongoose'),
      _ = require('lodash');

const {Action} = require('./Action.js');
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

const orientAssamActionSchema = new mongoose.Schema(orientAssamAction, {
  _id: false,
  discriminatorKey: 'kind'
});

orientAssamActionSchema.methods.computeNextAction = function computeNextAction(game) {
  return orientAssamPostProcess(game);
};

const OrientAssamAction = Action.discriminator('OrientAssamAction', orientAssamActionSchema);

module.exports = {
  OrientAssamAction
};
