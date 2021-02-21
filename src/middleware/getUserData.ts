import { User } from '../models/User';
import { ModelType } from '../types';
import { current } from '../utils/api/guards/current';
import { exists } from '../utils/api/guards/exists';
import { or } from '../utils/api/guards/or';
import { role } from '../utils/api/guards/role';

export async function getUserData(user: ModelType<typeof User>, username: string) {
  or(() => current(user, username), () => role(user, 'admin'));

  const data = await User.findOne({ username });

  exists(data, 'user', username);

  return data;
}
