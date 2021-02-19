import { Infer, Struct } from 'superstruct';

export type Breakpoint = 'phone' | 'tabletPortrait' | 'tabletLandscape' | 'laptop' | 'desktop';
export type Breakpoints<T> = Partial<Record<Breakpoint, T>>;

export type RequestHandler = () => Promise<object | object[] | undefined>;
export type RequestDataHandler<T extends Struct<any, any>> = (data: Infer<T>) => ReturnType<RequestHandler>;
