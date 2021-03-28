import { object } from 'superstruct';

import { Slug } from './refinements/Slug';
import { Username } from './refinements/Username';

export const CreateGame = object({
  dictionary: Slug,
  opponent: Username
});
