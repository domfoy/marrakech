const mongoose = require('mongoose'),
      _ = require('lodash');

const {ActionTypes, ColourType} = require('./Consts.js');

module.exports = function registerAction() {
  const actionSchema = new mongoose.Schema({
    meta: {
      turnId: {type: Number},
      playerId: {type: Number, min: 1, max: 4},
      colour: ColourType
    },
    type: {
      type: String,
      enum: _.values(ActionTypes),
      required: true
    },
    payload: {
      type: Object,
      required: true,
      default: {}
    }
  }, {
    discriminatorKey: 'kind'
  });

  mongoose.model('Action', actionSchema);
};
