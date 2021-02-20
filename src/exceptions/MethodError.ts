import { HttpError } from './HttpError';

export class MethodError extends HttpError {
  public constructor(allowed: string[]) {
    super('Method error', 405, { allowed }, {
      Allowed: allowed.join(', ').toUpperCase()
    });
  }
}
