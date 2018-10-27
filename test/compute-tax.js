const _ = require('lodash');
const test = require('ava');

const {ColoursAsArray} = require('../models/Consts.js');

const {makeLayer} = require('./helpers/board.js');

const {payTax} = require('../src/core/lib');

const tests = [
  {
    input: {
      game: {
        pendingAction: {
          turnId: 1,
          playerId: 1,
          type: 'ORIENT_ASSAM'
        },
        board: {
          layer: makeLayer([
            '1000000',
            '1000000',
            '1000000',
            '1000220',
            '1000000',
            '1000000',
            '1000000'
          ]),
          coloursDomains: [
            {
              colourId: 1,
              domains: [{cells: [0, 7, 14, 21, 28, 35, 42], size: 7}]
            },
            {
              colourId: 2,
              domains: [{cells: [25, 26], size: 2}]
            }
          ]
        },
        players: [
          {
            id: 1,
            money: 10,
            colours: ['BLUE', 'RED']
          },
          {
            id: 2,
            money: 10,
            colours: ['YELLOW', 'BROWN']
          }
        ],
        actions: [{
          meta: {
            playerId: 1
          }
        }],
        assam: {
          position: {
            x: 1,
            y: 0
          }
        }
      }
    },
    expected: {
      debtorId: 1,
      creditorId: 2,
      amount: 2
    }
  }
];

test('should compute tax', (t) => {
  _.forEach(tests, (testOccurence) => {
    testOccurence.input.game.getCellColour = function getCellColour(cellIndex) {
      const cell = this.board.layer[cellIndex];
      return ColoursAsArray[cell];
    };

    const tax = payTax(testOccurence.input.game, testOccurence.input.assam);

    t.deepEqual(tax, testOccurence.expected);
  });
});
