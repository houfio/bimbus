import { User } from '../models/User';
import { serializer } from '../utils/serializer';

export const userSerializer = serializer(User, (object) => [{
  username: object.username,
  role: object.role
}, {
  email: object.email,
  dictionaries: object.dictionaries.length
}]);
