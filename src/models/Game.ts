import * as mongoose from 'mongoose';
import { Document, model, PaginateModel, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import paginate from 'mongoose-paginate-v2';

import { ModelType } from '../types';

import { Dictionary } from './Dictionary';
import { User } from './User';

type Player = {
  user: ModelType<typeof User>,
  score: number,
  guesses: string[]
};

interface Game extends Document {
  dictionary: ModelType<typeof Dictionary>,
  word: string,
  completed: boolean,
  host: Player,
  opponent: Player
}

function player(validate: (game: Game, value: Schema.Types.ObjectId) => boolean = () => true) {
  return {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true,
      validate: {
        validator(this: Game, value: Schema.Types.ObjectId) {
          return validate(this, value);
        }
      }
    },
    score: {
      type: Number,
      default: 0,
      required: true
    },
    guesses: {
      type: [String],
      default: [],
      required: true
    }
  };
}

const schema = new Schema<Game>({
  dictionary: {
    type: Schema.Types.ObjectId,
    ref: 'Dictionary',
    required: true,
    autopopulate: true
  },
  word: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  host: player(),
  opponent: player((game, value) => game.host.user.toString() !== value.toString())
}, {
  versionKey: false
});

schema.pre('save', function (next) {
  console.log(this.host.user);
  console.log(this.opponent.user);
  mongoose.models.Game.findOne({
    'host.user': this.host.user,
    'opponent.user': this.opponent.user,
    'completed': false
  }, (err: any, data: any) => {
    if (data) {
      next(new Error('There is an active game'));
    } else {
      next();
    }
  })
});

schema.plugin(paginate as any);
schema.plugin(autopopulate as any);

export const Game = model('Game', schema) as PaginateModel<Game>;
