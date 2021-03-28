import { Document, Model } from 'mongoose';

import { SerializerHandler } from '../types';

export function serializer<T extends Document>(model: Model<T>, handler: SerializerHandler<T>) {
  const s = (object: T) => handler(object);

  s.model = model;

  return s;
}
