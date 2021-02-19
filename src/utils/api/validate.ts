import { assert, Struct } from 'superstruct';

import { HttpError } from '../../exceptions/HttpError';

export function validate<T>(value: unknown, struct: Struct<T>) {
  try {
    assert(value, struct);

    return value;
  } catch (e) {
    throw new HttpError(e.message, 400);
  }
}
