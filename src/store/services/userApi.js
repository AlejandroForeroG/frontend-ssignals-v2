import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.22:3100/api",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
    }),
    getUserActive: builder.query({
      query: () => `/users/true`,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: `/users/create`,
        method: "POST",
        body: user,
      }),
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: `/users/update/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",

      })
    })
  }),
});

export const {
  useGetUsersQuery,
  useEditUserMutation,
  useGetUserActiveQuery,
  useCreateUserMutation,
  useDeleteUserMutation
} = userApi;
export default userApi;
