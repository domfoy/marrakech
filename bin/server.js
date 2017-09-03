const config = require('config');

const db = require('../db.js');
const app = require('../app.js');


db.connect()
  .then(() => {
    app.listen(config.port);
    console.log('Server listening on port', config.port);
  })
  .catch((err) => {
    console.error(err);
  });
