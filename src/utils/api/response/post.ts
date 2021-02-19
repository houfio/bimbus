import { NextApiRequest, NextApiResponse } from 'next';
import { Struct } from 'superstruct';

import { RequestDataHandler } from '../../../types';
import { method } from '../method';

export function post<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, struct: T, handler: RequestDataHandler<T>) {
  return method(req, res, 'POST', req.body, struct, handler);
}
