import { GetUser } from './GetUser';

it('should return true when data is valid', () => {
  expect(GetUser.is({
    username: 'username'
  })).toBe(true);
});

it('should return false when username type is invalid', () => {
  expect(GetUser.is({
    username: true
  })).toBe(false);
});

it('should return true when object is invalid', () => {
  expect(GetUser.is({
    testname: 'username'
  })).toBe(false);
});
