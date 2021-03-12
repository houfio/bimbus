import { boolean, object, size, string } from 'superstruct';

import { Language } from './refinements/Language';

export const CreateDictionary = object({
  name: size(string(), 1, Infinity),
  language: Language,
  public: boolean()
});
