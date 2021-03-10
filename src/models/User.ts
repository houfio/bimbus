import { Document, model, models, PaginateModel, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { Role } from '../types';

interface User extends Document {
  username: string,
  password: string,
  email: string,
  role: Role,
  dictionaries: Schema.Types.ObjectId[]
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

schema.plugin(paginate as any);

export const User = (models.User || model('User', schema)) as PaginateModel<User>;
