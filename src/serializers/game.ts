import { Game } from '../models/Game';
import { serializer } from '../utils/serializer';

export const gameSerializer = serializer(Game, (object) => [{
  host: object.host.user.username,
  opponent: object.opponent.user.username,
  completed: object.completed
}, {
  dictionary: object.dictionary.slug,
  hostScore: object.host.score,
  opponentScore: object.opponent.score,
  word: object.completed ? object.word : null
}]);
