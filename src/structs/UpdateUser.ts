import { object } from 'superstruct';

import { Email } from './refinements/Email';
import { Password } from './refinements/Password';

export const UpdateUser = object({
  email: Email,
  password: Password
});
