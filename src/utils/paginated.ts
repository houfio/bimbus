import { Request } from 'express';
import { PaginateResult } from 'mongoose';

import { serialize } from './serialize';

export function paginated<T>(req: Request, data: PaginateResult<T>) {
  return {
    page: {
      current: data.page ?? 1 - 1,
      total: data.totalPages,
      size: data.limit
    },
    data: serialize(req, data.docs)
  };
}
