import { api as generatedApi } from './api.generated';

export const api = generatedApi.enhanceEndpoints({
  addEntityTypes: ['User', 'Dictionary'],
  endpoints: {
    getUsers: {
      provides: (response) => [
        ...response.data!.map((r) => ({ type: 'User' as const, id: r.username })),
        { type: 'User', id: '*' }
      ]
    },
    postUsers: {
      invalidates: [{ type: 'User', id: '*' }]
    },
    getUsersByUsername: {
      provides: (response, { username }) => [{ type: 'User', id: username }]
    },
    putUsersByUsername: {
      invalidates: (response, { username }) => [{ type: 'User', id: username }]
    },
    deleteUsersByUsername: {
      invalidates: (response, { username }) => [{ type: 'User', id: username }]
    },
    getUsersByUsernameDictionaries: {
      provides: (response) => [
        ...response.data!.map((r) => ({ type: 'Dictionary' as const, id: r.slug })),
        { type: 'Dictionary', id: '*' }
      ]
    },
    postUsersByUsernameDictionaries: {
      invalidates: [{ type: 'Dictionary', id: '*' }]
    },
    getUsersByUsernameDictionariesAndSlug: {
      provides: (response, { slug }) => [{ type: 'Dictionary', id: slug }]
    },
    putUsersByUsernameDictionariesAndSlug: {
      invalidates: (response, { slug }) => [{ type: 'Dictionary', id: slug }]
    },
    deleteUsersByUsernameDictionariesAndSlug: {
      invalidates: (response, { slug }) => [{ type: 'Dictionary', id: slug }]
    }
  }
});

export const {
  usePostLoginMutation: useLogin,
  useGetUsersQuery: useGetUsers,
  usePostUsersMutation: useCreateUser,
  useGetUsersByUsernameQuery: useGetUser,
  usePutUsersByUsernameMutation: useUpdateUser,
  useDeleteUsersByUsernameMutation: useDeleteUser,
  useGetUsersByUsernameDictionariesQuery: useGetDictionaries,
  usePostUsersByUsernameDictionariesMutation: useCreateDictionary,
  useGetUsersByUsernameDictionariesAndSlugQuery: useGetDictionary,
  usePutUsersByUsernameDictionariesAndSlugMutation: useUpdateDictionary,
  useDeleteUsersByUsernameDictionariesAndSlugMutation: useDeleteDictionary
} = api;
