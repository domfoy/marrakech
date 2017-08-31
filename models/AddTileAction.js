const mongoose = require('mongoose'),
      _ = require('lodash');

const {positionSchema} = require('./Position.js');
const {ActionTypes} = require('./Consts.js');

const addTileAction = {
  type: {
    type: String,
    default: ActionTypes.addTile,
    enums: [ActionTypes.addTile]
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

const addTileActionSchema = new mongoose.Schema(addTileAction, {
  _id: false,
  discriminatorKey: 'kind'
});

const AddTileActionAction = Action.discriminator('AddTileActionAction', addTileActionSchema);

module.exports = {
  AddTileActionAction
};
