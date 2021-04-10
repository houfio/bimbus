import { auth } from '../guards/auth';
import { User } from '../models/User';
import { AuthCtx, ModelType } from '../types';
import { middleware } from '../utils/middleware';

type DefaultOutput<I> = I & AuthCtx;

export function withAuthentication<I, O = DefaultOutput<I>>(
  passthrough = false,
  set: (value: ModelType<typeof User>, ctx: I) => O
    = (value, ctx) => ({ ...ctx, currentUser: value }) as any
) {
  return middleware<I, O>(async (ctx, { headers }) => set(await auth(headers), ctx), passthrough ? 'use' : 'all');
}
