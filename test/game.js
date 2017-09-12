const test = require('ava'),
      request = require('supertest');

const db = require('../db.js'),
      server = require('../app.js').listen();

const {terminateMany} = require('../src/api/game/lib.js');

const gameIds = [];

test.before(() => {
  return db.connect();
});

test.after.always(() => {
  return terminateMany(gameIds);
});

test('ping should respond', (t) => {
  t.plan(1);

  return request(server)
    .get('/ping')
    .expect(200)
    .then((response) => {
      t.is(response.text, 'OK');
    });
});

test('should init a new game', (t) => {
  t.plan(1);

  return request(server)
    .post('/game')
    .expect(201)
    .then((response) => {
      t.regex(response.body._id, /.{24}/);

      gameIds.push(response.body._id);
    });
});

test('should display first action', async (t) => {
  t.plan(1);
  const gameId = await request(server)
    .post('/game')
    .expect(201)
    .then(response => response.body._id);

  gameIds.push(gameId);

  return request(server)
    .get(`/game/${gameId}/action/current`)
    .expect(200)
    .then((response) => {
      const body = response.body;

      t.is(body.type, 'ORIENT_ASSAM');
    });
});

test('should set current action', async (t) => {
  t.plan(1);

  const gameId = await request(server)
    .post('/game')
    .expect(201)
    .then(response => response.body._id);

  gameIds.push(gameId);

  const currentActionId = await request(server)
    .get(`/game/${gameId}/action/current`)
    .expect(200)
    .then(response => response.body._id);

  return request(server)
    .put(`/game/${gameId}/action/${currentActionId}`)
    .send({
      direction: 'LEFT'
    })
    .expect(200)
    .then((response) => {
      const body = response.body;

      t.is(body.payload.direction, 'LEFT');
    });
});

test('should post action', async (t) => {
  t.plan(1);

  const gameId = await request(server)
    .post('/game')
    .expect(201)
    .then(response => response.body._id);

  gameIds.push(gameId);

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
