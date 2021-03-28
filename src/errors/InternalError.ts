import { HttpError } from './HttpError';

export class InternalError extends HttpError {
  public constructor() {
    super('Unknown error occurred', 500);
  }
}
