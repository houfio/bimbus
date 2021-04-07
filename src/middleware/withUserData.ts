import { current } from '../guards/current';
import { exists } from '../guards/exists';
import { or } from '../guards/or';
import { role } from '../guards/role';
import { User } from '../models/User';
import { ModelType } from '../types';
import { middleware } from '../utils/middleware';

type DefaultOutput<I> = I & {
  user: ModelType<typeof User>
};

export function withUserData<I, V extends boolean = true, O = DefaultOutput<I>>(
  get: (ctx: I) => V extends true ? [string, ModelType<typeof User>] : string,
  set: (value: ModelType<typeof User>, ctx: I) => O
    = (value, ctx) => ({ ...ctx, user: value }) as any,
  validate?: V
) {
  return middleware<I, O>(async (ctx) => {
    const values = get(ctx);
    const [username, currentUser] = typeof values === 'string' ? [values, undefined] : values;

    if (validate && currentUser instanceof User) {
      or(() => current(currentUser, username), () => role(currentUser, 'admin'));
    }

    const user = await User.findOne({ username });

    exists(user, 'user', username);

    return set(user, ctx);
  });
}
