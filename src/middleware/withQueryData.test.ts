import { boolean, object } from 'superstruct';

import { ValidationError } from '../errors/ValidationError';

import { withQueryData } from './withQueryData';

const struct = object({
  test: boolean()
});
const mockCall = (query: object = { test: true }) => withQueryData(struct)({}, {
  ip: '::1',
  query,
  params: {}
} as any);

it('should return the populated context', async () => {
  await expect(mockCall()).resolves.toEqual({ query: { test: true } });
});

it('should throw if the validation fails', async () => {
  await expect(mockCall({})).rejects.toThrow(ValidationError);
});
