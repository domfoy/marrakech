const mongoose = require('mongoose'),
      _ = require('lodash');

mongoose.Promise = Promise;

const {Directions, ActionTypes} = require('./Consts.js');

const gameSchema = new mongoose.Schema({
  currentTurn: {type: Number},
  assam: {
    direction: {type: String, enum: _.values(Directions)},
    position: positionSchema
  },
  actions: [actionSchema]
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
