const config = require('config');

const db = require('../db.js');
const initApp = require('../app.js');


db.connect()
  .then(initApp)
  .then((app) => {
    app.listen(config.port);
  })
  .catch((err) => {
    console.error(err);
  });
