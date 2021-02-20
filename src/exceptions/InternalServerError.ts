import { HttpError } from './HttpError';

export class InternalServerError extends HttpError {
  public constructor() {
    super('Internal server error', 500);
  }
}

