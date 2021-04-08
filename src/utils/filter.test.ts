import { filter } from './filter';

it('should return an empty object when value is falsy', () => {
  expect(filter('test', undefined)).toEqual({});
});

it('should return a filled object when value is truthy', () => {
  expect(filter('test', true)).toEqual({ test: true });
});
