import { IncomingHttpHeaders } from 'http';
import { verify } from 'jsonwebtoken';

import { UnauthenticatedError } from '../errors/UnauthenticatedError';
import { User } from '../models/User';

export async function auth(headers: IncomingHttpHeaders) {
  let username: string | undefined;

  try {
    const token = (headers.authorization || '').substr(7);

    username = verify(token, process.env.SECRET || '') as string;
  } catch {
    throw new UnauthenticatedError();
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError();
  }

  return user;
}