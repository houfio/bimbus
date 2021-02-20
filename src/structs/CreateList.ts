import { boolean, object, string } from 'superstruct';

export const CreateList = object({
  name: string(),
  language: string(),
  public: boolean()
});
