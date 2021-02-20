import { IncomingHttpHeaders } from 'http';
import { verify } from 'jsonwebtoken';

import { UnauthenticatedError } from '../../../exceptions/UnauthenticatedError';
import { User } from '../../../models/User';

export async function auth(headers: IncomingHttpHeaders) {
  let userId: string | undefined;

  try {
    const token = (headers.authorization || '').substr(7);

    userId = verify(token, process.env.SECRET || '') as string;
  } catch {
    throw new UnauthenticatedError();
  }

  const found = await User.findById(userId);

  if (!found) {
    throw new UnauthenticatedError();
  }

  return found;
}
