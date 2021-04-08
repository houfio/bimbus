import { serialize } from './serialize';

const mockRequest = (include: string[] = []) => ({
  query: {
    include
  }
}) as any;

it('should return raw objects', () => {
  expect(serialize(mockRequest(), { test: true })).toEqual({ test: true });
});
