import { NotFoundError } from '../errors/NotFoundError';

export function exists<T>(value: T | undefined | null, resource: string, id: string): asserts value is T {
  if (!value) {
    throw new NotFoundError(resource, id);
  }
}
