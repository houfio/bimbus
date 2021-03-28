import { Router } from 'express';
import { Server } from 'socket.io';

import { MethodError } from '../errors/MethodError';
import { Middleware, Route, RouteHandler } from '../types';

import { respond } from './respond';

export function route(path: string, ...children: Route[]): RouteHandler {
  return (...fns: Middleware<any, any>[]) => {
    const getRouter = (io: Server) => {
      const router = Router({
        mergeParams: true
      });

      for (const fn of fns) {
        router[fn.method]('/', (req, res, next) => {
          Promise.resolve(fn(res.locals, req))
            .then((data) => {
              if (fn.method !== 'all') {
                return respond(req, res, data);
              }

              res.locals = data;
              next();
            })
            .catch(next);
        });
      }

      router.all('/', () => {
        throw new MethodError(fns.map(({ method }) => method).filter((m) => m !== 'all'));
      });

      for (const child of children) {
        router.use(child.path, child(io));
      }

      return router;
    };

    getRouter.path = path;

    return getRouter;
  };
}
