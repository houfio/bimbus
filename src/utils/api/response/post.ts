import { NextApiRequest, NextApiResponse } from 'next';

import { RequestHandler } from '../../../types';
import { method } from '../method';

export function post(req: NextApiRequest, res: NextApiResponse, handler: RequestHandler) {
  return method(req, res, 'POST', handler);
}
