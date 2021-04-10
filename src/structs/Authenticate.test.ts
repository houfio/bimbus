import { Authenticate } from './Authenticate';

it('should return true when valid username and password given', () => {
  expect(Authenticate.is({
    username: 'username',
    password: 'Password1'
  })).toBe(true);
});

it('should return false when invalid username and valid password given', () => {
  expect(Authenticate.is({
    username: true,
    password: 'Password1'
  })).toBe(false);
});

it('should return false when valid username and invalid password given', () => {
  expect(Authenticate.is({
    username: 'username',
    password: true
  })).toBe(false);
});

it('should return false when invalid object is given', () => {
  expect(Authenticate.is({
    username: 'username'
  })).toBe(false);
});
