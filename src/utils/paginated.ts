import { PaginateResult } from 'mongoose';

import { serialize } from './serialize';

export function paginated<T>(data: PaginateResult<T>) {
  return {
    page: {
      current: data.page ?? 1 - 1,
      total: data.totalPages,
      size: data.limit
    },
    data: serialize(data.docs)
  };
}
