import { object } from 'superstruct';

import { Email } from './refinements/Email';
import { Password } from './refinements/Password';
import { Username } from './refinements/Username';

export const CreateUser = object({
  email: Email,
  password: Password,
  username: Username
});