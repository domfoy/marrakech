const mongoose = require('mongoose'),
      _ = require('lodash');

console.log('devrait  etre apres');
const positionSchema = require('mongoose').model('Position').schema;
const actionSchema = require('mongoose').model('Action').schema;

// const {positionSchema} = require('./Position.js');
// const {actionSchema} = require('./Action.js');
const {Directions} = require('./Consts.js');

// console.log('test', positionSchema);
const gameSchema = new mongoose.Schema({
  currentTurn: {type: Number},
  assam: {
    direction: {type: String, enum: _.values(Directions)},
    position: positionSchema
  },
  actions: [actionSchema]
}, {
  bufferCommands: false,
  toObject: {
    retainKeyOrder: true
    // transform: (doc, ret) => Object.assign(
    //   {
    //     assam: _.pick(_.get(ret, 'assam'), 'direction', 'x', 'y')
    //   },
    //   _.pick(ret, 'currentTurn')
    // )
  }
});


gameSchema.methods.getCurrentAction = function getCurrentAction() {
  return _.last(this.actions);
};

const Game = mongoose.model('Game', gameSchema);

module.exports = {
  Game
};
