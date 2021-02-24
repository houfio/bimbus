import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  public constructor(resource: string, id: string) {
    super('Resource not found', 404, {
      resource,
      id
    });
  }
}