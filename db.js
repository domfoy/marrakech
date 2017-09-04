// const fs = require('fs');
require('./models');


const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = Promise;

function connect() {
  return mongoose.connect(config.dbUrl, {useMongoClient: true});
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect
};
