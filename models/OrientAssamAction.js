const mongoose = require('mongoose'),
      _ = require('lodash');

const {ActionTypes, Directions} = require('./Consts.js');

const orientAssamAction = {
  type: {
    type: String, 
    set: v => ActionTypes.orientAssam,
    get: v => ActionTypes.orientAssam
  },
  payload: {
    assamDirection: {type: String, enum: _.values(Directions)}
  }
};

const orientAssamActionSchema = new mongoose.Schema(orientAssamAction, {
  _id: false,
  discriminatorKey: 'kind'
});

const OrientAssamAction = Action.discriminator('OrientAssamAction', orientAssamActionSchema);

module.exports = {
  OrientAssamAction
};
