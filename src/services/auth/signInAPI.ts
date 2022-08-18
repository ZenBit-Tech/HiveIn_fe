import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignIn {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  email: string;
  id: number;
  role: "freelancer" | "client" | undefined;
}

const authApi = createApi({
  reducerPath: "signIn",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignIn>({
      query: ({ email, password }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: SignInResponse) => response,
    }),
    googleOAuthSignIn: builder.query<SignInResponse, void>({
      query: () => ({
        url: "/auth/google/success",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSignInMutation, useGoogleOAuthSignInQuery } = authApi;

export default authApi;