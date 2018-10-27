const test = require('ava'),
      config = require('config'),
      io = require('socket.io-client');

const db = require('../db.js'),
      server = require('../app.js');

test.before(async () => {
  await db.connect();

  return server.listen(config.port);
});

test.after.always(() => {
  return db.disconnect();
});

test.beforeEach((t) => {
  const client = io.connect('http://localhost:8082');

  return new Promise((resolve) => {
    client.on('event:game_created', (game) => {
      t.context.game = game;
      t.context.client = client;

      resolve();
    });
  });
});

test.afterEach((t) => {
  if (t.context.client.connected) {
    t.context.client.disconnect();
  }
});

test('should handle complete user turn', async (t) => {
  t.context.client.emit('event:action_submitted', {
    direction: 'LEFT'
  });

  return new Promise((resolve) => {
    let turn = 1;
    t.context.client.on('event:new_pending_action_set', (action) => {
      t.truthy(action);

      if (turn < 2) {
        t.context.client.emit('event:action_submitted', {
          positions: [
            {x: 1, y: 2},
            {x: 1, y: 3}
          ]
        });

        turn++;
      } else {
        resolve();
      }
    });
  });
});
