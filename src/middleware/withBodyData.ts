import { Struct } from 'superstruct';

import { validate } from '../guards/validate';
import { middleware } from '../utils/middleware';

type DefaultOutput<I, V> = I & {
  body: V
};

export function withBodyData<I, V, O = DefaultOutput<I, V>>(
  struct: Struct<V>,
  set: (value: V, ctx: I) => O
    = (value, ctx) => ({ ...ctx, body: value }) as any
) {
  return middleware<I, O>(async (ctx, { body }) => set(validate(body, struct), ctx));
}
