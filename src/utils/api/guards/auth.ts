import { IncomingHttpHeaders } from 'http';
import { verify } from 'jsonwebtoken';

import { UnauthenticatedError } from '../../../exceptions/UnauthenticatedError';
import { User } from '../../../models/User';

export async function auth(headers: IncomingHttpHeaders) {
  let username: string | undefined;

  try {
    const token = (headers.authorization || '').substr(7);

    username = verify(token, process.env.SECRET || '') as string;
  } catch {
    throw new UnauthenticatedError();
  }

  const found = await User.findOne({ username });

  if (!found) {
    throw new UnauthenticatedError();
  }

  return found;
}
