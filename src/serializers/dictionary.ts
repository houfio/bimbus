import { Dictionary } from '../models/Dictionary';
import { serializer } from '../utils/serializer';

export const dictionarySerializer = serializer(Dictionary, (object) => [{
  slug: object.slug,
  name: object.name
}, {
  language: object.language,
  public: object.public
}]);
