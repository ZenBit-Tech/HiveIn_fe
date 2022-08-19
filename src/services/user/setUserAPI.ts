import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number | undefined;
  role?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phone?: string | undefined;
}

const userApi = createApi({
  reducerPath: "setUser",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    setUser: builder.mutation<User, User>({
      query: ({ id, ...patch }) => ({
        url: `/settings-info/${id}`,
        method: "PATCH",
        body: {
          ...patch,
        },
      }),
      transformResponse: (response: User) => response,
    }),
  }),
});

export const { useSetUserMutation } = userApi;

export default userApi;
