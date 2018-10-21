const test = require('ava');

const {moveAssam} = require('../src/core/lib'),
      {Directions} = require('../models/Consts.js');

const tests = [
  // [input, expectation]
  // [[x, y, direction, shift], [x, y, direction]],
  [[-1, 3, Directions.left, 3], [-3, 2, Directions.right]],
  [[-1, -1, Directions.left, 3], [-3, -2, Directions.right]],
  [[-2, 0, Directions.left, 4], [-1, 1, Directions.right]],

  [[2, -3, Directions.right, 3], [2, -2, Directions.left]],
  [[3, -2, Directions.right, 2], [2, -3, Directions.left]],
  [[1, -1, Directions.right, 4], [2, 0, Directions.left]],

  [[-3, 3, Directions.up, 1], [-2, 3, Directions.down]],
  [[-2, 3, Directions.up, 2], [-3, 2, Directions.down]],
  [[-1, 3, Directions.up, 3], [0, 1, Directions.down]],

  [[0, -2, Directions.down, 3], [1, -2, Directions.up]],
  [[1, -2, Directions.down, 3], [0, -2, Directions.up]],

  [[3, 3, Directions.up, 3], [1, 3, Directions.left]],
  [[3, 3, Directions.right, 3], [3, 1, Directions.down]],
  [[-3, -3, Directions.down, 3], [-1, -3, Directions.right]],
  [[-3, -3, Directions.left, 3], [-3, -1, Directions.up]],
];

test('should move assam to the correct state', (t) => {
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
    t.deepEqual(moveAssam({assam}, draw), expectation, `on iteration ${i}`);
  }
});
