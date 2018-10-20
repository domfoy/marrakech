const _ = require('lodash');

const {Directions, ActionTypes, Colours} = require('../../../models');
const Game = require('mongoose').model('Game');
const Position = require('mongoose').model('Position');

function init() {
  const layer = [];
  let size = 49;

  while (size--) layer[size] = Colours.NONE;
  const game = new Game({
    playerCount: 2,
    remainingPlayerIds: [1, 2],
    totalTurns: 24,
    remainingColours: [Colours.BLUE, Colours.RED, Colours.YELLOW, Colours.BROWN],
    pendingAction: {
      turnId: 1,
      playerId: 1,
      colour: Colours.BLUE,
      type: ActionTypes.ORIENT_ASSAM
    },
    assam: {
      direction: Directions.up,
      position: new Position({x: 0, y: 0})
    },
    board: {
      layer,
      coloursDomains: [
        {
          colour: Colours.BLUE,
          domains: [[]]
        },
        {
          colour: Colours.YELLOW,
          domains: [[]]
        },
        {
          colour: Colours.RED,
          domains: [[]]
        },
        {
          colour: Colours.BROWN,
          domains: [[]]
        }
      ],
      uncoveredRugs: [

      ]
    },
    players: [
      {
        id: 1,
        money: 30,
        colours: [Colours.BLUE, Colours.RED]
      },
      {
        id: 2,
        money: 30,
        colours: [Colours.YELLOW, Colours.BROWN]
      }
    ],
    actions: []
  });

  return game.save();
}

function get(gameId) {
  return Game.findById(gameId);
}

function terminate(gameId) {
  if (!gameId) {
    return Promise.resolve();
  }
  return Game.findByIdAndRemove(gameId);
}

function terminateMany(gameIds) {
  if (!(_.isArray(gameIds) && gameIds.length > 0)) {
    return Promise.resolve();
  }
  return Game.remove({_id: {$in: gameIds}});
}

module.exports = {
  init,
  get,
  terminate,
  terminateMany
};
