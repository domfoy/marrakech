const _ = require('lodash');
const test = require('ava');

const {makeLayer} = require('./helpers/board.js');
const {computeFreeRugSpots} = require('../src/core/lib');

const tests = [
  {
    input: {
      board: [
        '3000000',
        '3000000',
        '1000000',
        '2000000',
        '1000000',
        '1000000',
        '1000000'
      ],
      uncoveredRugs: [
        {
          spot: [0, 7],
          colour: 1
        },
        {
          spot: [35, 42],
          colour: 3
        },
      ],
      assam: {
        position: {
          x: -2,
          y: -3
        }
      }
    },
    expected: [
      [{x: -1, y: -3}, {x: 0, y: -3}],
      [{x: -1, y: -3}, {x: -1, y: -2}],
      [{x: -3, y: -2}, {x: -2, y: -2}],
      [{x: -2, y: -2}, {x: -1, y: -2}],
      [{x: -2, y: -2}, {x: -2, y: -1}]
    ]
  }
];

test('should compute domains', (t) => {
  _.forEach(tests, (testOccurrence) => {
    const game = {
      pendingAction: {
        turnId: 1,
        playerId: 1,
        type: 'LAY_RUG'
      },
      players: [
        {
          id: 1,
          money: 30,
          colours: ['BLUE', 'RED']
        },
        {
          id: 2,
          money: 30,
          colours: ['YELLOW', 'BROWN']
        }
      ],
      board: {
        layer: makeLayer(testOccurrence.input.board),
        uncoveredRugs: testOccurrence.input.uncoveredRugs
      },
      assam: testOccurrence.input.assam
    };

    game.getCurrentPlayerColours = function getCurrentPlayerColours() {
      const currentPlayer = this.pendingAction.playerId;

      return this.players[currentPlayer - 1].colours;
    };

    const freeRugSpots = computeFreeRugSpots(game);
    console.log(freeRugSpots);
    t.deepEqual(freeRugSpots, testOccurrence.expected);
  });
});
