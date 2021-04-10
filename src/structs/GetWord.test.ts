import {GetWord} from './GetWord';

it('should return true when data is valid', () => {
  expect(GetWord.is({
    username: 'username',
    slug: 'testdictionary',
    word: 'word'
  })).toBe(true)
})

it('should return false when username type is invalid', () => {
  expect(GetWord.is({
    username: true,
    slug: 'testdictionary',
    word: 'word'
  })).toBe(false)
})

it('should return false when slug type is invalid', () => {
  expect(GetWord.is({
    username: 'username',
    slug: true,
    word: 'word'
  })).toBe(false)
})

it('should return false when word type is invalid', () => {
  expect(GetWord.is({
    username: 'username',
    slug: 'testdictionary',
    word: true
  })).toBe(false)
})

it('should return false when object is invalid', () => {
  expect(GetWord.is({
    username: 'username',
    slug: 'testdictionary'
  })).toBe(false)
})
