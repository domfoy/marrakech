const _ = require('lodash');

const {
  fetchGame,
  setAction,
  addNextActionContext
} = require('../api/action.js');

const {init: initGame} = require('../api/game/lib');

async function handleConnection(socket) {
  console.log('A user is connected');

  const game = await initGame(socket.id);

  socket.emit('onInitGame', formatGame(game));

  socket.on('onPostAction', handlePostAction.bind(null, socket, game));
}

async function handlePostAction(socket, action, game) {
  const nextActionContext = await postAction(action);

  socket.emit('onNextActionContext', nextActionContext);
}

async function postAction(game, action) {
  const game = await fetchGame(action);

  await setAction(game);

  return addNextActionContext(game);
}

function socketHandler(io) {
  if (!io) {
    throw new Error('no io');
  }
  io.on('connection', handleConnection);
}

function formatGame (game) {
    console.log('created game', game);

    const formattedGame = _.pick(game, [
        'currentTurn',
        'playerCount',
        'totalTurns'
    ]);
    console.log(formattedGame);
    return formattedGame;
}

module.exports = socketHandler;
