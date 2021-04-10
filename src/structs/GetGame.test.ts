import { GetGame } from './GetGame';

it('should return true when data is valid', () => {
  expect(GetGame.is({
    username: 'username',
    opponent: 'opponent'
  })).toBe(true);
});

it('should return false when username type is invalid', () => {
  expect(GetGame.is({
    username: true,
    opponent: 'opponent'
  })).toBe(false);
});

it('should return false when opponent type is invalid', () => {
  expect(GetGame.is({
    username: 'username',
    opponent: true
  })).toBe(false);
});

it('should return false when object is invalid', () => {
  expect(GetGame.is({
    username: true
  })).toBe(false);
});
