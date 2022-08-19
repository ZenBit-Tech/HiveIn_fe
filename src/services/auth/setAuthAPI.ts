import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthFields {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  id: number;
  role: "freelancer" | "client" | undefined;
}

const authApi = createApi({
  reducerPath: "signIn",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, AuthFields>({
      query: ({ email, password }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: AuthResponse) => response,
    }),
    signUp: builder.mutation<boolean, AuthFields>({
      query: ({ email, password }) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: boolean) => response,
    }),
    googleOAuthSignIn: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/auth/google/success",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGoogleOAuthSignInQuery,
} = authApi;

export default authApi;
