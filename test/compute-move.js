const test = require('ava');

const {computeNextAssam} = require('../src/core/game-logic.js'),
      {Directions} = require('../models/Consts.js');

const tests = [
  // [[3, 3, Directions.up, 2], [3, 5, Directions.up]],
  [[2, 6, Directions.left, 3], [0, 6, Directions.down]],
  [[2, 2, Directions.left, 3], [0, 3, Directions.right]],
  [[1, 3, Directions.left, 4], [2, 2, Directions.right]],

  [[5, 0, Directions.right, 3], [6, 1, Directions.up]],
  [[6, 1, Directions.right, 2], [5, 2, Directions.left]],
  [[4, 2, Directions.right, 4], [5, 1, Directions.left]],

  [[0, 6, Directions.up, 1], [0, 6, Directions.right]],
  [[1, 6, Directions.up, 2], [2, 5, Directions.down]],
  [[2, 6, Directions.up, 3], [1, 4, Directions.down]]
];

test('moves', (t) => {
  t.plan(tests.length);

  for (let i = 0; i < tests.length; i += 1) {
    const assam = {
      direction: tests[i][0][2],
      position: {
        x: tests[i][0][0],
        y: tests[i][0][1]
      }
    };
    const draw = tests[i][0][3];

    const expectation = {
      direction: tests[i][1][2],
      position: {
        x: tests[i][1][0],
        y: tests[i][1][1]
      }
    };
    t.deepEqual(computeNextAssam(assam, draw), expectation);
  }
});
