import { assert, Infer, Struct } from 'superstruct';

import { HttpError } from '../../exceptions/HttpError';

export function validate<T extends Struct<any>>(value: any, struct: T): asserts value is Infer<T> {
  try {
    assert(value, struct);
  } catch (e) {
    throw new HttpError(e.message, 400);
  }
}
