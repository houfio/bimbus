import { HttpError } from './HttpError';

export class InternalServerError extends HttpError {
  public constructor() {
    super('Unknown error occurred', 500);
  }
}
