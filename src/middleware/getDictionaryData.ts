import { Dictionary } from '../models/Dictionary';
import { User } from '../models/User';
import { ModelType } from '../types';
import { exists } from '../utils/api/guards/exists';

export async function getDictionaryData(user: ModelType<typeof User>, slug: string) {
  const dictionary = await Dictionary.findOne({
    _id: { $in: user.dictionaries },
    slug
  });

  exists(dictionary, 'dictionary', slug);

  return dictionary;
}
