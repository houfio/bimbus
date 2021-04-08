import { Slug } from './Slug';

it('should return true when value is a slug', () => {
  expect(Slug.is('test_item123')).toBe(true);
});

it('should return false when value is not a slug', () => {
  expect(Slug.is('TestItem123')).toBe(false);
  expect(Slug.is('test_item!')).toBe(false);
  expect(Slug.is('')).toBe(false);
});
