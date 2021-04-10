import {UpdateDictionary} from './UpdateDictionary';

it('should return true when data is valid', () => {
  expect(UpdateDictionary.is({
    name: 'testDictionary',
    language: 'en',
    public: true
  })).toBe(true)
})

it('should return false when name type is invalid', () => {
  expect(UpdateDictionary.is({
    name: true,
    language: 'en',
    public: true
  })).toBe(false)
})

it('should return false when language type is invalid', () => {
  expect(UpdateDictionary.is({
    name: 'testDictionary',
    language: true,
    public: true
  })).toBe(false)
})

it('should return false when public type is invalid', () => {
  expect(UpdateDictionary.is({
    name: 'testDictionary',
    language: 'en',
    public: 'thisISntABoolean'
  })).toBe(false)
})

it('should return true object is invalid', () => {
  expect(UpdateDictionary.is({
    name: 'testDictionary',
    language: 'en'
  })).toBe(false)
})
