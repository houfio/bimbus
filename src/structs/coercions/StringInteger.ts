import { coerce, number, string } from 'superstruct';

export const StringInteger = coerce(number(), string(), (value) => parseInt(value, 10));
