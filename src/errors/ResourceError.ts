import { HttpError } from './HttpError';

export class ResourceError extends HttpError {
  public constructor(resource: string, id: string) {
    super('Resource not found', 404, {
      resource,
      id
    });
  }
}
