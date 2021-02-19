import { NextApiRequest, NextApiResponse } from 'next';
import { Struct } from 'superstruct';

import { RequestDataHandler, RequestHandler } from '../../../types';
import { method } from '../method';

export function get(req: NextApiRequest, res: NextApiResponse, handler: RequestHandler): Promise<void>;
export function get<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, struct: T, handler: RequestDataHandler<T>): Promise<void>;

export function get<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, handlerOrStruct: T | RequestHandler, handler?: RequestDataHandler<T>) {
  return method(req, res, 'GET', req.query, handlerOrStruct, handler);
}
