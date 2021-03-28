import { StructError } from 'superstruct';

import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
  public constructor(error: StructError) {
    super('Validation failed', 400, {
      fields: error.failures().map((f) => ({
        path: f.path.join('.'),
        type: f.refinement || f.type
      }))
    });
  }
}
