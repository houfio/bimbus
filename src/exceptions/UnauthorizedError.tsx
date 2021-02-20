import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
  public constructor(key: string, value: string) {
    super('Unauthorized', 403, {
      required: { [key]: value }
    });
  }
}
