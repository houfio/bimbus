import { dictionarySerializer } from './serializers/dictionary';
import { gameSerializer } from './serializers/game';
import { userSerializer } from './serializers/user';

export const xmlContent = 'application/xml';

export const serializers = [
  userSerializer,
  dictionarySerializer,
  gameSerializer
];
