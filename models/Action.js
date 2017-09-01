const mongoose = require('mongoose'),
      _ = require('lodash');

const {ActionTypes} = require('./Consts.js');

const actionSchema = new mongoose.Schema({
  meta: {
    turnId: {type: Number},
    playerId: {type: Number, min: 0, max: 3}
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
const Action = mongoose.model('Action', actionSchema);

module.exports = {
  Action
};
