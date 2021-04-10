import {CreateWord} from './CreateWord';

it('should return true when valid data is given', () => {
  expect(CreateWord.is({
    word: 'testword'
  })).toBe(true)
})

it('should return false when invalid word type is given', () => {
  expect(CreateWord.is({
    word: true
  })).toBe(false)
})

it('should return false when invalid object is given', () => {
  expect(CreateWord.is({
    randomType: 'testword'
  })).toBe(false)
})
