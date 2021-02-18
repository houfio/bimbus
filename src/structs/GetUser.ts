import { object } from 'superstruct';

import { Username } from './Username';

export const GetUser = object({
  username: Username
});
