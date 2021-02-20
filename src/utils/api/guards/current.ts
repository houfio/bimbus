import { UnauthorizedError } from '../../../exceptions/UnauthorizedError';
import { User } from '../../../models/User';
import { ModelType } from '../../../types';

export function current(user: ModelType<typeof User>, username: string) {
  if (user.username !== username) {
    throw new UnauthorizedError('username', username);
  }
}
