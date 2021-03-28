import { HttpError } from './HttpError';

export class AuthorizationError extends HttpError {
  public constructor(key: string, value: string) {
    super('Unauthorized', 403, {
      required: { [key]: value }
    });
  }
}
