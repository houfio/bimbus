/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type Index = Response & { data: { version: number; docs: string } };

export interface Authenticate {
  username: string;
  password: string;
}

export type Authentication = Response & { data: { token: string; role: Role } };

export type Dictionary = Response & {
  data: { slug: string; name: string; language: string; public: boolean }[] | null;
};

export type Dictionaries = PaginatedResponse & { data: { slug: string; name: string }[] | null };

export interface CreateDictionary {
  name: string;
  language: string;
  public: boolean;
}

export type Games = PaginatedResponse & {
  data?: { dictionary: string; hostId?: string; opponentId?: string }[] | null;
};

export interface CreateGame {
  dictionary: string;
  opponent: string;
}

export type User = Response & { data: { username: string; email: string; role: Role; dictionaries: number } };

export interface UpdateUser {
  password: string;
  email: string;
}

export type Users = Response & { data: { username: string; role: Role }[] | null };

export interface CreateUser {
  username: string;
  password: string;
  email: string;
}

export interface Response {
  status: { success: boolean; code: number; message: string | null; info: object | null };
}

export type PaginatedResponse = Response & { page: { current: number; total: number; size: number } };

export enum Role {
  User = "user",
  Admin = "admin",
}
