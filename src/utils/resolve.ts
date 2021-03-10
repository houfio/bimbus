import { MethodError } from '../errors/MethodError';
import { Apply, Method, Middleware } from '../types';

import { connect } from './connect';
import { respond } from './respond';

export function resolve(): Apply<object>;
export function resolve<A extends object>(fn1: Middleware<object, A>): Apply<A>;
export function resolve<A, B extends object>(fn1: Middleware<object, A>, fn2: Middleware<A, B>): Apply<B>;
export function resolve<A, B, C extends object>(fn1: Middleware<object, A>, fn2: Middleware<A, B>, fn3: Middleware<B, C>): Apply<C>;
export function resolve<A, B, C, D extends object>(fn1: Middleware<object, A>, fn2: Middleware<A, B>, fn3: Middleware<B, C>, fn4: Middleware<C, D>): Apply<D>;
export function resolve<A, B, C, D, E extends object>(fn1: Middleware<object, A>, fn2: Middleware<A, B>, fn3: Middleware<B, C>, fn4: Middleware<C, D>, fn5: Middleware<D, E>): Apply<E>;

export function resolve(...fns: Middleware<object, object>[]): Apply<object> {
  return (handlers) => async (req, res) => {
    try {
      const error = new MethodError(Object.keys(handlers));
      const method = req.method?.toLowerCase() as Method | undefined;

      if (!method) {
        throw error;
      }

      const handler = handlers[method];

      if (!handler) {
        throw error;
      }

      await connect();

      const result = await fns.reduce(async (g, f) => f(await g, req, res), {});

      respond(req, res, await handler(result, req, res));
    } catch (e) {
      console.log(e);

      respond(req, res, e);
    }
  };
}
