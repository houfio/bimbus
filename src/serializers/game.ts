import { Game } from '../models/Game';
import { serializer } from '../utils/serializer';

export const gameSerializer = serializer(Game, (object) => [{
  dictionary: object.dictionary,
  host: object.host.user,
  opponent: object.opponent.user
}, {
  hostScore: object.host.score,
  opponentScore: object.opponent.score
}]);
