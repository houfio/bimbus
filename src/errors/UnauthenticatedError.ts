import { HttpError } from './HttpError';

export class UnauthenticatedError extends HttpError {
  public constructor() {
    super('Unauthenticated', 401);
  }
}
