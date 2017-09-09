const _ = require('lodash');

const {Directions} = require('../../../models');
const Game = require('mongoose').model('Game');
const Position = require('mongoose').model('Position');
const OrientAssamAction = require('mongoose').model('OrientAssamAction');

function init() {
  const game = new Game({
    playerCount: 2,
    totalTurns: 24,
    currentTurn: 1,
    assam: {
      direction: Directions.up,
      position: new Position({x: 3, y: 3})
    },
    board: {
      layer: Array.from('0'.repeat(49)).map(parseFloat),
      playersDomains: [
        {
          playerId: 1,
          domains: [
            {
              size: 0,
              cells: []
            }
          ]
        },
        {
          playerId: 2,
          domains: [
            {
              size: 0,
              cells: []
            }
          ]
        }
      ]
    },
    players: [
      {
        money: 30,
        colours: [1, 2]
      },
      {
        money: 30,
        colours: [3, 4]
      }
    ],
    actions: [new OrientAssamAction({
      meta: {
        turnId: 0,
        playerId: 0
      },
      type: 'ORIENT_ASSAM',
      payload: {
        direction: 'UP'
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

function terminateMany(gameIds) {
  if (!(_.isArray(gameIds) && gameIds.length > 0)) {
    return Promise.resolve();
  }
  return Game.remove({_id: {$in: gameIds}});
}

module.exports = {
  init,
  terminate,
  terminateMany
};
