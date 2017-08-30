const mongoose = require('mongoose');
const initApp = require('../app.js');

mongoose.connect('mongodb://localhost/my-app',
  {useMongoClient: true}
)
.then(db => initApp(db))
.then(app => {
  app.listen(8082);
});
