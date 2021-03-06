import { AuthorizationError } from '../errors/AuthorizationError';
import { User } from '../models/User';
import { ModelType, Role } from '../types';

export function role(user: ModelType<typeof User>, r: Role) {
  if (user.role !== r) {
    throw new AuthorizationError('role', r);
  }
}
