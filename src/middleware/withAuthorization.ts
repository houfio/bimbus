import { auth } from '../guards/auth';
import { User } from '../models/User';
import { ModelType } from '../types';
import { middleware } from '../utils/middleware';

type Output = {
  currentUser: ModelType<typeof User>
};

export function withAuthentication<T>() {
  return middleware<T, T & Output>(async (value, { headers }) => ({
    ...value,
    currentUser: await auth(headers)
  }));
}
