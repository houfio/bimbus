import { Request } from 'express';
import { Document } from 'mongoose';

import { serializers } from '../constants';
import { InternalError } from '../errors/InternalError';

export function serialize(req: Request, object: object | object[], compact = false): object | object[] {
  if (Array.isArray(object)) {
    return object.map((obj) => serialize(req, obj, true));
  } else if (!(object instanceof Document)) {
    return object;
  }

  console.log('Serializing object of type', object.constructor);

  const serializer = serializers.find((s) => s.model === object.constructor);

  if (!serializer) {
    throw new InternalError();
  }

  const { query: { include } } = req;
  const [base, extra] = serializer(object.toObject() as any);
  const result = {
    ...base,
    ...compact ? {} : extra
  };

  if (!include) {
    return result;
  }

  const fields = typeof include === 'string' ? [include] : include as string[];

  return Object.entries(result)
    .filter(([key]) => fields.includes(key))
    .reduce((previous, [key, value]) => ({ ...previous, [key]: value }), {});
}
