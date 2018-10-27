const _ = require('lodash');
const test = require('ava');

const {makeLayer} = require('./helpers/board.js');

const {computeColoursDomains} = require('../src/core/lib');

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
    expected: [
      {
        colourId: 1,
        domains: [{cells: [0, 7, 14, 21, 28, 35, 42], size: 7}]
      },
      {
        colourId: 2,
        domains: [{cells: [25], size: 1}]
      }
    ]
  },
  {
    input: [
      '3323300',
      '1220030',
      '1000000',
      '2022200',
      '1000000',
      '1000000',
      '1000000'
    ],
    expected: [
      {
        colourId: 1,
        domains: [{cells: [7, 14], size: 2}, {cells: [28, 35, 42], size: 3}]
      },
      {
        colourId: 2,
        domains: [{cells: [2, 8, 9], size: 3}, {cells: [21], size: 1}, {cells: [23, 24, 25], size: 3}]
      },
      {
        colourId: 3,
        domains: [{cells: [0, 1], size: 2}, {cells: [3, 4], size: 2}, {cells: [12], size: 1}]
      }
    ]
  },
  {
    input: [
      '3322330',
      '3222330',
      '3322300',
      '3322330',
      '0322330',
      '3322330',
      '0333330'
    ],
    expected: [
      {
        colourId: 2,
        domains: [{cells: [2, 3, 8, 9, 10, 16, 17, 23, 24, 30, 31, 37, 38], size: 13}]
      },
      {
        colourId: 3,
        domains: [{
          cells: [0, 1, 4, 5, 7, 11, 12, 14, 15, 18, 21, 22, 25, 26,
            29, 32, 33, 35, 36, 39, 40, 43, 44, 45, 46, 47],
          size: 26
        }]
      }
    ]
  }
];

test('should compute domains', (t) => {
  _.forEach(tests, (testOccurrence) => {
    const layer = makeLayer(testOccurrence.input);

    const domains = computeColoursDomains(layer);

    t.deepEqual(domains, testOccurrence.expected);
  });
});
