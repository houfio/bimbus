import { NextApiRequest, NextApiResponse } from 'next';
import { Struct } from 'superstruct';

import { RequestDataHandler, RequestHandler } from '../../types';

import { connect } from './connect';
import { respond } from './respond';
import { validate } from './validate';

export async function method<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, m: string, data: any, handlerOrStruct: T | RequestHandler, handler?: RequestDataHandler<T>) {
  if (req.method !== m) {
    return;
  }

  await connect();

  try {
    if (handlerOrStruct instanceof Struct) {
      validate(data, handlerOrStruct);
    }

    const promise = handler ?? handlerOrStruct as RequestHandler;

    respond(req, res, await promise(data));
  } catch (e) {
    respond(req, res, e);
  }
}
