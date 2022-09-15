import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH, GOOGLE, SIGN_IN, SIGN_UP } from "utils/consts/breakepointConsts";

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
        url: `/${AUTH}/${SIGN_IN}`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: AuthResponse) => response,
    }),
    signUp: builder.mutation<AuthResponse, AuthFields>({
      query: ({ email, password }) => ({
        url: `/${AUTH}/${SIGN_UP}`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: AuthResponse) => response,
    }),
    googleOAuthSignIn: builder.query<AuthResponse, void>({
      query: () => ({
        url: `/${AUTH}/${GOOGLE}`,
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
