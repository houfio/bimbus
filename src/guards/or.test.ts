import { or } from './or';

function succeed() {
}

function fail1() {
  throw Error('one');
}

function fail2() {
  throw Error('two');
}

it('should pass when no guards fail', () => {
  expect(() => or(succeed)).not.toThrow();
});

it('should pass when one guards passes', () => {
  expect(() => or(succeed, fail1)).not.toThrow();
});

it('should throw the first failing guard', () => {
  expect(() => or(fail2, fail1)).toThrow('two');
});
