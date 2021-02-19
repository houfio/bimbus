import { assert, Struct } from 'superstruct';

import { ValidationError } from '../../exceptions/ValidationError';

export function validate<T>(value: unknown, struct: Struct<T>) {
  try {
    assert(value, struct);

    return value;
  } catch (e) {
    throw new ValidationError(e);
  }
}
