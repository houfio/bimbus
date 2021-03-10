import { PaginateResult } from 'mongoose';

export function paginated<T>(data: PaginateResult<T>, map: (value: T) => object) {
  return {
    page: {
      current: data.page ?? 1 - 1,
      total: data.totalPages,
      size: data.limit
    },
    data: data.docs.map(map)
  };
}
