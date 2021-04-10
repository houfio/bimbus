import { Request, Router } from 'express';
import { Document, Model } from 'mongoose';
import { Server } from 'socket.io';

export type RouteHandler = {
  (): Route,
  (a: Middleware<{}>): Route,
  <A>(a: Middleware<{}, A>, b: Middleware<A>): Route,
  <A, B>(a: Middleware<{}, A>, b: Middleware<A, B>, c: Middleware<B>): Route,
  <A, B, C>(a: Middleware<{}, A>, b: Middleware<A, B>, c: Middleware<B, C>, d: Middleware<C>): Route,
  <A, B, C, D>(a: Middleware<{}, A>, b: Middleware<A, B>, c: Middleware<B, C>, d: Middleware<C, D>, e: Middleware<D>): Route,
  <A, B, C, D, E>(a: Middleware<{}, A>, b: Middleware<A, B>, c: Middleware<B, C>, d: Middleware<C, D>, e: Middleware<D, E>, f: Middleware<E>): Route,
  <A, B, C, D, E, F>(a: Middleware<{}, A>, b: Middleware<A, B>, c: Middleware<B, C>, d: Middleware<C, D>, e: Middleware<D, E>, f: Middleware<E, F>, g: Middleware<F>): Route,
  <A, B, C, D, E, F, G>(a: Middleware<{}, A>, b: Middleware<A, B>, c: Middleware<B, C>, d: Middleware<C, D>, e: Middleware<D, E>, f: Middleware<E, F>, g: Middleware<F, G>, h: Middleware<G>): Route,
  <A, B, C, D, E, F, G, H>(a: Middleware<{}, A>, b: Middleware<A, B>, c: Middleware<B, C>, d: Middleware<C, D>, e: Middleware<D, E>, f: Middleware<E, F>, g: Middleware<F, G>, h: Middleware<G, H>, i: Middleware<H>): Route
};
export type Route = {
  (io: Server): Router,
  path: string
};
export type Method = 'all' | 'get' | 'post' | 'put' | 'delete';
export type MiddlewareHandler<A, B> = (ctx: A, req: Request) => B | Promise<B>;
export type Middleware<A, B = unknown> = MiddlewareHandler<A, B> & {
  method: Method
};

export type SerializerHandler<T extends Document> = (object: T) => [object, object];
export type Serializer<T extends Document> = SerializerHandler<T> & {
  model: Model<T>
};

export type Role = 'user' | 'admin';
export type ModelType<T> = T extends Model<infer V> ? V : never;

export type Token = {
  letter: string,
  index: number
};
