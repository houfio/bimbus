import { Document, model, models, PaginateModel, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import paginate from 'mongoose-paginate-v2';

import { Email } from '../structs/refinements/Email';
import { Password } from '../structs/refinements/Password';
import { Username } from '../structs/refinements/Username';
import { ModelType, Role } from '../types';

import { Dictionary } from './Dictionary';

interface User extends Document {
  username: string,
  password: string,
  email: string,
  role: Role,
  dictionaries: ModelType<typeof Dictionary>[]
}

const schema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: unknown) => Username.is(value)
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value: unknown) => Password.is(value)
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: unknown) => Email.is(value)
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  dictionaries: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Dictionary',
      autopopulate: true
    }],
    required: true,
    default: []
  }
}, {
  versionKey: false
});

schema.plugin(paginate as any);
schema.plugin(autopopulate as any);

export const User = (models.User || model('User', schema)) as PaginateModel<User>;
