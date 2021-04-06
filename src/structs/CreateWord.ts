import { object } from 'superstruct';

import { Word } from './refinements/Word';

export const CreateWord = object({
  word: Word
});
