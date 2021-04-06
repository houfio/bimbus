import { Document, model, models, PaginateModel, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { Language } from '../structs/refinements/Language';
import { Slug } from '../structs/refinements/Slug';

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
    required: true,
    validate: {
      validator: (value: unknown) => Slug.is(value)
    }
  },
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    validate: {
      validator: (value: unknown) => Language.is(value)
    }
  },
  public: {
    type: Boolean,
    required: true
  },
  words: {
    type: [String],
    validate: {
      validator(value: string[]) {
        const length = String.length ? value[0].length : -1;

        return value.every((v, i) => value.indexOf(v) === i && (length === -1 || v.length === length));
      }
    },
    default: []
  }
}, {
  versionKey: false
});

schema.plugin(paginate as any);

export const Dictionary = (models.Dictionary || model('Dictionary', schema)) as PaginateModel<Dictionary>;
