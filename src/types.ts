import { Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export type Breakpoint = 'phone' | 'tabletPortrait' | 'tabletLandscape' | 'laptop' | 'desktop';
export type Breakpoints<T> = Partial<Record<Breakpoint, T>>;

export type Method = 'get' | 'post' | 'put' | 'delete';
export type Apply<T extends object> = (handlers: RequestHandlers<T>) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export type Middleware<A, B> = (value: A, req: NextApiRequest, res: NextApiResponse) => Promise<B>;
export type RequestHandler<T extends object> = (data: T, req: NextApiRequest, res: NextApiResponse) => Promise<object | object[] | undefined>;
export type RequestHandlers<T extends object> = Partial<Record<Method, RequestHandler<T>>>;

export type Role = 'user' | 'admin';
export type ModelType<T> = T extends Model<infer V> ? V : never;
