import { ResourceError } from '../errors/ResourceError';

export function exists<T>(value: T | undefined | null, resource: string, id: string): asserts value is T {
  if (!value) {
    throw new ResourceError(resource, id);
  }
}
