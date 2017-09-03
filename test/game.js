/* eslint-disable no-param-reassign */

const test = require('ava'),
      request = require('supertest');

const db = require('../db.js'),
      server = require('../app.js').listen();

const {terminate} = require('../src/api/game/lib.js');

test.beforeEach(async () => {
  return db.connect();
});

test.afterEach.always(async (t) => {
  await terminate(t.context.gameId);

  return db.disconnect();
});

test('should init a new game', (t) => {
  t.plan(1);

  return request(server)
    .get('/ping')
    .expect(200)
    .then((response) => {
      t.is(response.text, 'OK');

      t.pass();
    });
});

test.only('should init a new game', (t) => {
  // t.plan(1);

  return request(server)
    .post('/game')
    .expect(201)
    .then((response) => {
      t.regex(response.body._id, /.{24}/);

      t.pass();
    });
});
