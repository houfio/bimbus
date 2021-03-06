import { object } from 'superstruct';

import { Email } from './refinements/Email';
import { Password } from './refinements/Password';
import { Username } from './refinements/Username';

export const CreateUser = object({
  username: Username,
  password: Password,
  email: Email
});
