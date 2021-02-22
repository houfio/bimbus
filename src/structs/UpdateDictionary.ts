import { boolean, object, size, string } from 'superstruct';

export const UpdateDictionary = object({
  name: size(string(), 1, Infinity),
  language: string(),
  public: boolean()
});
