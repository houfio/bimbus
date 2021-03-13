import { Document, model, models, PaginateModel, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface Game extends Document {
  dictionary: Schema.Types.ObjectId,
  host: {
    user: Schema.Types.ObjectId,
    score: Number
  },
  opponent: {
    user: Schema.Types.ObjectId,
    score: Number
  }
}

const schema = new Schema<Game>({
  dictionary: {
    type: Schema.Types.ObjectId,
    ref: 'Dictionary',
    required: true
  },
  host: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: {
      type: Number,
      default: 0
    }
  },
  opponent: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: {
      type: Number,
      default: 0
    }
  }
}, {
  versionKey: false
});

schema.plugin(paginate as any);

export const Game = (models.Game || model('Game', schema)) as PaginateModel<Game>;
