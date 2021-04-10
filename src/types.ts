import { Request, Router } from 'express';
import { Document, Model } from 'mongoose';
import { Server } from 'socket.io';

import { User } from './models/User';

export type RouteHandler<A> = {
  (): Route,
  (a: Middleware<A>): Route,
  <B>(a: Middleware<A, B>, b: Middleware<B>): Route,
  <B, C>(a: Middleware<A, B>, b: Middleware<B, C>, c: Middleware<C>): Route,
  <B, C, D>(a: Middleware<A, B>, b: Middleware<B, C>, c: Middleware<C, D>, d: Middleware<D>): Route,
  <B, C, D, E>(a: Middleware<A, B>, b: Middleware<B, C>, c: Middleware<C, D>, d: Middleware<D, E>, e: Middleware<E>): Route,
  <B, C, D, E, F>(a: Middleware<A, B>, b: Middleware<B, C>, c: Middleware<C, D>, d: Middleware<D, E>, e: Middleware<E, F>, f: Middleware<F>): Route,
  <B, C, D, E, F, G>(a: Middleware<A, B>, b: Middleware<B, C>, c: Middleware<C, D>, d: Middleware<D, E>, e: Middleware<E, F>, f: Middleware<F, G>, g: Middleware<G>): Route,
  <B, C, D, E, F, G, H>(a: Middleware<A, B>, b: Middleware<B, C>, c: Middleware<C, D>, d: Middleware<D, E>, e: Middleware<E, F>, f: Middleware<F, G>, g: Middleware<G, H>, h: Middleware<H>): Route,
  <B, C, D, E, F, G, H, I>(a: Middleware<A, B>, b: Middleware<B, C>, c: Middleware<C, D>, d: Middleware<D, E>, e: Middleware<E, F>, f: Middleware<F, G>, g: Middleware<G, H>, h: Middleware<H, I>, i: Middleware<I>): Route
};
export type Route = {
  (io: Server): Router,
  path: string
};
export type Method = 'all' | 'use' | 'get' | 'post' | 'put' | 'delete';
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

export type AuthCtx = {
  currentUser: ModelType<typeof User>
};
