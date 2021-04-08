import { Email } from './Email';

it('should return true when value is an email', () => {
  expect(Email.is('test@test.test')).toBe(true);
  expect(Email.is('test+1@test.test')).toBe(true);
});

it('should return false when value is not an email', () => {
  expect(Email.is('test')).toBe(false);
  expect(Email.is('true')).toBe(false);
  expect(Email.is('')).toBe(false);
});
