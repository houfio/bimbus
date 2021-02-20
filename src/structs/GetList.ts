import { object } from 'superstruct';

import { Slug } from './refinements/Slug';
import { Username } from './refinements/Username';

export const GetList = object({
  username: Username,
  slug: Slug
});
