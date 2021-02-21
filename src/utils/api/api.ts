import { NextApiRequest, NextApiResponse } from 'next';

import { MethodError } from '../../errors/MethodError';
import { Method, RequestHandlers, RequestMiddleware } from '../../types';

import { connect } from './connect';
import { respond } from './respond';

export function api<T extends object>(pre: RequestMiddleware<T>, handlers: RequestHandlers<T>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
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

      respond(req, res, await handler(await pre(req, res), req, res));
    } catch (e) {
      respond(req, res, e);
    }
  };
}
