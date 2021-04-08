import { IncomingHttpHeaders } from 'http';
import { verify } from 'jsonwebtoken';

import { AuthenticationError } from '../errors/AuthenticationError';
import { User } from '../models/User';

export async function auth(headers: IncomingHttpHeaders) {
  let username: string | undefined;

  try {
    const token = (headers.authorization || '').substr(7);

    username = verify(token, process.env.SECRET || '') as string;
  } catch {
    throw new AuthenticationError();
  }

  const user = await User.findOne({ username });

  console.log(user);

  if (!user) {
    throw new AuthenticationError();
  }

  return user;
}
