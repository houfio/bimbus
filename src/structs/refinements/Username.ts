import { refine, string } from 'superstruct';

const regex = /^[a-zA-Z0-9_]{3,32}$/;

export const Username = refine(string(), 'username', (value) => regex.test(value));
