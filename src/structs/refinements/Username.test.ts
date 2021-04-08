import { Username } from './Username';

it('should return true when value is a username', () => {
  expect(Username.is('test_item123')).toBe(true);
  expect(Username.is('xXxEpicGamer420xXx')).toBe(true);
});

it('should return false when value is not a username', () => {
  expect(Username.is('Epic Gamer')).toBe(false);
  expect(Username.is('gamer!')).toBe(false);
  expect(Username.is('')).toBe(false);
});
