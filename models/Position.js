const coordinateType = {
  type: Number,
  required: true
  set: (v) => Math.round(v) % 7
}

const positionSchema = new mongoose.Schema({
  x: coordinateType,
  y: coordinateType,
}, {
  _id: false
});

const Position = new mongoose.Model('Position', positionSchema);

module.export = {
  positionSchema,
  Position
};
