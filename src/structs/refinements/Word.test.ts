import { Word } from './Word';

it('should return true when value is a word', () => {
  expect(Word.is('word')).toBe(true);
  expect(Word.is('testing')).toBe(true);
});

it('should return false when value is not a word', () => {
  expect(Word.is('hard word')).toBe(false);
  expect(Word.is('m\'lady')).toBe(false);
  expect(Word.is('')).toBe(false);
});
