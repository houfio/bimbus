import { exists } from '../guards/exists';
import { Dictionary } from '../models/Dictionary';
import { User } from '../models/User';
import { Middleware, ModelType } from '../types';

type Input = {
  user: ModelType<typeof User>,
  query: { slug: string }
};
type Output = {
  dictionary: ModelType<typeof Dictionary>
};

export function withDictionaryData<T extends Input>(): Middleware<T, T & Output> {
  return async (value) => {
    const { user, query: { slug } } = value;

    const dictionary = await Dictionary.findOne({
      _id: { $in: user.dictionaries },
      slug
    });

    exists(dictionary, 'dictionary', slug);

    return {
      ...value,
      dictionary
    };
  };
}
