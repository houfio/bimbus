import { CreateDictionary } from './CreateDictionary';

it('should return true when valid data is given', () => {
  expect(CreateDictionary.is({
    name: 'testDictionary',
    language: 'en',
    public: false
  })).toBe(true);
});

it('should return true when invalid public is given (not bool)', () => {
  expect(CreateDictionary.is({
    name: 'testDictionary',
    language: 'en',
    public: 'ThisIsntABoolean'
  })).toBe(false);
});

it('should return true when invalid language is given', () => {
  expect(CreateDictionary.is({
    name: 'testDictionary',
    language: 'languageTooLong',
    public: true
  })).toBe(false);
});

it('should return true when invalid object is given', () => {
  expect(CreateDictionary.is({
    name: 'testDictionary',
    language: 'languageTooLong'
  })).toBe(false);
});

