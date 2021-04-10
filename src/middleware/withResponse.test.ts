import { withResponse } from './withResponse';

const mockCall = (data: any = { test: true }) => withResponse('get', () => data)({}, {} as any);

it('should return the response', async () => {
  await expect(mockCall()).resolves.toEqual({ test: true });
});

it('should paginate an array response', async () => {
  await expect(mockCall({
    page: 1,
    totalPages: 1,
    limit: 1,
    docs: [{ test: true }]
  })).resolves.toEqual({
    page: {
      current: 1,
      size: 1,
      total: 1
    },
    data: [{ test: true }]
  });
});
