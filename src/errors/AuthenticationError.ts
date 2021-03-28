import { HttpError } from './HttpError';

export class AuthenticationError extends HttpError {
  public constructor() {
    super('Unauthenticated', 401);
  }
}
