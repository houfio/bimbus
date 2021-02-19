import { refine, string } from 'superstruct';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

export const Password = refine(string(), 'Password', (value) => regex.test(value));
