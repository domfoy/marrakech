const assert = require('assert');

const _ = require('lodash');

module.exports = {
  makeLayer
};

function makeLayer(rawLayer) {
  // const reorderedLayer = _.concat([], ..._(layer).chunk(BOARD_LENGTH).reverse().value());

  assert(_.isArray(rawLayer) && rawLayer.length === 7);

  _.forEach(rawLayer, (line) => {
    assert(_.isString(line) && line.length === 7);
  });

  const currentLayer = _.reduce(_.reverse(rawLayer),
    (cur, line) => {
      return cur.concat(line.split('').map(char => parseInt(char, 10)));
    },
    []
  );

  return currentLayer;
}
