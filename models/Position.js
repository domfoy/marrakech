const mongoose = require('mongoose');

const coordinateType = {
  type: Number,
  required: true,
  validate: v => v >= -3 && v <= 3
};

module.exports = function registerPosition() {
  const positionSchema = new mongoose.Schema({
    x: coordinateType,
    y: coordinateType
  }, {
    _id: false,
    bufferCommands: false
  });

  mongoose.model('Position', positionSchema);
};
