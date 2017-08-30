const {Game, Directions} = require('../models/Game.js');

function init() {
  const game = new Game({
    currentTurn: 0,
    assam: {
      direction: Directions.up,
      x: 3,
      y: 3
    }
  });

  return game.save().then((savedGame) => {
    return savedGame;
  });
}

module.exports = init;
