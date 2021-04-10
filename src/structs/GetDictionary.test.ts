import { GetDictionary } from './GetDictionary';

it('should return true when data is valid', () => {
  expect(GetDictionary.is({
    username: 'username',
    slug: 'testdictionary'
  })).toBe(true);
});

it('should return false when username type is invalid', () => {
  expect(GetDictionary.is({
    username: true,
    slug: 'testdictionary'
  })).toBe(false);
});

it('should return false when slug type is invalid', () => {
  expect(GetDictionary.is({
    username: 'username',
    slug: true
  })).toBe(false);
});

it('should return false when object is invalid', () => {
  expect(GetDictionary.is({
    username: 'username'
  })).toBe(false);
});
