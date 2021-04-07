import { exists } from '../guards/exists';
import { Dictionary } from '../models/Dictionary';
import { User } from '../models/User';
import { ModelType } from '../types';
import { middleware } from '../utils/middleware';

type DefaultOutput<I> = I & {
  dictionary: ModelType<typeof Dictionary>
};

export function withDictionaryData<I, O = DefaultOutput<I>>(
  get: (ctx: I) => [string, ModelType<typeof User>],
  set: (value: ModelType<typeof Dictionary>, ctx: I) => O
    = (value, ctx) => ({ ...ctx, dictionary: value }) as any
) {
  return middleware<I, O>(async (ctx) => {
    const [slug, user] = get(ctx);

    const dictionary = await Dictionary.findOne({
      _id: { $in: user.dictionaries },
      slug
    });

    exists(dictionary, 'dictionary', slug);

    return set(dictionary, ctx);
  });
}
