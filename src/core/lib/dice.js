const randLimits = [1 / 6, 0.5, 5 / 6];

module.exports = {
  drawDice
};

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
