const _ = require('lodash');

const {init: initGame} = require('../api/game/lib');

function socketHandler(io) {
  if (!io) {
    throw new Error('no io');
  }
  io.on('connection', handleConnection);
}

async function handleConnection(socket) {
  console.log('A user is connected');

  const game = await initGame(socket.id);

  socket.emit('event:game_created', formatGame(game));

  socket.on('event:action_submitted', handleActionSubmitted.bind(null, socket, game));
}

function formatGame(game) {
  console.log('game created', game.pendingAction);

  const formattedGame = _.pick(game, [
    'playerCount',
    'totalTurns',
    'pendingAction'
  ]);
  return formattedGame;
}

async function handleActionSubmitted(socket, game, actionSubmission) {
  try {
    await game.applyAction(actionSubmission);
    if (game.isOver()) {
      socket.emit('event:game_over');
    }
    socket.emit('event:new_pending_action_set', formatNextActionContext(game));
  } catch (err) {
    socket.emit('event:action_submission_rejected', err);
    throw err;
  }
}

function formatNextActionContext(game) {
  const context = _.pick(game, [
    'pendingAction'
  ]);
  return context;
}

module.exports = socketHandler;
