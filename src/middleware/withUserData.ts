import { current } from '../guards/current';
import { exists } from '../guards/exists';
import { or } from '../guards/or';
import { role } from '../guards/role';
import { User } from '../models/User';
import { Middleware, ModelType } from '../types';

type Input = {
  currentUser: ModelType<typeof User>,
  query: { username: string }
};
type Output = {
  user: ModelType<typeof User>
};

export function withUserData<T extends Input>(): Middleware<T, T & Output> {
  return async (value) => {
    const { currentUser, query: { username } } = value;

    or(() => current(currentUser, username), () => role(currentUser, 'admin'));

    const user = await User.findOne({ username });

    exists(user, 'user', username);

    return {
      ...value,
      user
    };
  };
}
