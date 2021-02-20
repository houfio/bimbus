import { refine, string } from 'superstruct';

const regex = /^[a-zA-Z0-9_]+$/;

export const Slug = refine(string(), 'slug', (value) => regex.test(value));
