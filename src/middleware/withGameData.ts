import { exists } from '../guards/exists';
import { Game } from '../models/Game';
import { User } from '../models/User';
import { ModelType } from '../types';
import { middleware } from '../utils/middleware';

type DefaultOutput<I> = I & {
  game: ModelType<typeof Game>
};

export function withGameData<I, O = DefaultOutput<I>>(
  get: (ctx: I) => [ModelType<typeof User>, ModelType<typeof User>],
  set: (value: ModelType<typeof Game>, ctx: I) => O
    = (value, ctx) => ({ ...ctx, game: value }) as any
) {
  return middleware<I, O>(async (ctx) => {
    const [host, opponent] = get(ctx);

    const game = await Game.findOne({
      $or: [{
        $and: [
          { 'host.user': host.id },
          { 'opponent.user': opponent.id }
        ]
      }, {
        $and: [
          { 'host.user': opponent.id },
          { 'opponent.user': host.id }
        ]
      }],
      completed: false
    });

    exists(game, 'game', opponent.username);

    return set(game, ctx);
  });
}

