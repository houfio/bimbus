import { PaginateResult } from 'mongoose';

import { Method, MiddlewareHandler } from '../types';
import { middleware } from '../utils/middleware';
import { paginated } from '../utils/paginated';
import { serialize } from '../utils/serialize';

export function withResponse<T>(method: Method, fn: MiddlewareHandler<T, object | object[]>) {
  return middleware<T, T>(async (ctx, req) => {
    const response = await fn(ctx, req);

    if (!Array.isArray(response) && (response as any).page) {
      return paginated(response as PaginateResult<unknown>);
    }

    return serialize(response) as any;
  }, method);
}
