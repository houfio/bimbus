import { compare } from './compare';

it('should indicate a correct guess', () => {
  expect(compare('test', 'test')).toBe('[t][e][s][t]');
});

it('should indicate an incorrect position', () => {
  expect(compare('ttta', 'test')).toBe('[t](t) t  a ');
  expect(compare('attt', 'test')).toBe(' a (t) t [t]');
  expect(compare('tata', 'test')).toBe('[t] a (t) a ');
  expect(compare('atta', 'test')).toBe(' a (t)(t) a ');
  expect(compare('taat', 'test')).toBe('[t] a  a [t]');
});
