import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";

export interface IUser {
  id?: string | undefined;
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
    getUser: builder.query<IUser, string>({
      query: (id) => `/${process.env.REACT_APP_USER_CONTACT_INFO_URL}/${id}`,
    }),
    updateUser: builder.mutation<IUser, IUser>({
      query: ({ id, ...userInfo }: IUser) => ({
        url: `/${process.env.REACT_APP_USER_CONTACT_INFO_URL}/${id}`,
        method: "PATCH",
        body: {
          ...userInfo,
        },
      }),
      transformResponse: (response: IUser) => response,
    }),
  }),
});

export const { useUpdateUserMutation, useGetUserQuery } = userApi;

export default userApi;
