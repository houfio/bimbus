import {CreateUser} from './CreateUser';

it('should return true when valid data is given', () => {
  expect(CreateUser.is({
    username: 'username',
    password: 'Password1',
    email: 'test@test.com'
  })).toBe(true)
})

it('should return false when invalid username type is given', () => {
  expect(CreateUser.is({
    username: true,
    password: 'Password1',
    email: 'test@test.com'
  })).toBe(false)
})

it('should return false when invalid password type is given', () => {
  expect(CreateUser.is({
    username: 'username',
    password: true,
    email: 'test@test.com'
  })).toBe(false)
})

it('should return false when invalid email type is given', () => {
  expect(CreateUser.is({
    username: 'username',
    password: 'Password1',
    email: true
  })).toBe(false)
})

it('should return false when invalid object is given', () => {
  expect(CreateUser.is({
    username: 'username',
    password: 'Password1'
  })).toBe(false)
})
