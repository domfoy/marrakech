const {
  fetchGame,
  setAction,
  addNextActionContext
} = require('../api/action.js');

const {initGame} = require('../api/game/lib');

function handleConnection(socket) {
  console.log('A user is connected', socket);

  const game = initGame(socket.id);

  socket.on('postAction', handlePostAction.bind(null, socket, game));
}

async function handlePostAction(socket, action, game) {
  const nextActionContext = await postAction(action);

  socket.emit('nextActionContext', nextActionContext);
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

module.exports = socketHandler;
