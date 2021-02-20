import { NextApiRequest, NextApiResponse } from 'next';

import { MethodError } from '../../exceptions/MethodError';
import { RequestHandlers } from '../../types';

import { connect } from './connect';
import { respond } from './respond';

export function api(handlers: RequestHandlers) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const handler = handlers[req.method?.toLowerCase() ?? ''];

      if (!handler) {
        throw new MethodError(Object.keys(handlers));
      }

      await connect();

      respond(req, res, await handler(req, res));
    } catch (e) {
      respond(req, res, e);
    }
  };
}
