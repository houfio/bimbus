import { object } from 'superstruct';

import { Email } from './Email';
import { Password } from './Password';
import { Username } from './Username';

export const CreateUser = object({
  email: Email,
  password: Password,
  username: Username
});
