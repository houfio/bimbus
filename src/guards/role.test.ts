import { AuthorizationError } from '../errors/AuthorizationError';
import { User } from '../models/User';
import { ModelType } from '../types';

import { role } from './role';

const user = {
  username: '',
  password: '',
  email: '',
  role: 'user',
  dictionaries: []
} as unknown as ModelType<typeof User>;

it('should pass when roles match', () => {
  expect(() => role(user, 'user')).not.toThrow();
});

it('should throw an unauthorized error', () => {
  expect(() => role(user, 'admin')).toThrow(AuthorizationError);
});
