import { Language } from './Language';

it('should return true when value is a language', () => {
  expect(Language.is('nl')).toBe(true);
  expect(Language.is('en')).toBe(true);
});

it('should return false when value is not a language', () => {
  expect(Language.is('dutch')).toBe(false);
  expect(Language.is('english')).toBe(false);
  expect(Language.is('')).toBe(false);
});
