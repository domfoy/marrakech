const mongoose = require('mongoose');

const {Action} = require('./Action.js');
const {positionSchema} = require('./Position.js');
const {ActionTypes} = require('./Consts.js');

const LayRugActionSchemaObject = {
  type: {
    type: String,
    default: ActionTypes.layRug,
    enums: [ActionTypes.layRug]
  },
  payload: {
    positions: {
      type: [positionSchema],
      required: true,
      validate: (v) => {
        return v.length === 2 && (Math.abs(v[0].x - v[1].x) + Math.abs(v[0].y - v[1].y)) === 1;
      }
    }
  }
};

const layRugActionSchema = new mongoose.Schema(LayRugActionSchemaObject, {
  _id: false,
  discriminatorKey: 'kind'
});

const LayRugAction = Action.discriminator('LayRugAction', layRugActionSchema);

module.exports = {
  LayRugAction
};
