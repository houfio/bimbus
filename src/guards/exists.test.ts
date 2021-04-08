import { ResourceError } from '../errors/ResourceError';

import { exists } from './exists';

it('should throw when object is falsy', () => {
  expect(() => exists(false, '', '')).toThrow(ResourceError);
});

it('should not throw when object is truthy', () => {
  expect(() => exists(true, '', '')).not.toThrow();
});
