import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";

interface User {
  email?: string | undefined;
  role?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phone?: string | undefined;
}

const userApi = createApi({
  reducerPath: "setUser",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { authToken } = (getState() as RootState).user;

      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    setUser: builder.mutation<User, User>({
      query: ({ ...userInfo }: User) => ({
        url: "/settings-info",
        method: "POST",
        body: {
          ...userInfo,
        },
      }),
      transformResponse: (response: User) => response,
    }),
  }),
});

export const { useSetUserMutation } = userApi;

export default userApi;
