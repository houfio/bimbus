import { UpdateUser } from './UpdateUser';

it('should return true when data is valid', () => {
  expect(UpdateUser.is({
    password: 'Password1',
    email: 'test@test.com'
  })).toBe(true);
});

it('should return false when password type is invalid', () => {
  expect(UpdateUser.is({
    password: true,
    email: 'test@test.com'
  })).toBe(false);
});

it('should return false when email type is invalid', () => {
  expect(UpdateUser.is({
    password: 'Password1',
    email: true
  })).toBe(false);
});

it('should return false when object is invalid', () => {
  expect(UpdateUser.is({
    password: 'Password1'
  })).toBe(false);
});
