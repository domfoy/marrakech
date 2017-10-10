const test = require('ava'),
      request = require('supertest');

const db = require('../db.js'),
      server = require('../app.js').listen();

const {terminateMany} = require('../src/api/game/lib.js');

test.before(() => {
  return db.connect();
});

test.after.always(() => {
  return db.disconnect();
});

test.beforeEach(async (t) => {
  const gameId = await request(server)
    .post('/game')
    .expect(201)
    .then(response => response.body._id);

  t.context.gameIds = [gameId];
});

test.afterEach.always((t) => {
  return terminateMany(t.context.gameIds);
});


test('should handle complete user turn', async (t) => {
  t.plan(1);

  const currentActionId = await request(server)
    .get(`/game/${gameId}/action/current`)
    .expect(200)
    .then(response => response.body._id);

  return request(server)
    .post(`/game/${gameId}/action/${currentActionId}/next`)
    .expect(200)
    .then((response) => {
      const body = response.body;

      t.truthy(body);
    });
});