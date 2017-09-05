const randLimits = [1 / 6, 0.5, 5 / 6];

const {Directions} = require('../../models/Consts.js');

const LIMITS = {
  LOWER: 0,
  UPPER: 6
};

async function orientAssamPostProcess(game) {
  const draw = drawDice();

  const {position, direction} = computeNextAssam(game.assam, draw);
}

function computeNextAssam(assam, draw) {
  const {x, y, direction} = _computeNextAssam(assam, draw);

  return {
    direction,
    position: {
      x,
      y
    }
  };
}

function _computeNextAssam(assam, draw) {
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

function drawDice() {
  const res = Math.random();

  if (res < randLimits[0]) {
    return 1;
  }

  if (res < randLimits[1]) {
    return 2;
  }

  if (res < randLimits[2]) {
    return 3;
  }

  return 4;
}

module.exports = {
  computeNextAssam
};
