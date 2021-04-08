import { StringBoolean } from './StringBoolean';

it('should parse a string as boolean', () => {
  expect(StringBoolean.mask('true')).toBe(true);
  expect(StringBoolean.mask('false')).toBe(false);
});

it('should throw when value is not a boolean', () => {
  expect(() => StringBoolean.mask('test')).toThrow();
  expect(() => StringBoolean.mask('1')).toThrow();
  expect(() => StringBoolean.mask('')).toThrow();
});
