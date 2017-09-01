const mongoose = require('mongoose');

const coordinateType = {
  type: Number,
  required: true,
  set: v => Math.round(v) % 7
};

const positionSchema = new mongoose.Schema({
  x: coordinateType,
  y: coordinateType
}, {
  _id: false,
  bufferCommands: false
});

const Position = mongoose.model('Position', positionSchema);
console.log('devrait  etre avant');

module.export = {
  Position,
  positionSchema
};
