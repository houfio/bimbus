import { Struct } from 'superstruct';

import { validate } from '../guards/validate';
import { middleware } from '../utils/middleware';

type Output<V, K extends string> = {
  [T in K]: V
};

export function withQueryData<T, V, K extends string = 'query'>(struct: Struct<V>, name?: K) {
  return middleware<T, T & Output<V, K>>(async (value, { query, params }) => ({
    ...value,
    [name ?? 'query']: validate({ ...query, ...params }, struct)
  } as T & Output<V, K>));
}
