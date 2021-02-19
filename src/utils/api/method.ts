import { NextApiRequest, NextApiResponse } from 'next';
import { Struct } from 'superstruct';

import { RequestHandler } from '../../types';

import { connect } from './connect';
import { respond } from './respond';

export async function method<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, m: string, handler: RequestHandler) {
  if (req.method !== m) {
    return;
  }

  await connect();

  try {
    respond(req, res, await handler());
  } catch (e) {
    respond(req, res, e);
  }
}
