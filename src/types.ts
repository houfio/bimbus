import { Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export type Breakpoint = 'phone' | 'tabletPortrait' | 'tabletLandscape' | 'laptop' | 'desktop';
export type Breakpoints<T> = Partial<Record<Breakpoint, T>>;

export type Method = 'get' | 'post' | 'put' | 'delete';
export type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<object | object[] | undefined>;
export type RequestHandlers = Record<string, RequestHandler>;

export type ModelType<T> = T extends Model<infer V> ? V : never;
