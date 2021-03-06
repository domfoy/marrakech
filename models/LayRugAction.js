const mongoose = require('mongoose');

const {positionSchema} = require('./Position.js');
const {ActionTypes} = require('./Consts.js');
const {layRugPostProcess} = require('../src/core/game-logic.js');

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

module.exports = function registerLayRugAction() {
  const layRugActionSchema = new mongoose.Schema(LayRugActionSchemaObject, {
    _id: false
  });

  layRugActionSchema.methods.computeNextAction = function computeNextAction() {
    return layRugPostProcess(this);
  };

  mongoose.model('__LayRugAction', layRugActionSchema);
};
