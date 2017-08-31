const mongoose = require('mongoose'),
      _ = require('lodash');

const ActionTypes = {
  orientAssam: 'ORIENT_ASSAM',
  addTile: 'ADD_TILE'
};

const {Directions} = require('./Consts.js');
const {positionSchema} = require('./Position.js');

const actionSchema = new mongoose.Schema({
    id: ObjectId,
    meta: {
      turnId: {type: Number},
      playerId: {type: Number, min: 0, max: 3}
    },
    type: {
      type: String,
      enum: _.values(ActionTypes),
      required: true
    },
    payload: {
      type: Object,
      required: true
    }
  }]
}, {
  _id: false,
  discriminatorKey: 'kind',
  toObject: {
    retainKeyOrder: true,
    transform: (doc, ret) => Object.assign(
      {
        assam: _.pick(_.get(ret, 'assam'), 'direction', 'x', 'y')
      },
      _.pick(ret, 'currentTurn')
    )
  }
});
const Action = mongoose.model('Action', actionSchema);

const orientAssamAction = {
  type: ActionTypes.orientAssam,
  payload: {
    assamDirection: {type: String, enum: _.values(Directions)}
  }
};

const addTileAction = {
  type: ActionTypes.addTile,
  payload: {
    positions: {
      type: [positionSchema],
      required: true,
      validate: (v) => {
        return v.length === 2 &&
      }
        {type: String, enum: _.values(Directions)}
      }
  }
};

const OrientAssamAction = Action.discriminator('OrientAssamAction',
  new mongoose.Schema({

});
module.exports = {
  Action,
  ActionTypes
};
