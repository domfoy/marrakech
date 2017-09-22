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
        [0, 7]
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
      [7, 14]
    ]
  }
];

test('should compute domains', (t) => {
  _.forEach(tests, (testOccurrence) => {
    const game = {
      uncoveredRugs: testOccurrence.input.uncoveredRugs,
      assam: testOccurrence.input.assam
    };

    const freeRugSpots = computeFreeRugSpots(game);

    t.deepEqual(freeRugSpots, testOccurrence.expected);
  });
});
