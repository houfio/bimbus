import { Document, Model, model, models, Schema } from 'mongoose';

import { Role } from '../types';

interface User extends Document {
  username: string,
  password: string,
  email: string,
  role: Role,
  lists: {
    slug: string,
    name: string,
    language: string,
    public: boolean,
    words: string[]
  }[]
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
  lists: {
    type: [{
      slug: {
        type: String,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true,
        unique: true
      },
      language: {
        type: String,
        required: true
      },
      public: {
        type: Boolean,
        required: true
      },
      words: {
        type: [{
          type: String,
          unique: true
        }],
        default: []
      }
    }],
    default: []
  }
}, {
  _id: false,
  versionKey: false
});

export const User: Model<User> = models.User || model('User', schema);
