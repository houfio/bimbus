import { Struct } from 'superstruct';

import { validate } from '../guards/validate';
import { middleware } from '../utils/middleware';

type Output<V, K extends string> = {
  [T in K]: V
};

export function withBodyData<T, V, K extends string = 'body'>(struct: Struct<V>, name?: K) {
  return middleware<T, T & Output<V, K>>(async (value, { body }) => ({
    ...value,
    [name ?? 'body']: validate(body, struct)
  } as T & Output<V, K>));
}
