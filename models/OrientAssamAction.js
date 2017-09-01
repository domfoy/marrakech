const mongoose = require('mongoose'),
      _ = require('lodash');

const {Action} = require('./Action.js');
const {Directions, ActionTypes} = require('./Consts.js');

const orientAssamAction = {
  type: {
    type: String,
    default: ActionTypes.orientAssam,
    enums: [ActionTypes.orientAssam]
  },
  payload: {
    assamDirection: {
      type: String,
      enum: _.values(Directions),
      required: true
    }
  }
};

const orientAssamActionSchema = new mongoose.Schema(orientAssamAction, {
  _id: false,
  discriminatorKey: 'kind'
});

const OrientAssamAction = Action.discriminator('OrientAssamAction', orientAssamActionSchema);

module.exports = {
  OrientAssamAction
};
