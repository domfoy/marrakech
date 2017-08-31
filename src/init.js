const ObjectID = require("bson-objectid");

const {Game, Directions, ActionTypes} = require('../models/Game.js');

function init() {
  const game = new Game({
    currentTurn: 0,
    assam: {
      direction: Directions.up,
      x: 3,
      y: 3
    },
    actions: [{
      meta: {
        turnId: 0,
        playerId: 0
      },
      type: ActionTypes.orientAssam,
      payload: {
        assamDirection: Directions.up
      }
    }]
  });

  return game.save().then((savedGame) => {
    return savedGame;
  });
}

module.exports = init;
