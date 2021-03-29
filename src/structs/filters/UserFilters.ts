import {enums, object, optional, string} from 'superstruct';

export const UserFilters = object({
  username: optional(string()),
  role: optional(enums(['user', 'admin']))
});
