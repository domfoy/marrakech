const mongoose = require('mongoose'),
      _ = require('lodash');

const {ActionTypes} = require('./Consts.js');
const {positionSchema} = require('./Position.js');

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
      required: true
    }
  }]
}, {
  discriminatorKey: 'kind',
  toObject: {
    retainKeyOrder: true,
    transform: (doc, ret) => Object.assign(
      {
        assam: _.pick(_.get(ret, 'assam'), 'direction', 'x', 'y')
      },
      _.pick(ret, 'currentTurn')
    )
  }
});
const Action = mongoose.model('Action', actionSchema);

module.exports = {
  Action
};
