import { Struct } from 'superstruct';

import { validate } from '../guards/validate';
import { Middleware } from '../types';

type Output<V, K extends string> = {
  [T in K]: V
};

export function withQueryData<T, V, K extends string = 'query'>(struct: Struct<V>, name?: K): Middleware<T, T & Output<V, K>> {
  return async (value, { query }) => ({
    ...value,
    [name ?? 'query']: validate(query, struct)
  } as T & Output<V, K>);
}
