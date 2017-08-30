const mongoose = require('mongoose'),
      _ = require('lodash');

mongoose.Promise = Promise;

const Directions = {
  right: 'RIGHT',
  up: 'UP',
  left: 'LEFT',
  down: 'DOWN'
};

const gameSchema = new mongoose.Schema({
  currentTurn: {type: Number},
  assam: {
    direction: {type: String, enum: _.values(Directions)},
    x: {type: Number, min: 1, max: 7},
    y: {type: Number, min: 1, max: 7}
  }
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
  Game,
  Directions
};
