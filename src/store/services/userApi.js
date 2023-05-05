import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.12:3100/api",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: `/users/update/${user.id}`,
        method: "PUT",
        body: user
      })
    }),
  }),
});

export const { useGetUsersQuery, useEditUserMutation } = userApi;
export default userApi;