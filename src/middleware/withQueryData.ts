import { Struct } from 'superstruct';

import { validate } from '../guards/validate';
import { Middleware } from '../types';

type Output<V> = {
  query: V
};

export function withQueryData<T, V>(struct: Struct<V>): Middleware<T, T & Output<V>> {
  return async (value, { query }) => ({
    ...value,
    query: validate(query, struct)
  });
}
