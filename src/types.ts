export type Breakpoint = 'phone' | 'tabletPortrait' | 'tabletLandscape' | 'laptop' | 'desktop';
export type Breakpoints<T> = Partial<Record<Breakpoint, T>>;

export type Method = 'get' | 'post' | 'put' | 'delete';
export type RequestHandler = () => Promise<object | object[] | undefined>;
export type RequestHandlers = Record<string, RequestHandler>;
