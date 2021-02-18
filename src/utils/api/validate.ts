import { NextApiRequest, NextApiResponse } from 'next';
import { assert, Infer, Struct } from 'superstruct';

import { respond } from './respond';

export function validate<T extends Struct<any, any>>(req: NextApiRequest, res: NextApiResponse, object: any, struct: T): object is Infer<T> {
  try {
    assert(object, struct);
  } catch (e) {
    respond(req, res, undefined, e, 400);

    return false;
  }

  return true;
}
