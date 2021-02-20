import { object } from 'superstruct';

import { Password } from './refinements/Password';
import { Username } from './refinements/Username';

export const Authenticate = object({
  username: Username,
  password: Password
});
