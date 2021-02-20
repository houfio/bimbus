import { object } from 'superstruct';

import { Email } from './refinements/Email';
import { Password } from './refinements/Password';

export const UpdateUser = object({
  password: Password,
  email: Email
});
