import { object, string } from 'superstruct';

import { ValidationError } from '../errors/ValidationError';

import { validate } from './validate';

const struct = object({
  value: string()
});

it('should pass validation', () => {
  expect(() => validate({
    value: 'test'
  }, struct)).not.toThrow();
});

it('should throw a validation error', () => {
  expect(() => validate({}, struct)).toThrow(ValidationError);
});
