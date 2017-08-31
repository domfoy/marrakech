const mongoose = require('mongoose'),
      _ = require('lodash');

const {positionSchema} = require('./Position.js');
const {ActionTypes} = require('./Consts.js');

const addCarpetAction = {
  type: {
    type: String,
    default: ActionTypes.addCarpet,
    enums: [ActionTypes.addCarpet]
  },
  payload: {
    positions: {
      type: [positionSchema],
      required: true,
      validate: (v) => {
        return v.length === 2 && (Math.abs(v[0].x - v[1].x) + Math.abs(v[0].y - v[1].y)) === 1
      }
  }
};

const addCarpetActionSchema = new mongoose.Schema(addCarpetAction, {
  _id: false,
  discriminatorKey: 'kind'
});

const AddCarpetAction = Action.discriminator('AddCarpetAction', addCarpetActionSchema);

module.exports = {
  AddCarpetAction
};
