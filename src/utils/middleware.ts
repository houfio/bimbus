import { Request } from 'express';

import { Method, Middleware, MiddlewareHandler } from '../types';

export function middleware<A, B>(handler: MiddlewareHandler<A, B>, method: Method = 'all'): Middleware<A, B> {
  const mw = (ctx: A, req: Request) => handler(ctx, req);

  mw.method = method;

  return mw;
}
