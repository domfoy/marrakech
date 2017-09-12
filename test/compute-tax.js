const _ = require('lodash');
const test = require('ava');

const {makeLayer} = require('./helpers/board.js');

const {payTax} = require('../src/core/lib');

const tests = [
  {
    input: {
      game: {
        board: {
          layer: makeLayer([
            '1000000',
            '1000000',
            '1000000',
            '1000200',
            '1000000',
            '1000000',
            '1000000'
          ]),
          coloursDomains: [
            {
              colourId: 1,
              domains: [[0, 7, 14, 21, 28, 35, 42]]
            },
            {
              colourId: 2,
              domains: [[25]]
            }
          ]
        },
        players: [
          {
            money: 10,
            colours: [1, 3]
          },
          {
            money: 10,
            colours: [2, 4]
          }
        ],
        actions: [{
          meta: {
            playerId: 1
          }
        }]
      },
      assam: {
        position: {
          x: 4,
          y: 3
        }
      }
    },
    expected: {
      debtorId: 1,
      creditorId: 2,
      amount: 1
    }
  }
];

test('should compute tax', (t) => {
  _.forEach(tests, (testOccurence) => {
    const tax = payTax(testOccurence.input.game, testOccurence.input.assam);

    t.deepEqual(tax, testOccurence.expected);
  });
});
