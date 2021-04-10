import { CreateGame } from './CreateGame';

it('should return true when valid data is given', () => {
  expect(CreateGame.is({
    dictionary: 'testdictionary',
    opponent: 'username'
  })).toBe(true);
});

it('should return false when invalid username type is given', () => {
  expect(CreateGame.is({
    dictionary: 'testdictionary',
    opponent: true
  })).toBe(false);
});

it('should return false when invalid dictionary type is given', () => {
  expect(CreateGame.is({
    dictionary: true,
    opponent: 'username'
  })).toBe(false);
});

it('should return false when invalid object is given', () => {
  expect(CreateGame.is({
    dictionary: true
  })).toBe(false);
});
