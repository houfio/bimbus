import { object, optional } from 'superstruct';

import { StringBoolean } from '../coercions/StringBoolean';
import { Language } from '../refinements/Language';

export const DictionaryFilters = object({
  public: optional(StringBoolean),
  language: optional(Language)
});
