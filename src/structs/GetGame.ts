import { object } from 'superstruct';

import { Username } from './refinements/Username';

export const GetGame = object({
  username: Username,
  opponent: Username
});
