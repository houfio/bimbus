import { exists } from '../guards/exists';
import { Dictionary } from '../models/Dictionary';
import { User } from '../models/User';
import { ModelType } from '../types';
import { middleware } from '../utils/middleware';

type Input = {
  user: ModelType<typeof User>,
  query: { slug: string }
};
type Output = {
  dictionary: ModelType<typeof Dictionary>
};

export function withDictionaryData<T extends Input>() {
  return middleware<T, T & Output>(async (value) => {
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
  });
}
