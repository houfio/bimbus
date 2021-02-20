import { NextApiRequest, NextApiResponse } from 'next';

import { RequestHandlers } from '../../types';

import { connect } from './connect';
import { respond } from './respond';

export function api(handlers: RequestHandlers) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const handler = handlers[req.method?.toLowerCase() ?? ''];

    if (!handler) {
      res.setHeader('allow', Object.keys(handlers).join(', ').toUpperCase());

      return res.status(405).send('405');
    }

    try {
      await connect();

      respond(req, res, await handler(req, res));
    } catch (e) {
      respond(req, res, e);
    }
  };
}
