import { UserFilters } from './UserFilters';

it('should return true when data is valid', () => {
  expect(UserFilters.is({
    username: 'test',
    role: 'admin'
  })).toBe(true)
})

it('should return false when role is not part of enum', () => {
  expect(UserFilters.is({
    username: 'test',
    role: 'poweruser'
  })).toBe(false)
})
