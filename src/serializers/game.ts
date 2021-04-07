import { Game } from '../models/Game';
import { serializer } from '../utils/serializer';

export const gameSerializer = serializer(Game, (object) => [{
  dictionary: object.dictionary.slug,
  host: object.host.user.username,
  opponent: object.opponent.user.username
}, {
  hostScore: object.host.score,
  opponentScore: object.opponent.score
}]);
