const _ = require('lodash');
const test = require('ava');

const {makeLayer} = require('./helpers/board.js');

const {computePlayersDomains} = require('../src/core/lib');

const tests = [
  {
    input: [
      '1000000',
      '1000000',
      '1000000',
      '1000200',
      '1000000',
      '1000000',
      '1000000'
    ],
    expected: {
      1: [{size: 7, cells: [0, 7, 14, 21, 28, 35, 42]}],
      2: [{size: 1, cells: [25]}],
    }
  },
  {
    input: [
      '1000000',
      '1000000',
      '1000000',
      '2022200',
      '1000000',
      '1220030',
      '3323300'
    ],
    expected: {
      1: [
        {size: 2, cells: [7, 14]},
        {size: 3, cells: [28, 35, 42]}
      ],
      2: [
        {size: 3, cells: [2, 8, 9]},
        {size: 1, cells: [21]},
        {size: 3, cells: [23, 24, 25]}
      ],
      3: [
        {size: 2, cells: [0, 1]},
        {size: 2, cells: [3, 4]},
        {size: 1, cells: [12]}
      ]
    }
  },
  {
    input: [
      '0333330',
      '3322330',
      '0322330',
      '3322330',
      '3322300',
      '3222330',
      '3322330'
    ],
    expected: {
      2: [
        {size: 13, cells: [2, 3, 8, 9, 10, 16, 17, 23, 24, 30, 31, 37, 38]}
      ],
      3: [
        {size: 26,
          cells: [0, 1, 4, 5, 7, 11, 12, 14, 15, 18, 21, 22, 25, 26,
            29, 32, 33, 35, 36, 39, 40, 43, 44, 45, 46, 47]}
      ]
    }
  }
];

test('should compute domains', (t) => {
  _.forEach(tests, (testOccurence) => {
    const layer = makeLayer(testOccurence.input);

    const domains = computePlayersDomains(layer);

    t.deepEqual(domains, testOccurence.expected);
  });
});
