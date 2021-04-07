import { Struct } from 'superstruct';

import { validate } from '../guards/validate';
import { middleware } from '../utils/middleware';

type DefaultOutput<I, V> = I & {
  query: V
};

export function withQueryData<I, V, O = DefaultOutput<I, V>>(
  struct: Struct<V>,
  set: (value: V, ctx: I) => O
    = (value, ctx) => ({ ...ctx, query: value }) as any
) {
  return middleware<I, O>(async (ctx, { query, params }) => set(validate({ ...query, ...params }, struct), ctx));
}
