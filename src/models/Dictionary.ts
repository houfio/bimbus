import { Document, model, Model, models, Schema } from 'mongoose';

interface Dictionary extends Document {
  slug: string,
  name: string,
  language: string,
  public: boolean,
  words: string[]
}

const schema = new Schema<Dictionary>({
  slug: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
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
}, {
  versionKey: false
});

export const Dictionary: Model<Dictionary> = models.Dictionary || model('Dictionary', schema);
