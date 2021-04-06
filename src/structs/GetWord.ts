import { object } from 'superstruct';

import { Slug } from './refinements/Slug';
import { Username } from './refinements/Username';
import { Word } from './refinements/Word';

export const GetWord = object({
  username: Username,
  slug: Slug,
  word: Word
});
