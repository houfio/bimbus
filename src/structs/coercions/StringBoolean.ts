import { boolean, coerce, string } from 'superstruct';

export const StringBoolean = coerce(boolean(), string(), (value) => {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  throw new Error();
});
