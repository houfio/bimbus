import { HttpError } from './HttpError';

export class RouteError extends HttpError {
  public constructor(route: string) {
    super('Route not found', 404, {
      route
    });
  }
}
