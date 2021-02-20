import { Document, Model, model, models, Schema } from 'mongoose';

interface User extends Document {
  username: string,
  password: string,
  email: string,
  role: string,
  lists: {
    name: string,
    slug: string,
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
      name: String,
      slug: String,
      language: String,
      public: Boolean,
      words: {
        type: [String],
        default: []
      }
    }],
    default: []
  }
}, {
  versionKey: false
});

export const User: Model<User> = models.User || model('User', schema);
