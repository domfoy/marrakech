const mongoose = require('mongoose'),
      _ = require('lodash');

mongoose.Promise = Promise;

const {Directions, ActionTypes} = require('./Consts.js');

const gameSchema = new mongoose.Schema({
  currentTurn: {type: Number},
  assam: {
    direction: {type: String, enum: _.values(Directions)},
    x: {type: Number, min: 1, max: 7},
    y: {type: Number, min: 1, max: 7}
  },
  actions: [{
    id: ObjectId,
    meta: {
      turnId: {type: Number},
      playerId: {type: Number, min: 0, max: 3}
    },
    type: {type: String, enum: _.values(ActionTypes)},
    payload: Object
  }]
}, {
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
const Game = mongoose.model('Game', gameSchema);

module.exports = {
  Game
};
