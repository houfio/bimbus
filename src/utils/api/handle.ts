import { NextApiRequest, NextApiResponse } from 'next';

import { RequestHandlers } from '../../types';

import { connect } from './connect';
import { respond } from './respond';

export async function handle(req: NextApiRequest, res: NextApiResponse, handlers: RequestHandlers) {
  const handler = handlers[req.method?.toLowerCase() ?? ''];

  if (!handler) {
    return res.status(405).send('405');
  }

  await connect();

  try {
    respond(req, res, await handler());
  } catch (e) {
    respond(req, res, e);
  }
}
