import { refine, string } from 'superstruct';

const regex = /^[a-z]{2}$/;

export const Language = refine(string(), 'language', (value) => regex.test(value));
