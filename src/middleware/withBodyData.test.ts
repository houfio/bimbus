import { boolean, object } from 'superstruct';

import { ValidationError } from '../errors/ValidationError';

import { withBodyData } from './withBodyData';

const struct = object({
  test: boolean()
});
const mockCall = (body: object = { test: true }) => withBodyData(struct)({}, {
  ip: '::1',
  body
} as any);

it('should return the populated context', async () => {
  await expect(mockCall()).resolves.toEqual({ body: { test: true } });
});

it('should throw if the validation fails', async () => {
  await expect(mockCall({})).rejects.toThrow(ValidationError);
});
