import {DictionaryFilters} from './DictionaryFilters';

it('should return true when data is valid', () => {
  expect(DictionaryFilters.is({
    public: true,
    language: 'en'
  })).toBe(true)
})

it('should return false when language type is invalid', () => {
  expect(DictionaryFilters.is({
    public: 'true',
    language: true
  })).toBe(false)
})

it('should return false when public type is invalid', () => {
  expect(DictionaryFilters.is({
    public: 'yes',
    language: true
  })).toBe(false)
})
