import { boolean, object, size, string } from 'superstruct';

export const CreateList = object({
  name: size(string(), 1, Infinity),
  language: string(),
  public: boolean()
});
