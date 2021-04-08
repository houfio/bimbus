import { AuthorizationError } from '../errors/AuthorizationError';
import { User } from '../models/User';
import { ModelType } from '../types';

import { current } from './current';

const user = {
  username: 'test',
  password: '',
  email: '',
  role: 'user',
  dictionaries: []
} as unknown as ModelType<typeof User>;

it('should not throw when the usernames match', () => {
  expect(() => current(user, 'test')).not.toThrow();
});

it('should throw when the usernames don\'t match', () => {
  expect(() => current(user, 'test2')).toThrow(AuthorizationError);
});
