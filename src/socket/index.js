function handleConnection(client) {
  console.log('A user is connected', client);
}

function socketHandler(io) {
  if (!io) {
    throw new Error('no io');
  }
  io.on('connection', handleConnection);
}

module.exports = socketHandler;
