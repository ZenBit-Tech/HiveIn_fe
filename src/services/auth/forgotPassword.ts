import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ForgotPassword {
  email: string;
}

interface RestorePassword {
  token: string;
  password: string;
}

const forgotPassApi = createApi({
  reducerPath: "forgotPassword",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<boolean, ForgotPassword>({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: {
          email,
        },
      }),
    }),

    restorePassword: builder.mutation<boolean, RestorePassword>({
      query: ({ password, token }) => ({
        url: "/auth/restore-password",
        method: "PATCH",
        body: {
          token,
          password,
        },
      }),
      transformResponse: (response: boolean) => response,
    }),
  }),
});

export default {
  useForgotPasswordMutation: forgotPassApi.useForgotPasswordMutation,
  useRestorePasswordMutation: forgotPassApi.useRestorePasswordMutation,
} = forgotPassApi;
