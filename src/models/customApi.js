/**
 * CustomApi Model
 *
 */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const CustomApiSchema = Schema({
  // TODO: new fields go here
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

CustomApiSchema.pre('save', function (next) {
  this._updatedAt = Date.now();
  next();
});

const getCreator = (_creator) => {
  if (_creator && 'apiRepr' in _creator) {
    return _creator.apiRepr();
  }
  return _creator;
};

CustomApiSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    // TODO: new fields go here
    _creator: getCreator(this._creator),
    // _id is an ObjectID which has the createdAt timestamp encoded into first four bytes
    _createdAt: this._id.getTimestamp(),
    _updatedAt: this._updatedAt,
  };
};

const CustomApi = mongoose.model('CustomApi', CustomApiSchema);

export default CustomApi;
