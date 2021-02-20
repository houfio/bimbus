import { object } from 'superstruct';

import { Username } from './refinements/Username';

export const GetUser = object({
  username: Username
});
