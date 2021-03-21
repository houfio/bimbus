import { mask, Struct } from 'superstruct';

import { ValidationError } from '../errors/ValidationError';

export function validate<T>(value: unknown, struct: Struct<T>) {
  try {
    return mask(value, struct);
  } catch (e) {
    throw new ValidationError(e);
  }
}
