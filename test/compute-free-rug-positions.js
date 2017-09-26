const _ = require('lodash');
const test = require('ava');

const {computeFreeRugSpots} = require('../src/core/lib');

const tests = [
  {
    input: {
      board: [
        '1000000',
        '1000000',
        '1000000',
        '1000200',
        '1000000',
        '1000000',
        '1000000'
      ],
      uncoveredRugs: [
        {
          spot: [0, 7],
          colour: 1
        }
      ],
      assam: {
        position: {
          x: 1,
          y: 1
        }
      }
    },
    expected: [
      [2, 9],
      [9, 10],
      [9, 16],
      [15, 16],
      [15, 22],
      [14, 15],
      [7, 14],
      [0, 1],
      [1, 2]
    ]
  }
];

test('should compute domains', (t) => {
  _.forEach(tests, (testOccurrence) => {
    const game = {
      actions: [
        {
          meta: {
            playerId: 2
          }
        }
      ],
      players: [
        {
          colours: [1]
        },
        {
          colours: [2]
        }
      ],
      board: {
        uncoveredRugs: testOccurrence.input.uncoveredRugs
      },
      assam: testOccurrence.input.assam
    };

    game.getCurrentPlayerColours = function getCurrentPlayerColours() {
      const lastAction = _.last(this.actions);

      const currentPlayer = lastAction.meta.playerId;

      return this.players[currentPlayer - 1].colours;
    };

    const freeRugSpots = computeFreeRugSpots(game);

    t.deepEqual(freeRugSpots, testOccurrence.expected);
  });
});
