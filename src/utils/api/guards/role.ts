import { UnauthorizedError } from '../../../exceptions/UnauthorizedError';
import { User } from '../../../models/User';
import { ModelType } from '../../../types';

export function role(user: ModelType<typeof User>, r: string) {
  if (user.role !== r) {
    throw new UnauthorizedError('role', r);
  }
}
