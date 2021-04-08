import { Password } from './Password';

it('should return true when value is a password', () => {
  expect(Password.is('Tester123')).toBe(true);
});

it('should return false when value is not a password', () => {
  expect(Password.is('tester123')).toBe(false);
  expect(Password.is('Tester')).toBe(false);
  expect(Password.is('')).toBe(false);
});
