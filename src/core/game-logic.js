const _ = require('lodash');

const {ActionTypes} = require('../../models');
const {drawDice, moveAssam, payTax} = require('./lib');

module.exports = {
  orientAssamPostProcess,
  layRugPostProcess
};

async function orientAssamPostProcess(game) {
  const savedGame = game.toObject();

  const draw = drawDice();
  moveAssam(game, draw);
  payTax(game);

  if (isOver(game)) {
    return;
  }

  let turnId;
  let playerId;
  let actionType;
  let colour;

  const hasCurrentPlayerLost = !_.includes(game.remainingPlayerIds, savedGame.pendingAction.playerId);

  if (!hasCurrentPlayerLost) {
    turnId = savedGame.pendingAction.turnId;
    playerId = savedGame.pendingAction.playerId;
    actionType = ActionTypes.LAY_RUG;
    colour = savedGame.pendingAction.colour;
  } else if (isTurnOver(savedGame)) {
    turnId = savedGame.pendingAction.turnId + 1;
    playerId = game.remainingPlayerIds[0];
    actionType = ActionTypes.ORIENT_ASSAM;
    colour = game.remainingColours[0];
  } else {
    turnId = savedGame.pendingAction.turnId;
    playerId = getNextPlayerId(savedGame);
    actionType = ActionTypes.ORIENT_ASSAM;
    colour = getNextColour(savedGame);
  }

  game.pendingAction = {
    turnId,
    playerId,
    colour,
    type: actionType
  };
}

function isOver(game) {
  return game.remainingPlayerIds.length === 1 || (game.actions.length === game.totalTurns && !!_.last(game.actions).payload);
}

function isTurnOver(game) {
  return _.last(game.remainingPlayerIds) === game.pendingAction.playerId;
}

function getNextPlayerId(game) {
  return game.remainingPlayerIds[game.remainingPlayerIds.indexOf(game.pendingAction.playerId) + 1];
}

function getNextColour(game) {
  return game.remainingColours[game.remainingColours.indexOf(game.pendingAction.colour) + 1];
}

async function layRugPostProcess(game) {
  if (isOver(game)) {
    return;
  }
  const savedGame = game.toObject();

  let turnId;
  let playerId;
  let colour;

  if (isTurnOver(savedGame)) {
    turnId = savedGame.pendingAction.turnId + 1;
    playerId = savedGame.remainingPlayerIds[0];
    colour = savedGame.remainingColours[0];
  } else {
    turnId = savedGame.pendingAction.turnId;
    playerId = getNextPlayerId(savedGame);
    colour = getNextColour(savedGame);
  }

  game.pendingAction = {
    turnId,
    playerId,
    colour,
    type: ActionTypes.ORIENT_ASSAM
  };
}
