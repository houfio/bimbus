import { Document } from 'mongoose';

import { serializers } from '../constants';
import { InternalError } from '../errors/InternalError';

export function serialize(object: object | object[], compact = false): object | object[] {
  if (Array.isArray(object)) {
    return object.map((obj) => serialize(obj, true));
  } else if (!(object instanceof Document)) {
    return object;
  }

  console.log('Serializing object of type', object.constructor);

  const serializer = serializers.find((s) => s.model === object.constructor);

  if (!serializer) {
    throw new InternalError();
  }

  const [base, extra] = serializer(object.toObject() as any);

  return {
    ...base,
    ...compact ? {} : extra
  };
}
