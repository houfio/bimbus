import { object, string } from 'superstruct';

export const CreateGame = object({
  dictionary: string(),
  opponent: string()
});
