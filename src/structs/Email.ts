import { refine, string } from 'superstruct';
import isEmail from 'validator/lib/isEmail';

export const Email = refine(string(), 'Email', (value) => isEmail(value));
