import { Document, model, models, PaginateModel, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import paginate from 'mongoose-paginate-v2';

import { ModelType } from '../types';

import { Dictionary } from './Dictionary';
import { User } from './User';

interface Game extends Document {
  dictionary: ModelType<typeof Dictionary>,
  host: {
    user: ModelType<typeof User>,
    score: Number
  },
  opponent: {
    user: ModelType<typeof User>,
    score: Number
  }
}

const schema = new Schema<Game>({
  dictionary: {
    type: Schema.Types.ObjectId,
    ref: 'Dictionary',
    required: true,
    autopopulate: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
    index: {
      unique: true,
      partialFilterExpression: { completed: false }
    }
  },
  host: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true
    },
    score: {
      type: Number,
      default: 0,
      required: true
    }
  },
  opponent: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true,
      validate: {
        validator(this: Game, value: Schema.Types.ObjectId) {
          return this.host.user.toString() !== value.toString();
        }
      }
    },
    score: {
      type: Number,
      default: 0,
      required: true
    }
  }
}, {
  versionKey: false
});

schema.plugin(paginate as any);
schema.plugin(autopopulate as any);

export const Game = (models.Game || model('Game', schema)) as PaginateModel<Game>;
