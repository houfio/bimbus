import { refine, string } from 'superstruct';

const regex = /^[a-z]{2,}$/;

export const Word = refine(string(), 'word', (value) => regex.test(value));
