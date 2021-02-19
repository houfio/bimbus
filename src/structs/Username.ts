import { refine, string } from 'superstruct';

const regex = /^[a-zA-Z_0-9]{3,32}$/;

export const Username = refine(string(), 'username', (value) => regex.test(value));
