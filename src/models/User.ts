import { Document, Model, model, models, ObjectId, Schema } from 'mongoose';

import { Role } from '../types';

interface User extends Document {
  username: string,
  password: string,
  email: string,
  role: Role,
  dictionaries: ObjectId[]
}

const schema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  dictionaries: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Dictionary'
    }],
    required: true,
    default: []
  }
}, {
  versionKey: false
});

export const User: Model<User> = models.User || model('User', schema);
