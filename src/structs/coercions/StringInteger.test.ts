import { StringInteger } from './StringInteger';

it('should parse a string as integer', () => {
  expect(StringInteger.mask('23')).toBe(23);
  expect(StringInteger.mask('-23')).toBe(-23);
});

it('should throw when value is not a boolean', () => {
  expect(() => StringInteger.mask('test')).toThrow();
  expect(() => StringInteger.mask('true')).toThrow();
  expect(() => StringInteger.mask('')).toThrow();
});
