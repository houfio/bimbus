import { current } from '../guards/current';
import { exists } from '../guards/exists';
import { or } from '../guards/or';
import { role } from '../guards/role';
import { User } from '../models/User';
import { ModelType } from '../types';
import { middleware } from '../utils/middleware';

type Input<K extends string, V extends boolean> = {
  [T in K]: { username: string }
} & (V extends false ? {} : {
  currentUser: ModelType<typeof User>
});
type Output = {
  user: ModelType<typeof User>
};

export function withUserData<T extends Input<K, V>, K extends string = 'query', V extends boolean = true>(validate?: V, from?: K) {
  return middleware<T, T & Output>(async (value) => {
    const username = value[from ?? 'query' as keyof typeof value].username;

    if (validate) {
      const currentUser = (value as any).currentUser;

      or(() => current(currentUser, username), () => role(currentUser, 'admin'));
    }

    const user = await User.findOne({ username });

    exists(user, 'user', username);

    return {
      ...value,
      user
    };
  });
}
