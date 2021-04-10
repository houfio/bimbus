import { PaginationFilters } from './PaginationFilters';

it('should return true when data is valid', () => {
  expect(PaginationFilters.is({
    page: 1,
    size: 20
  })).toBe(true)
})

it('should return false when size type is invalid', () => {
  expect(PaginationFilters.is({
    page: 1,
    size: 'twenty'
  })).toBe(false)
})

it('should return false when object is invalid', () => {
  expect(PaginationFilters.is({
    page: 1
  })).toBe(false)
})
