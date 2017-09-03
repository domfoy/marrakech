const {Directions} = require('../../../models');
const Game = require('mongoose').model('Game');
const Position = require('mongoose').model('Position');
const OrientAssamAction = require('mongoose').model('OrientAssamAction');

function init() {
  const game = new Game({
    currentTurn: 0,
    assam: {
      direction: Directions.up,
      position: new Position({x: 3, y: 3})
    },
    actions: [new OrientAssamAction({
      meta: {
        turnId: 0,
        playerId: 0
      }
    })]
  });

  return game.save();
}

function terminate(gameId) {
  if (!gameId) {
    return Promise.resolve();
  }
  return Game.findByIdAndRemove(gameId);
}

module.exports = {
  init,
  terminate
};
