import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query';

import { ResponseType } from '../types';
import { CreateUser, UpdateUser, User, Users } from '../types.api';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YWRtaW4.Hq25ihi_FB2DYnhkH9mO7z7nz67xPsE5IfFsUgDhbrU');

      return headers;
    }
  }),
  entityTypes: ['User', 'Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<ResponseType<Users>, void>({
      query: () => '/users',
      transformResponse: (response: Users) => response.data!,
      provides: (response) => response.map((r) => ({ type: 'Users' as const, id: r.username }))
    }),
    postUsers: builder.mutation<ResponseType<User>, CreateUser>({
      query: (body) => ({
        url: '/users',
        method: 'post',
        body
      }),
      transformResponse: (response: User) => response.data!,
      invalidates: ['Users']
    }),
    getUser: builder.query<ResponseType<User>, { username: string }>({
      query: ({ username }) => `/users/${username}`,
      transformResponse: (response: User) => response.data!,
      provides: (response) => [{ type: 'User', id: response.username }]
    }),
    putUser: builder.mutation<ResponseType<User>, UpdateUser & { username: string }>({
      query: ({ username, ...body }) => ({
        url: `/users/${username}`,
        method: 'post',
        body
      }),
      transformResponse: (response: User) => response.data!,
      invalidates: (response) => [{ type: 'Users', id: response.username }, { type: 'User', id: response.username }]
    }),
    deleteUser: builder.mutation<ResponseType<User>, { username: string }>({
      query: ({ username }) => ({
        url: `/users/${username}`,
        method: 'delete'
      }),
      transformResponse: (response: User) => response.data!,
      invalidates: (response) => [{ type: 'Users', id: response.username }, { type: 'User', id: response.username }]
    })
  })
});

export const {
  useGetUsersQuery,
  usePostUsersMutation,
  useGetUserQuery,
  usePutUserMutation,
  useDeleteUserMutation
} = api;
