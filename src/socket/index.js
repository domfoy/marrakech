const {
  fetchGame,
  setAction,
  addNextActionContext
} = require('../api/action.js');

function handleConnection(socket) {
  console.log('A user is connected', socket);

  socket.on('postAction', handlePostAction.bind(null, socket));
}

async function handlePostAction(socket, action) {
  const nextActionContext = await postAction(action);

  socket.emit('nextActionContext', nextActionContext);
}

async function postAction(action) {
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
