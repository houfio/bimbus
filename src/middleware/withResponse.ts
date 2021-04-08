import { PaginateResult } from 'mongoose';

import { Method, MiddlewareHandler } from '../types';
import { middleware } from '../utils/middleware';
import { paginated } from '../utils/paginated';
import { serialize } from '../utils/serialize';

export function withResponse<I>(method: Method, handler: MiddlewareHandler<I, object | object[]>) {
  return middleware<I, I>(async (ctx, req) => {
    const response = await handler(ctx, req);

    if (!Array.isArray(response) && (response as any).page) {
      return paginated(req, response as PaginateResult<unknown>);
    }

    return serialize(req, response) as any;
  }, method);
}
