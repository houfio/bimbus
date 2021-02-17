import { Document, Model, model, models, Schema } from 'mongoose';

interface User extends Document {
  email: string,
  password: string,
  username: string,
  lists: {
    name: string,
    slug: string,
    language: string,
    public: boolean,
    words: string[]
  }[]
}

const schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
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
