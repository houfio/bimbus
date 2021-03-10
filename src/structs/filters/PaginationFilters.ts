import { defaulted, min, object } from 'superstruct';

import { StringInteger } from '../coercions/StringInteger';

export const PaginationFilters = object({
  page: defaulted(min(StringInteger, 0), () => 0),
  size: defaulted(min(StringInteger, 1), () => 20)
});
