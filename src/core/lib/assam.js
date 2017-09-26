const _ = require('lodash');

const {BOARD_SIDE_SIZE, Directions} = require('../../../models/Consts.js');

const NEUTRAL_COLOR = 0;
const NO_TAX = 0;
const LIMITS = {
  LOWER: 0,
  UPPER: 6
};

module.exports = {
  moveAssam,
  payTax,
  formatResponse
};

function moveAssam(assam, draw) {
  const {x, y, direction} = _moveAssam(assam, draw);

  return {
    direction,
    position: {
      x,
      y
    }
  };
}

function _moveAssam(assam, draw) {
  const {dx, dy} = computeUnitStep(assam.direction);

  const directMove = {
    x: assam.position.x + (draw * dx),
    y: assam.position.y + (draw * dy)
  };

  // too to the left
  if (directMove.x < LIMITS.LOWER && directMove.y === LIMITS.UPPER) {
    return {
      x: LIMITS.LOWER,
      y: LIMITS.UPPER + directMove.x + 1,
      direction: Directions.down
    };
  }
  if (directMove.x < LIMITS.LOWER && directMove.y % 2 === 0) {
    return {
      x: -directMove.x - 1,
      y: directMove.y + 1,
      direction: Directions.right
    };
  }
  if (directMove.x < LIMITS.LOWER && directMove.y % 2 !== 0) {
    return {
      x: -directMove.x - 1,
      y: directMove.y - 1,
      direction: Directions.right
    };
  }

  // too to the right
  if (directMove.x > LIMITS.UPPER && directMove.y === LIMITS.LOWER) {
    return {
      x: LIMITS.UPPER,
      y: directMove.x - LIMITS.UPPER - 1,
      direction: Directions.up
    };
  }
  if (directMove.x > LIMITS.UPPER && directMove.y % 2 === 0) {
    return {
      x: ((2 * LIMITS.UPPER) + 1) - directMove.x,
      y: directMove.y - 1,
      direction: Directions.left
    };
  }
  if (directMove.x > LIMITS.UPPER && directMove.y % 2 !== 0) {
    return {
      x: ((2 * LIMITS.UPPER) + 1) - directMove.x,
      y: directMove.y + 1,
      direction: Directions.left
    };
  }

  // too up
  if (directMove.y > LIMITS.UPPER && directMove.x === LIMITS.LOWER) {
    return {
      x: directMove.y - LIMITS.UPPER - 1,
      y: LIMITS.UPPER,
      direction: Directions.right
    };
  }
  if (directMove.y > LIMITS.UPPER && directMove.x % 2 === 0) {
    return {
      x: directMove.x - 1,
      y: ((2 * LIMITS.UPPER) + 1) - directMove.y,
      direction: Directions.down
    };
  }
  if (directMove.y > LIMITS.UPPER && directMove.x % 2 !== 0) {
    return {
      x: directMove.x + 1,
      y: ((2 * LIMITS.UPPER) + 1) - directMove.y,
      direction: Directions.down
    };
  }

  // too down
  if (directMove.y < LIMITS.LOWER && directMove.x === LIMITS.UPPER) {
    return {
      x: LIMITS.UPPER + directMove.y + 1,
      y: LIMITS.LOWER,
      direction: Directions.left
    };
  }
  if (directMove.y < LIMITS.LOWER && directMove.x % 2 === 0) {
    return {
      x: directMove.x + 1,
      y: -directMove.y - 1,
      direction: Directions.up
    };
  }
  if (directMove.y < LIMITS.LOWER && directMove.x % 2 !== 0) {
    return {
      x: directMove.x - 1,
      y: -directMove.y - 1,
      direction: Directions.up
    };
  }

  return {
    x: directMove.x,
    y: directMove.y,
    direction: assam.direction
  };
}

function computeUnitStep(direction) {
  switch (direction) {
  case Directions.right:
    return {
      dx: 1,
      dy: 0
    };
  case Directions.up:
    return {
      dx: 0,
      dy: 1
    };
  case Directions.left:
    return {
      dx: -1,
      dy: 0
    };
  case Directions.down:
    return {
      dx: 0,
      dy: -1
    };
  default:
    throw new Error('Invalid assam direction');
  }
}

function payTax(game, newAssam) {
  const assamPosition = newAssam.position;

  const cell = (assamPosition.y * BOARD_SIDE_SIZE) + assamPosition.x;

  const colourId = game.board.layer[cell];

  if (colourId === NEUTRAL_COLOR) {
    return NO_TAX;
  }

  const creditorId = _.findIndex(
    game.players,
    p => p.colours.includes(colourId)
  ) + 1;

  const debtorId = _.last(game.actions).meta.playerId;
  if (creditorId === debtorId) {
    return NO_TAX;
  }
  const involvedColoursDomains = _.find(game.board.coloursDomains, ds => ds.colourId === colourId);
  const involvedColoursDomain = _.find(involvedColoursDomains.domains, d => d.includes(cell));
  const taxAmount = involvedColoursDomain.length;

  return {
    debtorId,
    creditorId,
    amount: taxAmount
  };
}

function formatResponse(assam, tax) {
  if (tax === NO_TAX) {
    return {
      assam,
      tax: {
        amount: 0
      }
    };
  }

  return {
    assam,
    tax
  };
}
