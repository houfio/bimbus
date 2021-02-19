import { NextApiRequest, NextApiResponse } from 'next';
import { Struct } from 'superstruct';

import { RequestDataHandler, RequestHandler } from '../../../types';
import { method } from '../method';

export function del(req: NextApiRequest, res: NextApiResponse, handler: RequestHandler): Promise<void>;
export function del<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, struct: T, handler: RequestDataHandler<T>): Promise<void>;

export function del<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, handlerOrStruct: T | RequestHandler, handler?: RequestDataHandler<T>) {
  return method(req, res, 'DELETE', req.query, handlerOrStruct, handler);
}
