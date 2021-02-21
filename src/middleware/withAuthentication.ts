import { auth } from '../guards/auth';
import { User } from '../models/User';
import { Middleware, ModelType } from '../types';

type Output = {
  currentUser: ModelType<typeof User>
};

export function withAuthentication<T>(): Middleware<T, T & Output> {
  return async (value, { headers }) => ({
    ...value,
    currentUser: await auth(headers)
  });
}
