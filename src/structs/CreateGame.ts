import {boolean, object, size, string} from 'superstruct';
import {Language} from './refinements/Language';
import {Username} from './refinements/Username';

export const CreateGame = object({
  dictionary: string(),
  opponent: string()
});
