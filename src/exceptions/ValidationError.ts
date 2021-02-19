import { StructError } from 'superstruct';

import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
  public constructor(error: StructError) {
    super('Validation error', 400, {
      fields: error.failures().map((f) => ({
        path: f.path,
        type: f.refinement || f.type
      }))
    });
  }
}
