import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  entityTypes: [],
  endpoints: (build) => ({
    get: build.query<GetApiResponse, GetApiArg>({
      query: () => ({ url: `/` }),
    }),
    postLogin: build.mutation<PostLoginApiResponse, PostLoginApiArg>({
      query: (queryArg) => ({
        url: `/login`,
        method: "POST",
        body: queryArg.authenticate,
      }),
    }),
    getUsersByUsernameDictionariesAndSlug: build.query<
      GetUsersByUsernameDictionariesAndSlugApiResponse,
      GetUsersByUsernameDictionariesAndSlugApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/dictionaries/${queryArg.slug}`,
      }),
    }),
    putUsersByUsernameDictionariesAndSlug: build.mutation<
      PutUsersByUsernameDictionariesAndSlugApiResponse,
      PutUsersByUsernameDictionariesAndSlugApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/dictionaries/${queryArg.slug}`,
        method: "PUT",
      }),
    }),
    deleteUsersByUsernameDictionariesAndSlug: build.mutation<
      DeleteUsersByUsernameDictionariesAndSlugApiResponse,
      DeleteUsersByUsernameDictionariesAndSlugApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/dictionaries/${queryArg.slug}`,
        method: "DELETE",
      }),
    }),
    getUsersByUsernameDictionaries: build.query<
      GetUsersByUsernameDictionariesApiResponse,
      GetUsersByUsernameDictionariesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/dictionaries`,
      }),
    }),
    postUsersByUsernameDictionaries: build.mutation<
      PostUsersByUsernameDictionariesApiResponse,
      PostUsersByUsernameDictionariesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/dictionaries`,
        method: "POST",
        body: queryArg.createDictionary,
      }),
    }),
    getUsersByUsername: build.query<
      GetUsersByUsernameApiResponse,
      GetUsersByUsernameApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.username}` }),
    }),
    putUsersByUsername: build.mutation<
      PutUsersByUsernameApiResponse,
      PutUsersByUsernameApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}`,
        method: "PUT",
        body: queryArg.updateUser,
      }),
    }),
    deleteUsersByUsername: build.mutation<
      DeleteUsersByUsernameApiResponse,
      DeleteUsersByUsernameApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/users` }),
    }),
    postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.createUser,
      }),
    }),
  }),
});
export type GetApiResponse = /** status 200 Successful operation */ Index;
export type GetApiArg = {};
export type PostLoginApiResponse = /** status 200 Successful operation */ Authentication;
export type PostLoginApiArg = {
  authenticate: Authenticate;
};
export type GetUsersByUsernameDictionariesAndSlugApiResponse = /** status 200 Successful operation */ Dictionary;
export type GetUsersByUsernameDictionariesAndSlugApiArg = {
  /** The username of the user */
  username: string;
  /** The slug of the dictionary */
  slug: string;
};
export type PutUsersByUsernameDictionariesAndSlugApiResponse = /** status 200 Successful operation */ Dictionary;
export type PutUsersByUsernameDictionariesAndSlugApiArg = {
  /** The username of the user */
  username: string;
  /** The slug of the dictionary */
  slug: string;
};
export type DeleteUsersByUsernameDictionariesAndSlugApiResponse = /** status 200 Successful operation */ Dictionary;
export type DeleteUsersByUsernameDictionariesAndSlugApiArg = {
  /** The username of the user */
  username: string;
  /** The slug of the dictionary */
  slug: string;
};
export type GetUsersByUsernameDictionariesApiResponse = /** status 200 Successful operation */ Dictionaries;
export type GetUsersByUsernameDictionariesApiArg = {
  /** The username of the user */
  username: string;
};
export type PostUsersByUsernameDictionariesApiResponse = /** status 200 Successful operation */ Dictionary;
export type PostUsersByUsernameDictionariesApiArg = {
  /** The username of the user */
  username: string;
  createDictionary: CreateDictionary;
};
export type GetUsersByUsernameApiResponse = /** status 200 Successful operation */ User;
export type GetUsersByUsernameApiArg = {
  /** The username of the user */
  username: string;
};
export type PutUsersByUsernameApiResponse = /** status 200 Successful operation */ User;
export type PutUsersByUsernameApiArg = {
  /** The username of the user */
  username: string;
  updateUser: UpdateUser;
};
export type DeleteUsersByUsernameApiResponse = /** status 200 Successful operation */ User;
export type DeleteUsersByUsernameApiArg = {
  /** The username of the user */
  username: string;
};
export type GetUsersApiResponse = /** status 200 Successful operation */ Users;
export type GetUsersApiArg = {};
export type PostUsersApiResponse = /** status 200 Successful operation */ User;
export type PostUsersApiArg = {
  createUser: CreateUser;
};
export type Response = {
  status?: {
    success?: boolean;
    code?: number;
    message?: string | null;
    info?: object | null;
  };
};
export type Index = Response & {
  data?: {
    version?: number;
    docs?: string;
  };
};
export type Role = "user" | "admin";
export type Authentication = Response & {
  data?: {
    token?: string;
    role?: Role;
  };
};
export type Error = Response & {
  data?: object | null;
};
export type Authenticate = {
  username?: string;
  password?: string;
};
export type Dictionary = Response & {
  data?: {
    slug?: string;
    name?: string;
    language?: string;
    public?: boolean;
  }[];
};
export type Dictionaries = Response & {
  data?: {
    slug?: string;
    name?: string;
  }[];
};
export type CreateDictionary = {
  name?: string;
  language?: string;
  public?: boolean;
};
export type User = Response & {
  data?: {
    username?: string;
    email?: string;
    role?: Role;
    dictionaries?: number;
  };
};
export type UpdateUser = {
  password?: string;
  email?: string;
};
export type Users = Response & {
  data?: {
    username?: string;
    role?: Role;
  }[];
};
export type CreateUser = {
  username?: string;
  password?: string;
  email?: string;
};
export const {
  useGetQuery,
  usePostLoginMutation,
  useGetUsersByUsernameDictionariesAndSlugQuery,
  usePutUsersByUsernameDictionariesAndSlugMutation,
  useDeleteUsersByUsernameDictionariesAndSlugMutation,
  useGetUsersByUsernameDictionariesQuery,
  usePostUsersByUsernameDictionariesMutation,
  useGetUsersByUsernameQuery,
  usePutUsersByUsernameMutation,
  useDeleteUsersByUsernameMutation,
  useGetUsersQuery,
  usePostUsersMutation,
} = api;
