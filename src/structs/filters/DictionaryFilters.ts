import { object, optional, size, string } from 'superstruct';

import { StringBoolean } from '../coercions/StringBoolean';

export const DictionaryFilters = object({
  public: optional(StringBoolean),
  language: optional(size(string(), 2, 2))
});
